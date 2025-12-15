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
        1: { type: 'assembly', questions: 5, description: 'Сборка схем' },
        2: { type: 'calculation', questions: 5, description: 'Расчеты цепей' },
        3: { type: 'error-finding', questions: 5, description: 'Поиск ошибок в схемах' }
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
            selectedElement: null
        };
        
        this.timerInterval = null;
        this.elements = {};
        this.timeLimit = 300;
        this.timeLeft = this.timeLimit;
        this.currentHint = null;
        this.currentTask = null;
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
        
        this.initDragAndDrop();
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
    
    initDragAndDrop() {
        // Вызывается после loadElements, так что элементы есть
        const elements = document.querySelectorAll('.element-item');
        elements.forEach(el => {
            el.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', el.id);
            });
        });

        this.elements.dropZone.addEventListener('dragover', (e) => e.preventDefault());
        this.elements.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const original = document.getElementById(id);
            if (!original) return;
            const element = original.cloneNode(true);
            element.style.position = 'absolute';
            element.style.left = `${e.offsetX - 50}px`;
            element.style.top = `${e.offsetY - 50}px`;
            element.id = `${id}-${Date.now()}`;
            this.elements.dropZone.appendChild(element);
            this.state.placedElements.push(element.id);

            element.addEventListener('mouseover', () => {
                element.style.boxShadow = '0 0 10px #21CBF3';
                this.state.selectedElement = element.id;
            });
            element.addEventListener('mouseout', () => {
                element.style.boxShadow = 'none';
            });
            // Убрано dblclick для поворота
            element.addEventListener('click', () => {
                if (this.state.selectedElement && this.state.selectedElement !== element.id) {
                    this.connectElements(this.state.selectedElement, element.id);
                    this.state.selectedElement = null;
                } else {
                    this.state.selectedElement = element.id;
                }
            });
            
            // Добавлено перемещение после drop
            let isDragging = false;
            let startX, startY;
            element.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX - element.getBoundingClientRect().left;
                startY = e.clientY - element.getBoundingClientRect().top;
                element.style.cursor = 'grabbing';
            });
            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    element.style.left = `${e.clientX - startX - this.elements.dropZone.getBoundingClientRect().left}px`;
                    element.style.top = `${e.clientY - startY - this.elements.dropZone.getBoundingClientRect().top}px`;
                    // Перерисовать соединения если нужно (для простоты не, но можно добавить)
                }
            });
            document.addEventListener('mouseup', () => {
                isDragging = false;
                element.style.cursor = 'grab';
            });
        });
    }

    connectElements(fromId, toId) {
        const fromEl = document.getElementById(fromId);
        const toEl = document.getElementById(toId);
        if (!fromEl || !toEl) return;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const dropRect = this.elements.dropZone.getBoundingClientRect();

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromRect.left - dropRect.left + fromRect.width / 2);
        line.setAttribute('y1', fromRect.top - dropRect.top + fromRect.height / 2);
        line.setAttribute('x2', toRect.left - dropRect.left + toRect.width / 2);
        line.setAttribute('y2', toRect.top - dropRect.top + toRect.height / 2);
        line.setAttribute('stroke', '#2196F3');
        line.setAttribute('stroke-width', '4');
        line.classList.add('wire');

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.appendChild(line);
        this.elements.dropZone.appendChild(svg);

        this.state.connections.push({from: fromId, to: toId});
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
        
        this.elements.currentLevel.textContent = this.state.currentLevel;
        this.elements.currentLevelDisplay.textContent = this.state.currentLevel;
        this.elements.taskDescription.textContent = level.description;
        
        this.timeLimit = 300 - (this.state.currentLevel * 60);
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
        this.clearWorkspace();
        this.loadElements();
        this.initDragAndDrop(); // Переинициализировать для новых элементов
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
            
            elementDiv.innerHTML = `
                <div class="element-icon">${element.icon}</div>
                <div class="element-name">${element.name}</div>
            `;
            
            this.elements.elementsGrid.appendChild(elementDiv);
        });
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
            // Добавьте больше задач для 5 вопросов
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
            element.className = 'element-item';
            element.id = `${id}-${Date.now() + index}`;
            element.style.position = 'absolute';
            element.style.left = `${100 + index * 150}px`;
            element.style.top = '100px';
            element.innerHTML = `<div class="element-icon">${CircuitElements.getElements()[id].symbol}</div><div class="element-name">${CircuitElements.getElements()[id].name}</div>`;
            this.elements.dropZone.appendChild(element);
            this.state.placedElements.push(element.id);
        });
        
        // Добавляем ошибку: лишний resistor
        const wrongId = 'resistor-error';
        const wrongEl = document.createElement('div');
        wrongEl.className = 'element-item';
        wrongEl.id = wrongId;
        wrongEl.style.position = 'absolute';
        wrongEl.style.left = '400px';
        wrongEl.style.top = '100px';
        wrongEl.innerHTML = '<div class="element-icon">🔌</div><div class="element-name">Лишний резистор</div>';
        this.elements.dropZone.appendChild(wrongEl);
        this.state.placedElements.push(wrongId);
        
        wrongEl.addEventListener('click', () => {
            wrongEl.remove();
            this.state.placedElements = this.state.placedElements.filter(id => id !== wrongId);
            this.checkAnswer();
        });
        
        this.currentHint = 'Ищите лишний элемент, который не нужен в последовательной цепи';
    }
    
    checkAnswer() {
        if (this.state.isPaused || this.state.isGameOver) return;
        
        const level = GameConfig.LEVELS[this.state.currentLevel];
        
        switch(level.type) {
            case 'assembly':
                const placedTypes = this.state.placedElements.map(id => id.split('-')[0]);
                const hasRequired = this.currentTask.requirements.elements.every(req => placedTypes.includes(req));
                const minCount = placedTypes.length >= this.currentTask.requirements.minElements;
                const isSequential = this.state.connections.length === placedTypes.length - 1; // Простая проверка
                const isParallel = this.state.connections.length > placedTypes.length - 1; // Для parallel больше соединений
                
                const isCorrectConnection = this.currentTask.requirements.connection === 'sequential' ? isSequential : isParallel;
                
                if (hasRequired && minCount && isCorrectConnection) {
                    this.showFeedback('✅ Правильно! Цепь собрана.', 'success');
                    this.updateScore(GameConfig.SCORING.CORRECT_ANSWER);
                    this.state.correctAnswers++;
                    const bulb = document.querySelector('[id^="bulb-"]');
                    if (bulb) bulb.style.animation = 'glow 1.5s infinite alternate';
                    setTimeout(() => this.loadQuestion(), 2000);
                } else {
                    this.showFeedback('❌ Ошибка в цепи. Попробуйте снова.', 'error');
                    this.updateScore(GameConfig.SCORING.WRONG_ANSWER);
                    this.state.errors++;
                    if (--this.state.attemptsLeft <= 0) this.handleLevelFailure();
                }
                break;
            case 'calculation':
                const userAnswer = parseFloat(document.getElementById('answerInput').value);
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
                if (!this.state.placedElements.some(id => id.includes('error'))) {
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
        this.elements.dropZone.innerHTML = '';
        this.state.placedElements = [];
        this.state.connections = [];
        this.elements.answerArea.innerHTML = '';
        this.showFeedback('', '');
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
                    const el = document.getElementById(this.state.selectedElement);
                    if (el) el.remove();
                    this.state.placedElements = this.state.placedElements.filter(id => id !== this.state.selectedElement);
                    this.state.connections = this.state.connections.filter(c => c.from !== this.state.selectedElement && c.to !== this.state.selectedElement);
                    this.state.selectedElement = null;
                    // Удалить все SVG (провода) для очистки
                    this.elements.dropZone.querySelectorAll('svg').forEach(svg => svg.remove());
                }
                break;
        }
    }
}

window.ElectricSchemesGame = ElectricSchemesGame;