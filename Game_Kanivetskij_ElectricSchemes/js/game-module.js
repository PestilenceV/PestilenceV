/**
 * Основной модуль игры "Электрические схемы"
 */

const GameConfig = {
    SCORING: {
        CORRECT_ANSWER: 100,
        WRONG_ANSWER: -10,
        HINT_USED: -20,
        LEVEL_COMPLETE: 200,
        LEVEL_FAILURE: -50,
        TIME_PENALTY: -50
    },
    
    LEVELS: {
        1: { type: 'assembly', questions: 1, description: 'Сборка схем' },
        2: { type: 'calculation', questions: 2, description: 'Расчеты цепей' },
        3: { type: 'error-finding', questions: 3, description: 'Поиск ошибок в схемах' }
    }
};

class ElectricSchemesGame {
    constructor() {
        this.state = {
            playerName: '',
            currentLevel: 1,
            currentQuestion: 0,
            score: 0,
            isPaused: false,
            isGameOver: false,
            attemptsLeft: 3,
            hintsUsed: 0,
            errors: 0,
            placedElements: [],
            correctAnswers: 0,
            totalQuestions: 0,
            usedTasks: new Set(),
            connections: [],
            selectedElement: null,
            dragState: {
                isDragging: false,
                currentElement: null,
                startX: 0,
                startY: 0,
                elementStartX: 0,
                elementStartY: 0
            }
        };
        
        this.timerInterval = null;
        this.elements = {};
        this.timeLimit = 300;
        this.timeLeft = this.timeLimit;
        this.currentHint = null;
        this.currentTask = null;
        
        // Привязываем контекст для обработчиков событий
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    
    init() {
        this.loadProgress();
        this.loadPlayerData();
        this.initDOMElements();
        this.initEvents();
        this.hideModal(this.elements.pauseModal);
        this.hideModal(this.elements.levelCompleteModal);
        this.loadLevel();
        this.startTimer();
        this.updatePlayerInfo();
    }
    
    loadPlayerData() {
        this.state.playerName = localStorage.getItem('playerName') || 'Игрок';
        this.updatePlayerInfo();
    }
    
    loadProgress() {
        const gameStorage = new GameStorage();
        const progress = gameStorage.loadProgress();
        if (progress) {
            this.state = { ...this.state, ...progress };
            this.timeLeft = progress.timeLeft;
        }
    }
    
    initDOMElements() {
        this.elements.playerNameDisplay = document.getElementById('playerNameDisplay');
        this.elements.currentLevel = document.getElementById('currentLevel');
        this.elements.currentLevelDisplay = document.getElementById('currentLevelDisplay');
        this.elements.timer = document.getElementById('timer');
        this.elements.score = document.getElementById('score');
        this.elements.attempts = document.getElementById('attempts');
        this.elements.questionCounter = document.getElementById('questionCounter');
        
        this.elements.pauseBtn = document.getElementById('pauseBtn');
        this.elements.hintBtn = document.getElementById('hintBtn');
        this.elements.quitBtn = document.getElementById('quitBtn');
        this.elements.checkBtn = document.getElementById('checkBtn');
        this.elements.resetBtn = document.getElementById('resetBtn');
        this.elements.finishGameBtn = document.getElementById('finishGameBtn');
        this.elements.finishGameFromModalBtn = document.getElementById('finishGameFromModalBtn');
        
        this.elements.elementsGrid = document.getElementById('elementsGrid');
        this.elements.dropZone = document.getElementById('dropZone');
        this.elements.circuitElements = document.getElementById('circuitElements');
        this.elements.taskDescription = document.getElementById('taskDescription');
        this.elements.hintsList = document.getElementById('hintsList');
        this.elements.questionText = document.getElementById('questionText');
        this.elements.answerArea = document.getElementById('answerArea');
        
        this.elements.pauseModal = document.getElementById('pauseModal');
        this.elements.levelCompleteModal = document.getElementById('levelCompleteModal');
        this.elements.feedback = document.getElementById('feedback');
        
        this.elements.levelScore = document.getElementById('levelScore');
        this.elements.correctAnswersDisplay = document.getElementById('correctAnswers');
        this.elements.levelTime = document.getElementById('levelTime');
    }
    
    initEvents() {
        this.elements.pauseBtn?.addEventListener('click', () => this.togglePause());
        this.elements.hintBtn?.addEventListener('click', () => this.useHint());
        this.elements.quitBtn?.addEventListener('click', () => this.quitToMenu());
        this.elements.checkBtn?.addEventListener('click', () => this.checkAnswer());
        this.elements.resetBtn?.addEventListener('click', () => this.resetWorkspace());
        this.elements.finishGameBtn?.addEventListener('click', () => this.finishGame());
        this.elements.finishGameFromModalBtn?.addEventListener('click', () => this.finishGame());
        
        document.getElementById('resumeBtn')?.addEventListener('click', () => this.resumeGame());
        document.getElementById('quitToMenuBtn')?.addEventListener('click', () => this.quitToMenu());
        document.getElementById('nextLevelBtn')?.addEventListener('click', () => this.nextLevel());
        
        // Добавляем обработчик для сброса выделения при клике вне элемента
        this.elements.dropZone.addEventListener('click', (e) => {
            // Если клик был не по размещенному элементу, сбрасываем выделение
            if (!e.target.closest('.circuit-element')) {
                this.clearSelection();
            }
        });
        
        this.initDragAndDrop();
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
    
    initDragAndDrop() {
        // Очищаем предыдущие обработчики
        const elements = document.querySelectorAll('.element-item:not(.circuit-element)');
        elements.forEach(el => {
            el.removeEventListener('dragstart', this.handleDragStart);
            el.addEventListener('dragstart', (e) => this.handleDragStart(e));
        });

        // Очищаем предыдущие обработчики drop зоны
        this.elements.dropZone.removeEventListener('dragover', this.handleDragOver);
        this.elements.dropZone.removeEventListener('drop', this.handleDrop);
        
        this.elements.dropZone.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.elements.dropZone.addEventListener('drop', (e) => this.handleDrop(e));
    }
    
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.setData('element-type', e.target.id);
    }
    
    handleDragOver(e) {
        e.preventDefault();
        this.elements.dropZone.style.borderColor = '#2196F3';
    }
    
    handleDrop(e) {
        e.preventDefault();
        this.elements.dropZone.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        
        const elementType = e.dataTransfer.getData('element-type');
        if (!elementType) return;
        
        const originalElement = document.getElementById(elementType);
        if (!originalElement) return;
        
        // Создаем новый элемент для схемы
        const circuitElement = originalElement.cloneNode(true);
        const uniqueId = `circuit-${elementType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        circuitElement.id = uniqueId;
        circuitElement.classList.remove('element-item');
        circuitElement.classList.add('circuit-element');
        circuitElement.draggable = false;
        
        // Устанавливаем позицию
        const dropZoneRect = this.elements.dropZone.getBoundingClientRect();
        const x = e.clientX - dropZoneRect.left - 50;
        const y = e.clientY - dropZoneRect.top - 50;
        
        circuitElement.style.position = 'absolute';
        circuitElement.style.left = `${Math.max(0, x)}px`;
        circuitElement.style.top = `${Math.max(0, y)}px`;
        
        // Добавляем в drop зону
        this.elements.dropZone.appendChild(circuitElement);
        
        // Сохраняем в state
        this.state.placedElements.push({
            id: uniqueId,
            type: elementType,
            x: x,
            y: y
        });
        
        // Добавляем обработчики для нового элемента
        this.addCircuitElementHandlers(circuitElement, uniqueId);
        
        this.showFeedback(`Добавлен элемент: ${this.getElementName(elementType)}`, 'info');
    }
    
    addCircuitElementHandlers(element, elementId) {
        // Очищаем старые обработчики
        element.removeEventListener('mousedown', this.handleElementMouseDown);
        element.removeEventListener('click', this.handleElementClick);
        
        // Обработчик начала перетаскивания
        element.addEventListener('mousedown', (e) => this.handleElementMouseDown(e, elementId));
        
        // Обработчик клика для соединения
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleElementClick(elementId);
        });
        
        // Удаление по двойному клику
        element.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            this.removeCircuitElement(elementId);
        });
    }
    
    handleElementMouseDown(e, elementId) {
        if (this.state.isPaused || this.state.isGameOver) return;
        
        const element = document.getElementById(elementId);
        if (!element) return;
        
        this.state.dragState.isDragging = true;
        this.state.dragState.currentElement = elementId;
        this.state.dragState.startX = e.clientX;
        this.state.dragState.startY = e.clientY;
        this.state.dragState.elementStartX = parseInt(element.style.left) || 0;
        this.state.dragState.elementStartY = parseInt(element.style.top) || 0;
        
        element.style.cursor = 'grabbing';
        element.style.zIndex = '1000';
        
        // Добавляем обработчики перемещения и отпускания
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        
        e.preventDefault();
    }
    
    handleMouseMove(e) {
        if (!this.state.dragState.isDragging || !this.state.dragState.currentElement) return;
        
        const element = document.getElementById(this.state.dragState.currentElement);
        if (!element) return;
        
        const dx = e.clientX - this.state.dragState.startX;
        const dy = e.clientY - this.state.dragState.startY;
        
        const newX = this.state.dragState.elementStartX + dx;
        const newY = this.state.dragState.elementStartY + dy;
        
        // Ограничиваем перемещение в пределах drop зоны
        const dropZoneRect = this.elements.dropZone.getBoundingClientRect();
        const maxX = dropZoneRect.width - element.offsetWidth;
        const maxY = dropZoneRect.height - element.offsetHeight;
        
        element.style.left = `${Math.max(0, Math.min(maxX, newX))}px`;
        element.style.top = `${Math.max(0, Math.min(maxY, newY))}px`;
        
        // Обновляем соединения
        this.updateConnections();
    }
    
    handleMouseUp() {
        if (!this.state.dragState.isDragging) return;
        
        const element = document.getElementById(this.state.dragState.currentElement);
        if (element) {
            element.style.cursor = 'grab';
            element.style.zIndex = '10';
            
            // Обновляем позицию в state
            const index = this.state.placedElements.findIndex(el => el.id === this.state.dragState.currentElement);
            if (index !== -1) {
                this.state.placedElements[index].x = parseInt(element.style.left) || 0;
                this.state.placedElements[index].y = parseInt(element.style.top) || 0;
            }
        }
        
        // Сбрасываем состояние перетаскивания
        this.state.dragState.isDragging = false;
        this.state.dragState.currentElement = null;
        
        // Удаляем обработчики
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
    
    handleElementClick(elementId) {
        if (this.state.isPaused || this.state.isGameOver) return;
        
        if (!this.state.selectedElement) {
            // Выбираем первый элемент
            this.state.selectedElement = elementId;
            const element = document.getElementById(elementId);
            if (element) {
                element.style.boxShadow = '0 0 15px #FFEB3B';
                this.showFeedback(`Выбран элемент. Кликните на другой элемент для соединения`, 'info');
            }
        } else if (this.state.selectedElement === elementId) {
            // Снимаем выделение при повторном клике
            const element = document.getElementById(elementId);
            if (element) {
                element.style.boxShadow = '';
            }
            this.state.selectedElement = null;
            this.showFeedback('Выделение снято', 'info');
        } else {
            // Соединяем выбранный элемент с новым
            this.connectElements(this.state.selectedElement, elementId);
        }
    }
    
    connectElements(fromId, toId) {
        // Проверяем, не соединяем ли элемент сам с собой
        if (fromId === toId) {
            this.showFeedback('Нельзя соединить элемент с самим собой!', 'error');
            return;
        }
        
        // Проверяем, не соединены ли уже эти элементы
        const existingConnection = this.state.connections.find(conn => 
            (conn.from === fromId && conn.to === toId) || 
            (conn.from === toId && conn.to === fromId)
        );
        
        if (existingConnection) {
            this.showFeedback('Эти элементы уже соединены!', 'info');
            this.clearSelection();
            return;
        }
        
        // Получаем элементы
        const fromElement = document.getElementById(fromId);
        const toElement = document.getElementById(toId);
        
        if (!fromElement || !toElement) {
            this.showFeedback('Один из элементов не найден!', 'error');
            this.clearSelection();
            return;
        }
        
        // Создаем соединение
        this.createConnectionLine(fromElement, toElement, fromId, toId);
        
        // Сохраняем информацию о соединении
        const connectionId = `wire-${fromId}-${toId}`;
        this.state.connections.push({
            id: connectionId,
            from: fromId,
            to: toId
        });
        
        // Снимаем выделение
        fromElement.style.boxShadow = '';
        this.clearSelection();
        
        this.showFeedback('Элементы соединены!', 'success');
    }
    
    createConnectionLine(fromElement, toElement, fromId, toId) {
        const dropZoneRect = this.elements.dropZone.getBoundingClientRect();
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();
        
        // Создаем или получаем SVG контейнер для проводов
        let svg = this.elements.dropZone.querySelector('svg.wires-container');
        if (!svg) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.classList.add('wires-container');
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.pointerEvents = 'none';
            svg.style.zIndex = '5';
            this.elements.dropZone.appendChild(svg);
        }
        
        // Создаем линию соединения
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const lineId = `wire-${fromId}-${toId}`;
        line.id = lineId;
        
        // Вычисляем координаты для линии (центры элементов)
        const x1 = fromRect.left - dropZoneRect.left + fromRect.width / 2;
        const y1 = fromRect.top - dropZoneRect.top + fromRect.height / 2;
        const x2 = toRect.left - dropZoneRect.left + toRect.width / 2;
        const y2 = toRect.top - dropZoneRect.top + toRect.height / 2;
        
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#2196F3');
        line.setAttribute('stroke-width', '4');
        line.setAttribute('stroke-linecap', 'round');
        line.classList.add('wire');
        
        svg.appendChild(line);
    }
    
    updateConnections() {
        const svg = this.elements.dropZone.querySelector('svg.wires-container');
        if (!svg) return;
        
        const dropZoneRect = this.elements.dropZone.getBoundingClientRect();
        
        this.state.connections.forEach(connection => {
            const line = document.getElementById(connection.id);
            const fromElement = document.getElementById(connection.from);
            const toElement = document.getElementById(connection.to);
            
            if (line && fromElement && toElement) {
                const fromRect = fromElement.getBoundingClientRect();
                const toRect = toElement.getBoundingClientRect();
                
                const x1 = fromRect.left - dropZoneRect.left + fromRect.width / 2;
                const y1 = fromRect.top - dropZoneRect.top + fromRect.height / 2;
                const x2 = toRect.left - dropZoneRect.left + toRect.width / 2;
                const y2 = toRect.top - dropZoneRect.top + toRect.height / 2;
                
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
            }
        });
    }

    
    
    clearSelection() {
        // Снимаем выделение со всех элементов
        document.querySelectorAll('.circuit-element').forEach(el => {
            el.style.boxShadow = '';
        });
        this.state.selectedElement = null;
    }
    
    removeCircuitElement(elementId) {
        if (!confirm('Удалить этот элемент?')) return;
        
        // Удаляем элемент из DOM
        const element = document.getElementById(elementId);
        if (element) element.remove();
        
        // Удаляем элемент из state
        this.state.placedElements = this.state.placedElements.filter(el => el.id !== elementId);
        
        // Удаляем все соединения с этим элементом
        const connectionsToRemove = this.state.connections.filter(conn => 
            conn.from === elementId || conn.to === elementId
        );
        
        connectionsToRemove.forEach(conn => {
            const line = document.getElementById(conn.id);
            if (line) line.remove();
        });
        
        this.state.connections = this.state.connections.filter(conn => 
            conn.from !== elementId && conn.to !== elementId
        );
        
        // Сбрасываем выделение если удален выделенный элемент
        if (this.state.selectedElement === elementId) {
            this.clearSelection();
        }
        
        this.showFeedback('Элемент удален', 'info');
    }
    
    getElementName(elementType) {
        const names = {
            'battery': 'Батарея',
            'bulb': 'Лампочка',
            'resistor': 'Резистор',
            'switch': 'Выключатель',
            'led': 'Светодиод'
        };
        return names[elementType] || elementType;
    }
    
    loadLevel() {
        const level = GameConfig.LEVELS[this.state.currentLevel];
        if (!level) {
            this.completeGame();
            return;
        }
        this.state.totalQuestions = level.questions;
        this.state.currentQuestion = 0;
        this.state.placedElements = [];
        this.state.correctAnswers = 0;
        this.state.errors = 0;
        this.state.usedTasks.clear();
        this.state.connections = [];
        this.state.selectedElement = null;
        
        this.elements.currentLevel.textContent = this.state.currentLevel;
        this.elements.currentLevelDisplay.textContent = this.state.currentLevel;
        this.elements.taskDescription.textContent = level.description;
        
        this.timeLimit = 300;
        this.timeLeft = this.timeLimit;
        
        this.loadQuestion();
    }
    
    loadQuestion() {
        if (this.state.currentQuestion >= this.state.totalQuestions) {
            this.completeLevel();
            return;
        }
        this.state.currentQuestion++;
        this.state.placedElements = [];
        this.state.connections = [];
        this.state.selectedElement = null;
        this.clearWorkspace();
        this.loadElements();
        this.loadTask();
        
        this.elements.questionCounter.textContent = 
            `Вопрос: ${this.state.currentQuestion}/${this.state.totalQuestions}`;
    }
    
    loadElements() {
        const elements = [
            { id: 'battery', name: 'Батарея', icon: '🔋' },
            { id: 'bulb', name: 'Лампочка', icon: '💡' },
            { id: 'resistor', name: 'Резистор', icon: '🔌' },
            { id: 'switch', name: 'Выключатель', icon: '🎚️' },
            { id: 'led', name: 'Светодиод', icon: '💎' }
        ];
        
        this.elements.elementsGrid.innerHTML = '';
        elements.forEach(element => {
            const elementDiv = document.createElement('div');
            elementDiv.className = 'element-item';
            elementDiv.id = element.id;
            elementDiv.draggable = true;
            elementDiv.setAttribute('data-type', element.id);
            
            elementDiv.innerHTML = `
                <div class="element-icon">${element.icon}</div>
                <div class="element-name">${element.name}</div>
            `;
            
            this.elements.elementsGrid.appendChild(elementDiv);
        });
        
        // Переинициализируем drag and drop для новых элементов
        setTimeout(() => this.initDragAndDrop(), 0);
    }
    
    loadTask() {
        const level = GameConfig.LEVELS[this.state.currentLevel];
        
        switch(level.type) {
            case 'assembly':
                this.loadAssemblyTask();
                break;
            case 'calculation':
                this.loadCalculationTask();
                break;
            case 'error-finding':
                this.loadErrorFindingTask();
                break;
        }
    }
    
    loadAssemblyTask() {
        const tasks = [
            {
                id: 'seq_battery_bulb_switch',
                text: 'Соберите последовательную цепь из батареи, лампочки и выключателя',
                requirements: {
                    elements: ['battery', 'bulb', 'switch'],
                    connection: 'sequential',
                    minElements: 3
                },
                hint: 'Батарея → Лампочка → Выключатель должны быть соединены в ряд'
            },
            {
                id: 'par_resistor_led',
                text: 'Соберите параллельную цепь с резистором и светодиодом',
                requirements: {
                    elements: ['resistor', 'led'],
                    connection: 'parallel',
                    minElements: 2
                },
                hint: 'Резистор и светодиод должны быть соединены параллельно'
            },
            {
                id: 'seq_battery_resistor_bulb',
                text: 'Соберите последовательную цепь из батареи, резистора и лампочки',
                requirements: {
                    elements: ['battery', 'resistor', 'bulb'],
                    connection: 'sequential',
                    minElements: 3
                },
                hint: 'Батарея → Резистор → Лампочка'
            },
            {
                id: 'par_switch_led_bulb',
                text: 'Соберите параллельную цепь с выключателем, светодиодом и лампочкой',
                requirements: {
                    elements: ['switch', 'led', 'bulb'],
                    connection: 'parallel',
                    minElements: 3
                },
                hint: 'Выключатель, светодиод и лампочка параллельно'
            },
            {
                id: 'seq_battery_switch_led',
                text: 'Соберите последовательную цепь из батареи, выключателя и светодиода',
                requirements: {
                    elements: ['battery', 'switch', 'led'],
                    connection: 'sequential',
                    minElements: 3
                },
                hint: 'Батарея → Выключатель → Светодиод'
            }
        ];
        
        let taskIndex = Math.floor(Math.random() * tasks.length);
        while (this.state.usedTasks.has(tasks[taskIndex].id)) {
            taskIndex = Math.floor(Math.random() * tasks.length);
        }
        this.state.usedTasks.add(tasks[taskIndex].id);
        this.currentTask = tasks[taskIndex];
        this.currentHint = tasks[taskIndex].hint;
        this.elements.questionText.textContent = tasks[taskIndex].text;
        this.elements.answerArea.innerHTML = '';
    }
    
    loadCalculationTask() {
        const types = ['ohmLaw', 'power', 'series', 'parallel'];
        const type = types[Math.floor(Math.random() * types.length)];
        this.currentTask = ElectricalFormulas.generateRandomProblem(type);
        this.elements.questionText.textContent = `Расчитайте ${this.currentTask.find} по данным: ${JSON.stringify(this.currentTask.given)}`;
        this.elements.answerArea.innerHTML = '<input type="text" id="answerInput" placeholder="Введите ответ">';
        this.currentHint = `Используйте формулу: ${ElectricalFormulas.formulas[type].formula}`;
    }
    
    loadErrorFindingTask() {
        this.elements.questionText.textContent = 'Найдите ошибку в схеме и кликните на ошибочный элемент для удаления';
        this.elements.answerArea.innerHTML = '';
        
        // Генерируем правильную схему и добавляем ошибку
        const correctElements = ['battery', 'switch', 'bulb'];
        correctElements.forEach((id, index) => {
            const element = document.createElement('div');
            element.className = 'circuit-element';
            element.id = `${id}-error-${Date.now() + index}`;
            element.style.position = 'absolute';
            element.style.left = `${100 + index * 150}px`;
            element.style.top = '100px';
            element.innerHTML = `<div class="element-icon">${CircuitElements.getElements()[id].symbol}</div><div class="element-name">${CircuitElements.getElements()[id].name}</div>`;
            this.elements.dropZone.appendChild(element);
            this.state.placedElements.push({
                id: element.id,
                type: id,
                x: 100 + index * 150,
                y: 100
            });
            
            this.addCircuitElementHandlers(element, element.id);
        });
        
        // Добавляем ошибку: лишний resistor
        const wrongId = `resistor-error-${Date.now()}`;
        const wrongEl = document.createElement('div');
        wrongEl.className = 'circuit-element';
        wrongEl.id = wrongId;
        wrongEl.style.position = 'absolute';
        wrongEl.style.left = '400px';
        wrongEl.style.top = '100px';
        wrongEl.innerHTML = '<div class="element-icon">🔌</div><div class="element-name">Лишний резистор</div>';
        this.elements.dropZone.appendChild(wrongEl);
        this.state.placedElements.push({
            id: wrongId,
            type: 'resistor',
            x: 400,
            y: 100
        });
        
        this.addCircuitElementHandlers(wrongEl, wrongId);
        
        this.currentHint = 'Ищите лишний элемент, который не нужен в последовательной цепи';
    }
    
    checkAnswer() {
        if (this.state.isPaused || this.state.isGameOver) return;
        
        const level = GameConfig.LEVELS[this.state.currentLevel];
        
        switch(level.type) {
            case 'assembly':
                // Получаем типы размещенных элементов
                const placedTypes = this.state.placedElements.map(el => el.type);
                
                // Проверяем наличие требуемых элементов
                const requiredElements = this.currentTask.requirements.elements;
                const hasAllRequired = requiredElements.every(req => placedTypes.includes(req));
                
                // Проверяем количество элементов
                const hasMinCount = placedTypes.length >= this.currentTask.requirements.minElements;
                
                // Проверяем соединения - для последовательной цепи должно быть n-1 соединений для n элементов
                const requiredConnections = this.currentTask.requirements.connection === 'sequential' 
                    ? requiredElements.length - 1 
                    : requiredElements.length; // Для параллельной требуется больше соединений
                
                const hasRequiredConnections = this.state.connections.length >= requiredConnections;
                
                if (hasAllRequired && hasMinCount && hasRequiredConnections) {
                    this.showFeedback('✅ Правильно! Цепь собрана.', 'success');
                    this.updateScore(GameConfig.SCORING.CORRECT_ANSWER);
                    this.state.correctAnswers++;
                    
                    // Запускаем анимацию лампочки
                    const bulbElement = this.state.placedElements.find(el => el.type === 'bulb');
                    if (bulbElement) {
                        const bulb = document.getElementById(bulbElement.id);
                        if (bulb) {
                            bulb.style.animation = 'glow 1.5s infinite alternate';
                        }
                    }
                    
                    setTimeout(() => this.loadQuestion(), 2000);
                } else {
                    let errorMessage = '❌ Ошибка в цепи. ';
                    if (!hasAllRequired) errorMessage += 'Не все элементы установлены. ';
                    if (!hasMinCount) errorMessage += 'Недостаточно элементов. ';
                    if (!hasRequiredConnections) errorMessage += 'Недостаточно соединений. ';
                    
                    this.showFeedback(errorMessage, 'error');
                    this.updateScore(GameConfig.SCORING.WRONG_ANSWER);
                    this.state.errors++;
                    if (--this.state.attemptsLeft <= 0) this.handleLevelFailure();
                }
                break;
            case 'calculation':
                const userAnswer = parseFloat(document.getElementById('answerInput')?.value);
                if (isNaN(userAnswer)) {
                    this.showFeedback('❌ Введите число.', 'error');
                    return;
                }
                if (ElectricalFormulas.checkAnswer(this.currentTask, userAnswer)) {
                    this.showFeedback('✅ Правильно!', 'success');
                    this.updateScore(GameConfig.SCORING.CORRECT_ANSWER);
                    this.state.correctAnswers++;
                    setTimeout(() => this.loadQuestion(), 2000);
                } else {
                    this.showFeedback('❌ Неправильно. Попробуйте снова.', 'error');
                    this.updateScore(GameConfig.SCORING.WRONG_ANSWER);
                    this.state.errors++;
                    if (--this.state.attemptsLeft <= 0) this.handleLevelFailure();
                }
                break;
            case 'error-finding':
                if (!this.state.placedElements.some(el => el.id.includes('error'))) {
                    this.showFeedback('✅ Ошибка найдена!', 'success');
                    this.updateScore(GameConfig.SCORING.CORRECT_ANSWER);
                    this.state.correctAnswers++;
                    setTimeout(() => this.loadQuestion(), 2000);
                } else {
                    this.showFeedback('❌ Ошибка не найдена.', 'error');
                    this.updateScore(GameConfig.SCORING.WRONG_ANSWER);
                    this.state.errors++;
                    if (--this.state.attemptsLeft <= 0) this.handleLevelFailure();
                }
                break;
        }
    }
    
    completeLevel() {
        this.updateScore(GameConfig.SCORING.LEVEL_COMPLETE);
        if (this.timeLeft < this.timeLimit / 2) {
            this.updateScore(GameConfig.SCORING.TIME_PENALTY);
        }
        
        this.elements.levelScore.textContent = GameConfig.SCORING.LEVEL_COMPLETE;
        this.elements.correctAnswersDisplay.textContent = this.state.correctAnswers;
        this.elements.levelTime.textContent = this.formatTime(this.timeLimit - this.timeLeft);
        this.elements.levelCompleteModal.style.display = 'flex';
        
        this.state.isPaused = true;
    }
    
    nextLevel() {
        this.hideModal(this.elements.levelCompleteModal);
        this.state.currentLevel++;
        this.state.attemptsLeft = 3;
        this.loadLevel();
        this.resumeGame();
    }
    
    completeGame() {
        this.saveGameResults();
        window.location.href = 'rating.html';
    }
    
    finishGame() {
        if (confirm('Завершить игру? Прогресс будет сохранен.')) {
            this.saveGameResults();
            window.location.href = 'rating.html';
        }
    }
    
    saveGameResults() {
        const gameStorage = new GameStorage();
        const result = {
            playerName: this.state.playerName,
            score: this.state.score,
            level: this.state.currentLevel,
            time: this.timeLimit - this.timeLeft,
            date: new Date().toISOString(),
            correctAnswers: this.state.correctAnswers,
            errors: this.state.errors
        };
        
        gameStorage.saveResult(result);
    }
    
    handleLevelFailure() {
        this.updateScore(GameConfig.SCORING.LEVEL_FAILURE);
        this.showFeedback('⚠️ Попытки закончились! Начинаем уровень заново', 'error');
        
        setTimeout(() => {
            this.restartLevel();
        }, 2000);
    }
    
    restartLevel() {
        this.state.attemptsLeft = 3;
        this.state.currentQuestion = 0;
        this.state.correctAnswers = 0;
        this.state.errors = 0;
        this.state.usedTasks.clear();
        this.state.connections = [];
        this.state.selectedElement = null;
        
        this.clearWorkspace();
        this.loadQuestion();
        this.resumeGame();
    }
    
    useHint() {
        if (this.state.isPaused || this.state.isGameOver || !this.currentHint) return;
        
        this.updateScore(GameConfig.SCORING.HINT_USED);
        this.state.hintsUsed++;
        
        this.elements.hintsList.innerHTML = '';
        const hintElement = document.createElement('div');
        hintElement.className = 'hint-item';
        hintElement.textContent = this.currentHint;
        this.elements.hintsList.appendChild(hintElement);
        this.showFeedback('💡 Получена подсказка (-20 баллов)', 'info');
    }
    
    quitToMenu() {
        if (confirm('Вы уверены, что хотите выйти в меню? Прогресс будет сохранен.')) {
            this.saveGameProgress();
            window.location.href = 'index.html';
        }
    }
    
    resumeGame() {
        this.state.isPaused = false;
        this.hideModal(this.elements.pauseModal);
    }
    
    togglePause() {
        this.state.isPaused = !this.state.isPaused;
        
        if (this.state.isPaused) {
            this.showPauseModal();
        } else {
            this.hideModal(this.elements.pauseModal);
        }
    }
    
    showPauseModal() {
        this.elements.pauseModal.style.display = 'flex';
    }
    
    hideModal(modal) {
        if (modal) modal.style.display = 'none';
    }
    
    resetWorkspace() {
        if (confirm('Сбросить все размещенные элементы?')) {
            this.clearWorkspace();
        }
    }
    
    clearWorkspace() {
        // Удаляем все размещенные элементы
        document.querySelectorAll('.circuit-element').forEach(el => el.remove());
        // Удаляем все соединения
        const svg = this.elements.dropZone.querySelector('svg.wires-container');
        if (svg) svg.remove();
        
        this.state.placedElements = [];
        this.state.connections = [];
        this.state.selectedElement = null;
        this.elements.answerArea.innerHTML = '';
        this.showFeedback('', '');
        
        // Сбрасываем состояние перетаскивания
        this.state.dragState.isDragging = false;
        this.state.dragState.currentElement = null;
    }
    
    showFeedback(message, type) {
        this.elements.feedback.textContent = message;
        this.elements.feedback.className = `feedback ${type}`;
    }
    
    updatePlayerInfo() {
        if (this.elements.playerNameDisplay) this.elements.playerNameDisplay.textContent = this.state.playerName;
        if (this.elements.attempts) this.elements.attempts.textContent = this.state.attemptsLeft;
        if (this.elements.score) this.elements.score.textContent = this.state.score;
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.state.isPaused && !this.state.isGameOver) {
                this.timeLeft--;
                this.updateTimerDisplay();
                
                if (this.timeLeft <= 0) {
                    this.handleTimeUp();
                }
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (this.timeLeft < 60) {
            this.elements.timer.style.color = '#FF5252';
        } else {
            this.elements.timer.style.color = '#fff';
        }
    }
    
    handleTimeUp() {
        this.state.isGameOver = true;
        clearInterval(this.timerInterval);
        this.showFeedback('⏰ Время вышло! Игра завершена', 'error');
        setTimeout(() => this.finishGame(), 2000);
    }
    
    updateScore(points) {
        this.state.score += points;
        this.state.score = Math.max(0, this.state.score);
        this.elements.score.textContent = this.state.score;
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    saveGameProgress() {
        const progress = {
            currentLevel: this.state.currentLevel,
            currentQuestion: this.state.currentQuestion,
            score: this.state.score,
            timeLeft: this.timeLeft,
            placedElements: this.state.placedElements,
            correctAnswers: this.state.correctAnswers,
            errors: this.state.errors
        };
        
        localStorage.setItem('gameProgress', JSON.stringify(progress));
    }
    
    handleKeyPress(e) {
        switch(e.key) {
            case ' ':
            case 'Space':
                e.preventDefault();
                this.togglePause();
                break;
            case 'Escape':
                this.togglePause();
                break;
            case 'Delete':
                if (this.state.selectedElement) {
                    this.removeCircuitElement(this.state.selectedElement);
                }
                break;
        }
    }
}

window.ElectricSchemesGame = ElectricSchemesGame;