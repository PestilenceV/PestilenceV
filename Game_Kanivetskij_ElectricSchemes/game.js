/**
 * КОНФИГУРАЦИЯ ИГРЫ
 */
const GameConfig = {
    SCORING: {
        CORRECT_ANSWER: 100,
        WRONG_ANSWER: -30,
        LEVEL_COMPLETE: 200,
        LEVEL_FAILURE: -70,
        TIME_BONUS: 50
    },
    
    LEVELS: {
        1: { 
            type: 'identification', 
            questions: 4,
            timeLimit: 240,
            description: 'Необходимо правильно идентифицировать элементы в соответствии с категорией',
            difficultyMultiplier: 1.0
        },
        2: { 
            type: 'assembly', 
            questions: 3,
            timeLimit: 300,
            description: 'Необходимо правильно собрать электрические схемы',
            difficultyMultiplier: 1.5
        },
        3: { 
            type: 'formula', 
            questions: 4,
            timeLimit: 300,
            description: 'Необходимо правильно выбрать формулу и решить задачу',
            difficultyMultiplier: 2.0
        }
    },
    
    ELECTRICAL_ELEMENTS: {
        bulb: { name: 'Лампочка', symbol:'<img src="assets/lamp.png" class="element-img">', category: 'load' },
        resistor: { name: 'Резистор', symbol: '<img src="assets/resistor.png" class="element-img">' , category: 'component' },
        switch: { name: 'Выключатель', symbol: '<img src="assets/switch.png" class="element-img">', category: 'control' },
        led: { name: 'Светодиод', symbol: '<img src="assets/diode.png" class="element-img">', category: 'load' },
        capacitor: { name: 'Конденсатор', symbol: '<img src="assets/capacitor.png" class="element-img">', category: 'component' },
        transistor: { name: 'Транзистор', symbol: '<img src="assets/transistor.png" class="element-img">', category: 'component' },
        diode: { name: 'Диод', symbol: '<img src="assets/diode.png" class="element-img">', category: 'component' },
        fuse: { name: 'Предохранитель', symbol: '<img src="assets/fuse.png" class="element-img">', category: 'protection' },
        transformer: { name: 'Трансформатор', symbol: '<img src="assets/fuse-box.png" class="element-img">', category: 'component' },
        inductor: { name: 'Катушка индуктивности', symbol: '<img src="assets/coil.png" class="element-img">', category: 'component' },
        potentiometer: { name: 'Переменный резистор', symbol: '<img src="assets/resistor.png" class="element-img">', category: 'control' },
        relay: { name: 'Реле', symbol: '<img src="assets/relay.png" class="element-img">', category: 'control' },
    },
    
    MECHANICAL_ELEMENTS: {
        gear: { name: 'Шестерня', symbol: '<img src="assets/gear.png" class="element-img">', category: 'mechanical' },
        spring: { name: 'Пружина', symbol: '<img src="assets/spring.png" class="element-img">', category: 'mechanical' },
        lever: { name: 'Рычаг', symbol: '<img src="assets/controller.png" class="element-img">', category: 'mechanical' },
        screw: { name: 'Винт', symbol: '<img src="assets/bolt.png" class="element-img">', category: 'fastener' },
        nut: { name: 'Гайка', symbol: '<img src="assets/metal.png" class="element-img">', category: 'fastener' },
    },
    
    POWER_SOURCES: {
        battery: { name: 'Батарея', symbol: '<img src="assets/tire.png" class="element-img">', category: 'power' },
        generator: { name: 'Генератор', symbol: '<img src="assets/electric-generator.png" class="element-img">', category: 'power' },
        solarPanel: { name: 'Солнечная панель', symbol: '<img src="assets/solar-panel.png" class="element-img">', category: 'power' },
        dynamo: { name: 'Динамо-машина', symbol: '<img src="assets/electric-motor.png" class="element-img">', category: 'power' },
        motor: { name: 'Электродвигатель', symbol: '<img src="assets/car-engine.png" class="element-img">', category: 'power' }
    },
    
    MEASURING_INSTRUMENTS: {
        voltmeter: { name: 'Вольтметр', symbol: '<img src="assets/analyzer.png" class="element-img">', category: 'measurement' },
        ammeter: { name: 'Амперметр', symbol: '<img src="assets/tester.png" class="element-img">', category: 'measurement' },
        ohmmeter: { name: 'Омметр', symbol: '<img src="assets/voltmeter.png" class="element-img">', category: 'measurement' },
        multimeter: { name: 'Мультиметр', symbol: '<img src="assets/electric-meter.png" class="element-img">', category: 'measurement' },
        oscilloscope: { name: 'Осциллограф', symbol: '<img src="assets/electric-meter.png" class="element-img">', category: 'measurement' },
        frequencyCounter: { name: 'Частотомер', symbol: '<img src="assets/voltmeter.png" class="element-img">', category: 'measurement' }
    },
    
    FORMULAS: {
        ohmLaw: { 
            name: 'Закон Ома', 
            formula: 'I = U / R',
            description: 'Сила тока прямо пропорциональна напряжению и обратно пропорциональна сопротивлению'
        },
        power: { 
            name: 'Мощность', 
            formula: 'P = U × I',
            description: 'Мощность равна произведению напряжения на силу тока'
        },
        seriesResistance: { 
            name: 'Последовательное соединение резисторов', 
            formula: 'Rобщ = R₁ + R₂ + ... + Rₙ',
            description: 'Общее сопротивление последовательной цепи равно сумме сопротивлений'
        },
        parallelResistance: { 
            name: 'Параллельное соединение резисторов', 
            formula: '1/Rобщ = 1/R₁ + 1/R₂ + ... + 1/Rₙ',
            description: 'Обратная величина общего сопротивления параллельной цепи равна сумме обратных величин сопротивлений'
        },
        voltageDivider: {
            name: 'Делитель напряжения',
            formula: 'U₂ = U × (R₂ / (R₁ + R₂))',
            description: 'Выходное напряжение делителя пропорционально отношению сопротивлений'
        },
        energy: {
            name: 'Энергия',
            formula: 'E = P × t',
            description: 'Энергия равна произведению мощности на время'
        },
        capacitance: {
            name: 'Ёмкость конденсатора',
            formula: 'C = Q / U',
            description: 'Ёмкость равна отношению заряда к напряжению'
        },
        inductance: {
            name: 'Индуктивность',
            formula: 'U = L × (dI/dt)',
            description: 'Напряжение на индуктивности пропорционально скорости изменения тока'
        }
    },
    
    IDENTIFICATION_TASKS: [
        {
            id: 'electrical',
            name: 'Электрические элементы',
            description: 'Выберите элементы, которые используются в электрических схемах',
            correctCategory: 'ELECTRICAL_ELEMENTS',
            incorrectCategories: ['MECHANICAL_ELEMENTS', 'POWER_SOURCES', 'MEASURING_INSTRUMENTS']
        },
        {
            id: 'mechanical',
            name: 'Механические компоненты',
            description: 'Выберите элементы, которые являются механическими компонентами',
            correctCategory: 'MECHANICAL_ELEMENTS',
            incorrectCategories: ['ELECTRICAL_ELEMENTS', 'POWER_SOURCES', 'MEASURING_INSTRUMENTS']
        },
        {
            id: 'power_sources',
            name: 'Источники питания',
            description: 'Выберите элементы, которые являются источниками электрической энергии',
            correctCategory: 'POWER_SOURCES',
            incorrectCategories: ['ELECTRICAL_ELEMENTS', 'MECHANICAL_ELEMENTS', 'MEASURING_INSTRUMENTS']
        },
        {
            id: 'measuring',
            name: 'Измерительные приборы',
            description: 'Выберите приборы для измерения электрических величин',
            correctCategory: 'MEASURING_INSTRUMENTS',
            incorrectCategories: ['ELECTRICAL_ELEMENTS', 'MECHANICAL_ELEMENTS', 'POWER_SOURCES']
        }
    ]
};

/**
 * КЛАСС ДЛЯ РАБОТЫ С ХРАНИЛИЩЕМ
 */
class GameStorage {
    static STORAGE_KEY = 'electric_schemes_results';
    static PROGRESS_KEY = 'electric_schemes_progress';

    static saveResult(gameData) {
        const results = this.getResults();
        results.push(gameData);
        results.sort((a, b) => b.score - a.score);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(results.slice(0, 50)));
    }

    static getResults() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    static clearResults() {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    static saveProgress(gameState) {
        localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(gameState));
    }

    static loadProgress() {
        const data = localStorage.getItem(this.PROGRESS_KEY);
        return data ? JSON.parse(data) : null;
    }

    static clearProgress() {
        localStorage.removeItem(this.PROGRESS_KEY);
    }
}

/**
 * КЛАСС ДЛЯ ОТЛАДКИ И КОМБИНАЦИЙ КЛАВИШ
 */
class DebugController {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.debugKeys = { s: false, t: false, l: false };
        this.enabled = true;
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        this.boundHandleKeyUp = this.handleKeyUp.bind(this);
        this.boundResetKeys = this.resetKeys.bind(this);
        this.init();
    }

    init() {
        this.removeListeners();
        
        document.addEventListener('keydown', this.boundHandleKeyDown);
        document.addEventListener('keyup', this.boundHandleKeyUp);
        window.addEventListener('focus', this.boundResetKeys);
        window.addEventListener('blur', this.boundResetKeys);
        
        this.resetKeys();
    }

    removeListeners() {
        document.removeEventListener('keydown', this.boundHandleKeyDown);
        document.removeEventListener('keyup', this.boundHandleKeyUp);
        window.removeEventListener('focus', this.boundResetKeys);
        window.removeEventListener('blur', this.boundResetKeys);
    }

    handleKeyDown(e) {
        if (!this.enabled) return;
        
        const key = e.key.toLowerCase();
        
        if (['s', 't', 'l'].includes(key)) {
            this.debugKeys[key] = true;
            e.preventDefault();
            
            this.checkCombinations();
        }
    }

    handleKeyUp(e) {
        if (!this.enabled) return;
        
        const key = e.key.toLowerCase();
        
        if (['s', 't', 'l'].includes(key)) {
            setTimeout(() => {
                this.debugKeys[key] = false;
            }, 200);
        }
    }

    checkCombinations() {
        if (this.debugKeys.s && this.debugKeys.t) {
            console.log('Debug: Skip task combination detected');
            this.game.skipTask();
            this.resetKeys();
        }
        
        if (this.debugKeys.s && this.debugKeys.l) {
            console.log('Debug: Skip level combination detected');
            this.game.skipLevel();
            this.resetKeys();
        }
    }

    resetKeys() {
        console.log('Debug: Resetting key states');
        this.debugKeys = { s: false, t: false, l: false };
    }

    enable() {
        this.enabled = true;
        this.init();
    }

    disable() {
        this.enabled = false;
        this.resetKeys();
        this.removeListeners();
    }
}

class ConnectionChecker {
    static checkCircuitByConnections(elements, connections, requiredConnections) {
        console.log('=== Проверка схемы ===');
        console.log('Элементы:', elements.map(el => el.type));
        console.log('Соединения:', connections);
        console.log('Требуемые соединения:', requiredConnections);
        
        const elementTypes = elements.map(el => el.type);
        const requiredTypes = requiredConnections.flat();
        const uniqueRequiredTypes = [...new Set(requiredTypes)];
        
        for (const type of uniqueRequiredTypes) {
            if (!elementTypes.includes(type)) {
                console.log(`❌ Отсутствует элемент: ${type}`);
                return false;
            }
        }
        
        const graph = {};
        elements.forEach(el => {
            graph[el.id] = { type: el.type, connections: [] };
        });
        
        connections.forEach(conn => {
            if (graph[conn.from] && graph[conn.to]) {
                graph[conn.from].connections.push(conn.to);
                graph[conn.to].connections.push(conn.from);
            }
        });
        
        console.log('Граф соединений:', graph);
        
        for (const [type1, type2] of requiredConnections) {
            const elements1 = elements.filter(el => el.type === type1);
            const elements2 = elements.filter(el => el.type === type2);
            
            let foundConnection = false;
            
            for (const el1 of elements1) {
                for (const el2 of elements2) {
                    if (el1.id === el2.id) continue;
                    
                    if (this.areDirectlyConnected(graph, el1.id, el2.id)) {
                        foundConnection = true;
                        console.log(`✅ Найдено соединение: ${type1}(${el1.id}) ↔ ${type2}(${el2.id})`);
                        break;
                    }
                }
                if (foundConnection) break;
            }
            
            if (!foundConnection) {
                console.log(`❌ Нет соединения между ${type1} и ${type2}`);
                return false;
            }
        }
        
        if (elements.length > 0) {
            const battery = elements.find(el => el.type === 'battery');
            if (!battery) {
                console.log('❌ Нет батареи в цепи');
                return false;
            }
            
            const visited = new Set();
            this.dfs(graph, battery.id, visited);
            
            console.log('Посещенные элементы:', visited.size, 'из', elements.length);
            
            if (visited.size !== elements.length) {
                console.log('❌ Цепь не связная. Не все элементы соединены с батареей');
                return false;
            }
        }
        
        console.log('✅ Цепь правильная!');
        return true;
    }
    
    static areDirectlyConnected(graph, id1, id2) {
        return graph[id1]?.connections.includes(id2) || 
               graph[id2]?.connections.includes(id1);
    }
    
    static dfs(graph, nodeId, visited) {
        if (visited.has(nodeId)) return;
        
        visited.add(nodeId);
        
        for (const neighborId of graph[nodeId]?.connections || []) {
            this.dfs(graph, neighborId, visited);
        }
    }
    
    static checkSequentialByOrder(elements, connections, correctOrder) {
        console.log('=== Проверка последовательной цепи ===');
        console.log('Правильный порядок:', correctOrder);
        
        const graph = {};
        elements.forEach(el => {
            graph[el.id] = { type: el.type, connections: [] };
        });
        
        connections.forEach(conn => {
            if (graph[conn.from] && graph[conn.to]) {
                graph[conn.from].connections.push(conn.to);
                graph[conn.to].connections.push(conn.from);
            }
        });
        
        const battery = elements.find(el => el.type === 'battery');
        if (!battery) {
            console.log('❌ Нет батареи');
            return false;
        }
        
        const ends = [];
        for (const element of elements) {
            const degree = graph[element.id]?.connections.length || 0;
            if (degree === 1) {
                ends.push(element.id);
            }
        }
        
        if (ends.length !== 2 && ends.length !== 0) {
            console.log(`❌ Неправильное количество концов: ${ends.length}`);
            return false;
        }
        
        const visited = new Set();
        const orderInGraph = [];
        
        let current = battery.id;
        let prev = null;
        let steps = 0;
        const maxSteps = elements.length * 2;
        
        while (current && !visited.has(current) && steps < maxSteps) {
            visited.add(current);
            orderInGraph.push(graph[current].type);
            
            const neighbors = graph[current].connections.filter(id => id !== prev);
            
            if (neighbors.length === 0) {
                break;
            }
            
            if (neighbors.length > 1) {
                console.log('❌ Найдено разветвление - не последовательная цепь');
                return false;
            }
            
            prev = current;
            current = neighbors[0];
            steps++;
        }
        
        console.log('Найденный порядок:', orderInGraph);
        
        const filteredOrder = orderInGraph.filter(type => correctOrder.includes(type));
        
        console.log('Фильтрованный порядок:', filteredOrder);
        
        const isCorrectOrder = this.compareArrays(filteredOrder, correctOrder);
        const isReversedOrder = this.compareArrays(filteredOrder, [...correctOrder].reverse());
        
        console.log('Прямой порядок:', isCorrectOrder);
        console.log('Обратный порядок:', isReversedOrder);
        
        return isCorrectOrder || isReversedOrder;
    }
    
    static compareArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
}

/**
 * КЛАСС ДЛЯ РАБОТЫ С ЗАДАНИЯМИ
 */
class ElectricalTasks {
    static identificationTasksShuffled = [];
    static formulaProblemsShuffled = [];
    static formulaIndex = 0;

    static initLevel(level) {
        if (level === 1) {
            this.identificationTasksShuffled = [...GameConfig.IDENTIFICATION_TASKS];
            for (let i = this.identificationTasksShuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.identificationTasksShuffled[i], this.identificationTasksShuffled[j]] = 
                [this.identificationTasksShuffled[j], this.identificationTasksShuffled[i]];
            }
        } else if (level === 3) {
            const formulaProblems = [
                {
                    formulaType: 'power',
                    formula: 'P = U × I',
                    name: 'Мощность',
                    description: 'Мощность равна произведению напряжения на силу тока',
                    subtask1: {
                        question: 'Какая формула описывает зависимость между мощностью, напряжением и силой тока?',
                        options: [
                            'P = U × I',
                            'P = I / R',
                            'P = U / R',
                            'P = R × I'
                        ],
                        correctAnswer: 0
                    },
                    subtask2: {
                        generate: () => {
                            const U = Math.floor(Math.random() * 20) + 5;
                            const I = Math.floor(Math.random() * 10) + 2;
                            const P = U * I;
                            return {
                                question: `Напряжение U = ${U} В, сила тока I = ${I} А. Найдите мощность.`,
                                correctAnswer: P,
                                units: 'Вт'
                            };
                        }
                    }
                },
                {
                    formulaType: 'ohm',
                    formula: 'I = U / R',
                    name: 'Закон Ома',
                    description: 'Сила тока прямо пропорциональна напряжению и обратно пропорциональна сопротивлению',
                    subtask1: {
                        question: 'Какая формула описывает зависимость между напряжением, током и сопротивлением?',
                        options: [
                            'I = U / R',
                            'I = R / U',
                            'U = I × R',
                            'R = U × I'
                        ],
                        correctAnswer: 0
                    },
                    subtask2: {
                        generate: () => {
                            let U, R, I;
                            do {
                                U = Math.floor(Math.random() * 30) + 10;
                                R = Math.floor(Math.random() * 10) + 5;
                                I = U / R;
                            } while (I % 1 !== 0);
                            return {
                                question: `Напряжение U = ${U} В, сопротивление R = ${R} Ом. Найдите силу тока.`,
                                correctAnswer: I,
                                units: 'А'
                            };
                        }
                    }
                },
                {
                    formulaType: 'series',
                    formula: 'Rобщ = R₁ + R₂ + ... + Rₙ',
                    name: 'Последовательное соединение резисторов',
                    description: 'Общее сопротивление последовательной цепи равно сумме сопротивлений',
                    subtask1: {
                        question: 'Как рассчитывается общее сопротивление последовательной цепи?',
                        options: [
                            'Rобщ = R₁ + R₂ + ... + Rₙ',
                            '1/Rобщ = 1/R₁ + 1/R₂ + ... + 1/Rₙ',
                            'Rобщ = R₁ × R₂ × ... × Rₙ',
                            'Rобщ = (R₁ + R₂ + ... + Rₙ) / n'
                        ],
                        correctAnswer: 0
                    },
                    subtask2: {
                        generate: () => {
                            const R1 = Math.floor(Math.random() * 15) + 5;
                            const R2 = Math.floor(Math.random() * 15) + 5;
                            const total = R1 + R2;
                            return {
                                question: `Два резистора сопротивлением R₁ = ${R1} Ом и R₂ = ${R2} Ом соединены последовательно. Найдите общее сопротивление.`,
                                correctAnswer: total,
                                units: 'Ом'
                            };
                        }
                    }
                },
                {
                    formulaType: 'parallel',
                    formula: '1/Rобщ = 1/R₁ + 1/R₂ + ... + 1/Rₙ',
                    name: 'Параллельное соединение резисторов',
                    description: 'Обратная величина общего сопротивления параллельной цепи равна сумме обратных величин сопротивлений',
                    subtask1: {
                        question: 'Как рассчитывается общее сопротивление параллельной цепи?',
                        options: [
                            '1/Rобщ = 1/R₁ + 1/R₂ + ... + 1/Rₙ',
                            'Rобщ = R₁ + R₂ + ... + Rₙ',
                            'Rобщ = (R₁ × R₂ × ... × Rₙ) / (R₁ + R₂ + ... + Rₙ)',
                            'Rобщ = n / (1/R₁ + 1/R₂ + ... + 1/Rₙ)'
                        ],
                        correctAnswer: 0
                    },
                    subtask2: {
                        generate: () => {
                            let R1, R2, total;
                            do {
                                R1 = Math.floor(Math.random() * 15) + 5;
                                R2 = Math.floor(Math.random() * 15) + 5;
                                total = (R1 * R2) / (R1 + R2);
                            } while (total % 1 !== 0);
                            return {
                                question: `Два резистора сопротивлением R₁ = ${R1} Ом и R₂ = ${R2} Ом соединены параллельно. Найдите общее сопротивление.`,
                                correctAnswer: total,
                                units: 'Ом'
                            };
                        }
                    }
                }
            ];
            this.formulaProblemsShuffled = [...formulaProblems];
            for (let i = this.formulaProblemsShuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.formulaProblemsShuffled[i], this.formulaProblemsShuffled[j]] = 
                [this.formulaProblemsShuffled[j], this.formulaProblemsShuffled[i]];
            }
            this.formulaIndex = 0;
        }
    }

    static generateProblem(level, problemType) {
        switch(level) {
            case 1:
                return this.generateIdentificationProblem();
            case 2:
                return this.generateAssemblyProblem();
            case 3:
                return this.generateFormulaProblem();
            default:
                return this.generateIdentificationProblem();
        }
    }

    static generateIdentificationProblem() {
        return this.generateSpecificIdentificationProblem();
    }

    static generateSpecificIdentificationProblem(questionNumber = 1) {
        if (this.identificationTasksShuffled.length === 0) {
            this.initLevel(1);
        }
        const taskType = this.identificationTasksShuffled[questionNumber - 1];
        if (!taskType) {
            console.error('Нет задачи для вопроса', questionNumber);
            return null;
        }
        
        const correctCategory = GameConfig[taskType.correctCategory];
        const correctKeys = Object.keys(correctCategory);
        
        const correctCount = Math.floor(Math.random() * 3) + 3;
        
        const selectedCorrect = [];
        while (selectedCorrect.length < correctCount && selectedCorrect.length < correctKeys.length) {
            const randomKey = correctKeys[Math.floor(Math.random() * correctKeys.length)];
            if (!selectedCorrect.includes(randomKey)) {
                selectedCorrect.push(randomKey);
            }
        }
        
        const selectedIncorrect = [];
        const allIncorrectCategories = taskType.incorrectCategories.flatMap(cat => {
            const category = GameConfig[cat];
            return Object.keys(category).map(key => ({ key, category: cat }));
        });
        
        const shuffledIncorrect = [...allIncorrectCategories].sort(() => Math.random() - 0.5);
        
        const incorrectCount = 8 - correctCount;
        
        while (selectedIncorrect.length < incorrectCount && selectedIncorrect.length < shuffledIncorrect.length) {
            const item = shuffledIncorrect[selectedIncorrect.length];
            selectedIncorrect.push(item.key);
        }
        
        const allElements = [...selectedCorrect, ...selectedIncorrect];
        
        for (let i = allElements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allElements[i], allElements[j]] = [allElements[j], allElements[i]];
        }
        
        return {
            type: 'identification',
            taskType: taskType.id,
            taskName: taskType.name,
            questionText: taskType.description,
            elements: allElements,
            correctAnswers: selectedCorrect,
            correctCategory: taskType.correctCategory
        };
    }

    static generateAssemblyProblem(questionNumber = 1) {
        const circuitTypes = ['sequential', 'parallel', 'mixed'];
        const circuitType = circuitTypes[(questionNumber - 1) % circuitTypes.length];
        
        const requiredElements = ['battery'];
        
        const hasSwitch = Math.random() > 0.5;
        if (hasSwitch) {
            requiredElements.push('switch');
        }
        
        const electricalElements = Object.keys(GameConfig.ELECTRICAL_ELEMENTS);
        
        const additionalCount = circuitType === 'mixed' 
            ? Math.floor(Math.random() * 2) + 3
            : Math.floor(Math.random() * 2) + 2;
        
        const additionalElements = [];
        while (additionalElements.length < additionalCount) {
            const randomElement = electricalElements[Math.floor(Math.random() * electricalElements.length)];
            if (randomElement !== 'battery' && 
                randomElement !== 'switch' && 
                !additionalElements.includes(randomElement)) {
                additionalElements.push(randomElement);
            }
        }
        
        requiredElements.push(...additionalElements);
        
        let text = '';
        let requiredConnections = [];
        let correctOrder = [];
        let mixedType = 'A';
        
        switch(circuitType) {
            case 'sequential':
                text = `Соберите последовательно цепь из этих элементов(в том порядке в котором указаны): ${requiredElements.map(el => 
                    GameConfig.ELECTRICAL_ELEMENTS[el]?.name || 
                    GameConfig.POWER_SOURCES[el]?.name
                ).join(', ')}`;
                
                correctOrder = [...requiredElements];
                for (let i = 0; i < correctOrder.length - 1; i++) {
                    requiredConnections.push([correctOrder[i], correctOrder[i + 1]]);
                }
                break;
                
            case 'parallel':
                text = `Соберите параллельную цепь. Все элементы должны быть подключены к батарее напрямую: ${requiredElements.filter(el => el !== 'battery').map(el => 
                    GameConfig.ELECTRICAL_ELEMENTS[el]?.name || 
                    GameConfig.POWER_SOURCES[el]?.name
                ).join(', ')}`;
                
                const parallelElements = requiredElements.filter(el => el !== 'battery');
                
                parallelElements.forEach(el => {
                    requiredConnections.push(['battery', el]);
                });
                break;  
                
            case 'mixed':
                const mixedTypes = ['A', 'B1', 'B2'];
                mixedType = mixedTypes[Math.floor(Math.random() * mixedTypes.length)];
                
                const mixedElements = requiredElements.filter(el => el !== 'battery');
                
                if (mixedElements.length >= 3) {
                    const shuffled = [...mixedElements].sort(() => Math.random() - 0.5);
                    const element1 = shuffled[0];
                    const element2 = shuffled[1];
                    const element3 = shuffled[2];
                    
                    const element1Name = GameConfig.ELECTRICAL_ELEMENTS[element1]?.name || element1;
                    const element2Name = GameConfig.ELECTRICAL_ELEMENTS[element2]?.name || element2;
                    const element3Name = GameConfig.ELECTRICAL_ELEMENTS[element3]?.name || element3;
                    
                    switch(mixedType) {
                        case 'A':
                            text = `Соберите смешанную цепь типа A:<br><br>
                                1. Создайте параллельный участок из ${element1Name} и ${element2Name}<br>
                                2. Подключите ${element3Name} последовательно после параллельного участка`;
                            
                            requiredConnections = [
                                ['battery', element1],
                                ['battery', element2],
                                [element1, element3],
                                [element2, element3]
                            ];
                            
                            if (hasSwitch && element3 !== 'switch') {
                                requiredConnections.push([element3, 'switch']);
                            }
                            break;
                            
                        case 'B1':
                            if (!hasSwitch) {
                                requiredElements.push('switch');
                                requiredConnections = [
                                    ['battery', element1],
                                    [element1, element2],
                                    [element1, element3],
                                    [element2, 'switch']
                                ];
                                
                                text = `Соберите смешанную цепь типа B1:<br><br>
                                    1. ${element1Name} подключен последовательно после батареи<br>
                                    2. Создайте параллельный участок:<br>
                                       - Ветвь 1: ${element2Name} и выключатель последовательно<br>
                                       - Ветвь 2: ${element3Name}`;
                            } else {
                                requiredConnections = [
                                    ['battery', element1],
                                    [element1, element2],
                                    [element1, element3],
                                    [element2, 'switch']
                                ];
                                
                                text = `Соберите смешанную цепь типа B1:<br><br>
                                    1. ${element1Name} подключен последовательно после батареи<br>
                                    2. Создайте параллельный участок:<br>
                                       - Ветвь 1: ${element2Name} и выключатель последовательно<br>
                                       - Ветвь 2: ${element3Name}`;
                            }
                            break;
                            
                        case 'B2':
                            if (!hasSwitch) {
                                requiredElements.push('switch');
                                requiredConnections = [
                                    ['battery', element1],
                                    [element1, element2],
                                    [element1, element3],
                                    [element3, 'switch']
                                ];
                                
                                text = `Соберите смешанную цепь типа B2:<br><br>
                                    1. ${element1Name} подключен последовательно после батареи<br>
                                    2. Создайте параллельный участок:<br>
                                       - Ветвь 1: ${element2Name}<br>
                                       - Ветвь 2: ${element3Name} и выключатель последовательно`;
                            } else {
                                requiredConnections = [
                                    ['battery', element1],
                                    [element1, element2],
                                    [element1, element3],
                                    [element3, 'switch']
                                ];
                                
                                text = `Соберите смешанную цепь типа B2:<br><br>
                                    1. ${element1Name} подключен последовательно после батареи<br>
                                    2. Создайте параллельный участок:<br>
                                       - Ветвь 1: ${element2Name}<br>
                                       - Ветвь 2: ${element3Name} и выключатель последовательно`;
                            }
                            break;
                    }
                } else {
                    mixedType = 'A';
                    text = `Соберите смешанную цепь из: ${requiredElements.map(el => 
                        GameConfig.ELECTRICAL_ELEMENTS[el]?.name || el
                    ).join(', ')}`;
                    
                    const allExceptBattery = requiredElements.filter(el => el !== 'battery');
                    allExceptBattery.forEach(el => {
                        requiredConnections.push(['battery', el]);
                    });
                }
                break;
        }
        
        return {
            id: `${circuitType}_${questionNumber}${circuitType === 'mixed' ? `_${mixedType}` : ''}`,
            text: text,
            type: circuitType,
            mixedType: circuitType === 'mixed' ? mixedType : undefined,
            requiredElements: requiredElements,
            correctOrder: correctOrder,
            requiredConnections: requiredConnections,
            hasSwitch: hasSwitch,
            additionalElements: additionalElements
        };
    }

    static generateFormulaProblem() {
        if (this.formulaProblemsShuffled.length === 0) {
            this.initLevel(3);
        }
        const selectedFormula = this.formulaProblemsShuffled[this.formulaIndex];
        this.formulaIndex = (this.formulaIndex + 1) % this.formulaProblemsShuffled.length;
        
        if (!selectedFormula) {
            console.error('Нет задачи для формулы');
            return null;
        }
        
        const subtask2 = selectedFormula.subtask2.generate();
        
        const shuffledOptions = [...selectedFormula.subtask1.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        const originalCorrectAnswer = selectedFormula.subtask1.correctAnswer;
        const correctAnswerText = selectedFormula.subtask1.options[originalCorrectAnswer];
        const newCorrectAnswer = shuffledOptions.indexOf(correctAnswerText);
        
        return {
            type: 'formula',
            formulaType: selectedFormula.formulaType,
            name: selectedFormula.name,
            formula: selectedFormula.formula,
            description: selectedFormula.description,
            subtask: 1,
            subtask1: {
                question: selectedFormula.subtask1.question,
                options: shuffledOptions, 
                correctAnswer: newCorrectAnswer 
            },
            subtask2: subtask2
        };
    }

    static checkAnswer(problem, userAnswer) {
        switch(problem.type) {
            case 'identification':
                const correctSet = new Set(problem.correctAnswers);
                const userSet = new Set(userAnswer);
                
                if (userSet.size !== correctSet.size) return false;
                for (const item of userSet) {
                    if (!correctSet.has(item)) return false;
                }
                return true;
                
            case 'formula':
                if (problem.subtask === 1) {
                    return userAnswer === problem.subtask1.correctAnswer;
                } else if (problem.subtask === 2) {
                    return parseInt(userAnswer) === problem.subtask2.correctAnswer;
                }
                return false;
                
            default:
                return false;
        }
    }
}

/**
 * ОСНОВНОЙ КЛАСС ИГРЫ
 */
class ElectricSchemesGame {
    debugCircuit() {
        console.log('=== Отладка схемы ===');
        console.log('Элементы:', this.state.placedElements);
        console.log('Соединения:', this.state.connections);
        console.log('Требуемые соединения:', this.currentProblem?.requiredConnections);
        
        const problem = this.currentProblem;
        if (problem && problem.type === 'sequential') {
            console.log('Проверка последовательной цепи...');
            const result = ConnectionChecker.checkSequentialByOrder(
                this.state.placedElements,
                this.state.connections,
                problem.correctOrder
            );
            console.log('Результат:', result);
        } else if (problem && (problem.type === 'parallel' || problem.type === 'mixed')) {
            console.log('Проверка цепи по соединениям...');
            const result = ConnectionChecker.checkCircuitByConnections(
                this.state.placedElements,
                this.state.connections,
                problem.requiredConnections
            );
            console.log('Результат:', result);
        }
    }

    constructor() {
        this.state = {
            playerName: '',
            currentLevel: 1,
            currentQuestion: 1,
            score: 0,
            isPaused: false,
            isGameOver: false,
            attemptsLeft: 3,
            placedElements: [],
            connections: [],
            selectedElement: null,
            selectedIdentifications: new Set()
        };

        this.elements = {};
        this.dragState = {
            isDragging: false,
            element: null,
            offsetX: 0,
            offsetY: 0,
            lastX: 0,
            lastY: 0
        };

        this.currentProblem = null;
        this.timeLeft = 0;
        this.timerInterval = null;
        this.wiresContainer = null;
        this.animationFrame = null;
        this.selectedFormulaAnswer = undefined;
        this.selectedNumericAnswer = '';
        
        this.debugController = new DebugController(this);
    }

    init() {
        this.loadPlayerData();
        this.initDOMElements();
        this.initEventListeners();
        this.loadLevel();
        this.updateUI();
        this.initMouseHandlers();
    }

    loadPlayerData() {
        this.state.playerName = localStorage.getItem('playerName') || 'Игрок';
    }

    initDOMElements() {
        this.elements.playerName = document.getElementById('playerNameDisplay');
        this.elements.currentLevel = document.getElementById('currentLevel');
        this.elements.currentLevelDisplay = document.getElementById('currentLevelDisplay');
        this.elements.timer = document.getElementById('timer');
        this.elements.score = document.getElementById('score');
        this.elements.attempts = document.getElementById('attempts');
        this.elements.questionCounter = document.getElementById('questionCounter');

        this.elements.pauseBtn = document.getElementById('pauseBtn');
        this.elements.checkBtn = document.getElementById('checkBtn');
        this.elements.resetBtn = document.getElementById('resetBtn');
        this.elements.quitBtn = document.getElementById('quitBtn');
        
        this.elements.elementsGrid = document.getElementById('elementsGrid');
        this.elements.dropZone = document.getElementById('dropZone');
        this.elements.taskDescription = document.getElementById('taskDescription');
        this.elements.questionText = document.getElementById('questionText');
        this.elements.answerArea = document.getElementById('answerArea');
        this.elements.feedback = document.getElementById('feedback');
        this.elements.hintsList = document.getElementById('hintsList');
        this.elements.identificationArea = document.getElementById('identificationArea');
        this.elements.formulaArea = document.getElementById('formulaArea');
        this.elements.elementsPanel = document.getElementById('elementsPanel');
        this.elements.circuitArea = document.getElementById('circuitArea');
        
        this.elements.pauseModal = document.getElementById('pauseModal');
        this.elements.pauseInfo = document.getElementById('pauseInfo'); 
        this.elements.levelCompleteModal = document.getElementById('levelCompleteModal');
        
        this.elements.levelRulesModal = document.getElementById('levelRulesModal');
        this.elements.levelRulesLevel = document.getElementById('levelRulesLevel');
        this.elements.levelRulesText = document.getElementById('levelRulesText');
        this.elements.startLevelBtn = document.getElementById('startLevelBtn');

        this.elements.correctAnswerModal = document.getElementById('correctAnswerModal');
        this.elements.wrongAnswerModal = document.getElementById('wrongAnswerModal');
        this.elements.nextQuestionBtn = document.getElementById('nextQuestionBtn');
        this.elements.tryAgainBtn = document.getElementById('tryAgainBtn');
        this.elements.attemptsLeftSpan = document.getElementById('attemptsLeftSpan');
        
        this.elements.hintsPanel = document.getElementById('hintsPanel'); 

        this.elements.debugSkipTaskBtn = document.getElementById('debugSkipTaskBtn');
        this.elements.debugSkipLevelBtn = document.getElementById('debugSkipLevelBtn');

        this.createWiresContainer();
    }

    updatePauseModalContent() {
        const level = this.state.currentLevel;
        const levelData = GameConfig.LEVELS[level];
        const scoring = GameConfig.SCORING;

        let html = `
            <p><strong>Уровень ${level}: ${levelData.description}</strong></p>
            <p>Текущий вопрос: ${this.state.currentQuestion}/${levelData.questions}</p>
            <p>Осталось времени: ${Math.floor(this.timeLeft / 60)}:${(this.timeLeft % 60).toString().padStart(2, '0')}</p>
            <p>Попыток: ${this.state.attemptsLeft}</p>
            <p>Баллы: ${this.state.score}</p>
            <hr>
            <p><strong>Правила уровня:</strong></p>
            <ul>
                <li>Правильный ответ: +${scoring.CORRECT_ANSWER * levelData.difficultyMultiplier}</li>
                <li>Неправильный ответ: ${scoring.WRONG_ANSWER * levelData.difficultyMultiplier}</li>
                <li>Завершение уровня: +${scoring.LEVEL_COMPLETE * levelData.difficultyMultiplier}</li>
                <li>Бонус за время: +${scoring.TIME_BONUS * levelData.difficultyMultiplier} (если останется >50% времени)</li>
            </ul>
        `;

        if (level === 2) {
            html += `
                <hr>
                <p><strong>Управление схемой:</strong></p>
                <ul>
                    <li>🔹 Перетащите элемент из панели слева в рабочую область</li>
                    <li>🔹 Чтобы соединить элементы: кликните на первый элемент (он выделится), затем на второй</li>
                    <li>🔹 Чтобы удалить элемент: дважды кликните по нему или нажмите клавишу R (предварительно выделив)</li>
                    <li>🔹 При удалении элемента все связанные с ним соединения также удаляются</li>
                    <li>🔹 Кнопка "Сбросить" очищает всю схему</li>
                </ul>
            `;
        }

        this.elements.pauseInfo.innerHTML = html;
    }

    updateHints() {
        const level = this.state.currentLevel;
        const hintsList = this.elements.hintsList;
        if (!hintsList) return;

        if (level === 2) {
            this.elements.hintsPanel.style.display = 'block';
            hintsList.innerHTML = `
                <div class="hint-item">• Двойной клик по элементу — удалить</div>
                <div class="hint-item">• Клавиша R (при выделенном элементе) — удалить</div>
                <div class="hint-item">• Клик — выделить, затем клик на другой — соединить</div>
                <div class="hint-item">• При удалении элемента соединения пропадают</div>
            `;
        } else {
            this.elements.hintsPanel.style.display = 'none';
        }
    }



    createWiresContainer() {
        const oldContainer = this.elements.dropZone?.querySelector('.wires-container');
        if (oldContainer) oldContainer.remove();
        
        this.wiresContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.wiresContainer.classList.add('wires-container');
        this.wiresContainer.setAttribute('width', '100%');
        this.wiresContainer.setAttribute('height', '100%');
        if (this.elements.dropZone) {
            this.elements.dropZone.appendChild(this.wiresContainer);
        }
    }

    initEventListeners() {
        this.elements.pauseBtn?.addEventListener('click', () => this.togglePause());
        this.elements.checkBtn?.addEventListener('click', () => this.checkAnswer());
        this.elements.resetBtn?.addEventListener('click', () => this.resetWorkspace());
        this.elements.quitBtn?.addEventListener('click', () => this.quitToMenu());

        this.elements.debugSkipTaskBtn?.addEventListener('click', () => this.skipTask());
        this.elements.debugSkipLevelBtn?.addEventListener('click', () => this.skipLevel());
        
        document.getElementById('resumeBtn')?.addEventListener('click', () => this.resumeGame());
        document.getElementById('quitToMenuBtn')?.addEventListener('click', () => this.quitToMenu());
        document.getElementById('nextLevelBtn')?.addEventListener('click', () => this.nextLevel());
        document.getElementById('finishGameBtn')?.addEventListener('click', () => this.finishGame());
        document.getElementById('finishGameFromModalBtn')?.addEventListener('click', () => this.finishGame());
        
        this.elements.startLevelBtn?.addEventListener('click', () => this.startLevelAfterRules());

        this.elements.nextQuestionBtn?.addEventListener('click', () => this.nextQuestion());
        this.elements.tryAgainBtn?.addEventListener('click', () => this.resumeAfterWrong());
        
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        this.debugController.enable();
        
        this.initDragAndDrop();
    }

    showLevelRulesModal() {
        const level = this.state.currentLevel;
        const levelData = GameConfig.LEVELS[level];
        const scoring = GameConfig.SCORING;

        let rulesHtml = `
            <p><strong>${levelData.description}</strong></p>
            <p>Количество вопросов: ${levelData.questions}</p>
            <p>Время на уровень: ${Math.floor(levelData.timeLimit / 60)}:${(levelData.timeLimit % 60).toString().padStart(2, '0')} минут</p>
            <p>Попыток: ${this.state.attemptsLeft}</p>
            <p>Баллы:</p>
            <ul>
                <li>Правильный ответ: +${scoring.CORRECT_ANSWER * levelData.difficultyMultiplier}</li>
                <li>Неправильный ответ: ${scoring.WRONG_ANSWER * levelData.difficultyMultiplier}</li>
                <li>Завершение уровня: +${scoring.LEVEL_COMPLETE * levelData.difficultyMultiplier}</li>
                <li>Бонус за время: +${scoring.TIME_BONUS * levelData.difficultyMultiplier} (если останется больше половины времени)</li>
            </ul>
            <p style="color: #FF9800;"> Внимание! Таймер запустится только после нажатия кнопки "Начать уровень".</p>
        `;
        
        this.elements.levelRulesLevel.textContent = level;
        this.elements.levelRulesText.innerHTML = rulesHtml;
        
        this.state.isPaused = true;
        this.elements.levelRulesModal.style.display = 'flex';
    }

    startLevelAfterRules() {
        this.elements.levelRulesModal.style.display = 'none';
        this.state.isPaused = false;
        if (!this.timerInterval) {
            this.startTimer();
        }
    }

    showCorrectModal() {
        this.state.isPaused = true;
        this.elements.correctAnswerModal.style.display = 'flex';
    }

    showWrongModal() {
        this.state.isPaused = true;
        this.elements.attemptsLeftSpan.textContent = this.state.attemptsLeft;
        this.elements.wrongAnswerModal.style.display = 'flex';
    }

    nextQuestion() {
        this.elements.correctAnswerModal.style.display = 'none';
        this.state.isPaused = false;
        const level = GameConfig.LEVELS[this.state.currentLevel];
        this.state.currentQuestion++;
        
        if (this.state.currentQuestion > level.questions) {
            this.completeLevel();
        } else {
            this.loadProblem();
            this.updateUI();
        }
    }

    resumeAfterWrong() {
        this.elements.wrongAnswerModal.style.display = 'none';
        this.state.isPaused = false;
    }

    initDragAndDrop() {
        this.createElementTemplates();
        
        this.elements.dropZone?.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            this.elements.dropZone.classList.add('drag-over');
        });

        this.elements.dropZone?.addEventListener('dragleave', () => {
            this.elements.dropZone.classList.remove('drag-over');
        });

        this.elements.dropZone?.addEventListener('drop', (e) => {
            e.preventDefault();
            this.elements.dropZone.classList.remove('drag-over');
            const elementType = e.dataTransfer.getData('element-type');
            if (!elementType) return;

            const rect = this.elements.dropZone.getBoundingClientRect();
            const x = e.clientX - rect.left - 40;
            const y = e.clientY - rect.top - 40;
            
            this.createElement(elementType, x, y);
        });
    }

    initMouseHandlers() {
        document.addEventListener('mousemove', (e) => {
            if (!this.dragState.isDragging || !this.dragState.element) return;
            
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            
            this.animationFrame = requestAnimationFrame(() => {
                const rect = this.elements.dropZone.getBoundingClientRect();
                let x = e.clientX - rect.left - this.dragState.offsetX;
                let y = e.clientY - rect.top - this.dragState.offsetY;
                
                x = Math.max(10, Math.min(x, rect.width - 70));
                y = Math.max(10, Math.min(y, rect.height - 70));
                
                this.dragState.element.style.left = `${x}px`;
                this.dragState.element.style.top = `${y}px`;
                
                this.updateWiresForElement(this.dragState.element.id);
            });
        });

        document.addEventListener('mouseup', () => {
            if (this.dragState.isDragging) {
                this.dragState.isDragging = false;
                if (this.dragState.element) {
                    this.dragState.element.classList.remove('dragging');
                    
                    const elementId = this.dragState.element.id;
                    const elementIndex = this.state.placedElements.findIndex(el => el.id === elementId);
                    if (elementIndex !== -1) {
                        this.state.placedElements[elementIndex].x = parseInt(this.dragState.element.style.left);
                        this.state.placedElements[elementIndex].y = parseInt(this.dragState.element.style.top);
                    }
                    
                    this.dragState.element = null;
                }
                
                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                    this.animationFrame = null;
                }
            }
        });
    }

    createElementTemplates() {
        if (!this.elements.elementsGrid) return;
        
        this.elements.elementsGrid.innerHTML = '';
        
        const allElements = {
            ...GameConfig.ELECTRICAL_ELEMENTS,
            battery: GameConfig.POWER_SOURCES.battery
        };
        
        Object.entries(allElements).forEach(([type, data]) => {
            const elementDiv = document.createElement('div');
            elementDiv.className = 'element-item';
            elementDiv.draggable = true;
            elementDiv.dataset.type = type;
            elementDiv.title = `Кликните для создания в центре`;
            
            elementDiv.innerHTML = `
                <div class="element-icon">${data.symbol}</div>
                <div class="element-name">${data.name}</div>
            `;
            
            elementDiv.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('element-type', type);
                e.dataTransfer.effectAllowed = 'copy';
            });
            
            elementDiv.addEventListener('click', () => {
                const rect = this.elements.dropZone.getBoundingClientRect();
                this.createElement(type, rect.width/2 - 40, rect.height/2 - 40);
            });
            
            this.elements.elementsGrid.appendChild(elementDiv);
        });
    }

    createElement(type, x, y) {
        let elementData = GameConfig.ELECTRICAL_ELEMENTS[type] || 
                         GameConfig.MECHANICAL_ELEMENTS[type] || 
                         GameConfig.POWER_SOURCES[type] || 
                         GameConfig.MEASURING_INSTRUMENTS[type];
        
        if (!elementData) return;

        const elementId = `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const element = document.createElement('div');
        element.className = 'circuit-element';
        element.id = elementId;
        element.dataset.type = type;
        
        element.innerHTML = `
            <div class="element-icon">${elementData.symbol}</div>
            <div class="element-name">${elementData.name}</div>
        `;
        
        element.style.position = 'absolute';
        element.style.left = `${Math.max(10, Math.min(x, this.elements.dropZone.clientWidth - 80))}px`;
        element.style.top = `${Math.max(10, Math.min(y, this.elements.dropZone.clientHeight - 80))}px`;
        
        this.addElementHandlers(element, elementId, type);
        
        this.elements.dropZone.appendChild(element);
        
        this.state.placedElements.push({
            id: elementId,
            type: type,
            x: parseInt(element.style.left),
            y: parseInt(element.style.top)
        });
        
        this.showFeedback(`Добавлен: ${elementData.name}`, 'info');
        return elementId;
    }

    addElementHandlers(element, elementId, type) {
        element.addEventListener('mousedown', (e) => {
            if (this.state.isPaused || this.state.isGameOver) return;
            if (e.button !== 0) return;
            
            this.dragState.isDragging = true;
            this.dragState.element = element;
            this.dragState.offsetX = e.clientX - element.getBoundingClientRect().left;
            this.dragState.offsetY = e.clientY - element.getBoundingClientRect().top;
            
            element.classList.add('dragging');
            element.style.zIndex = '1000';
            element.style.cursor = 'grabbing';
            
            e.preventDefault();
        });

        element.addEventListener('click', (e) => {
            if (e.button !== 0) return;
            if (this.dragState.isDragging) return;
            
            e.stopPropagation();
            
            if (!this.state.selectedElement) {
                this.selectElement(elementId);
            } else if (this.state.selectedElement === elementId) {
                this.deselectElement();
            } else {
                this.connectElements(this.state.selectedElement, elementId);
            }
        });

        element.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            if (this.state.currentLevel === 2) {
                this.removeElement(elementId);
            }
        });
    }

    selectElement(elementId) {
        if (this.state.selectedElement) {
            const prevElement = document.getElementById(this.state.selectedElement);
            if (prevElement) {
                prevElement.classList.remove('selected');
            }
        }
        
        this.state.selectedElement = elementId;
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('selected');
            this.showFeedback('Элемент выбран. Кликните на другой элемент для соединения', 'info');
        }
    }

    deselectElement() {
        if (this.state.selectedElement) {
            const element = document.getElementById(this.state.selectedElement);
            if (element) {
                element.classList.remove('selected');
            }
            this.state.selectedElement = null;
            this.showFeedback('Выделение снято', 'info');
        }
    }

    connectElements(fromId, toId) {
        if (fromId === toId) {
            this.showFeedback('Нельзя соединить элемент с самим собой!', 'error');
            return;
        }

        const existingConnection = this.state.connections.find(conn => 
            (conn.from === fromId && conn.to === toId) || 
            (conn.from === toId && conn.to === fromId)
        );

        if (existingConnection) {
            this.showFeedback('Элементы уже соединены!', 'info');
            return;
        }

        this.createWire(fromId, toId);
        
        const connectionId = `wire_${fromId}_${toId}`;
        this.state.connections.push({
            id: connectionId,
            from: fromId,
            to: toId
        });

        this.deselectElement();
        this.showFeedback('Элементы соединены!', 'success');
    }

    createWire(fromId, toId) {
        const fromElement = document.getElementById(fromId);
        const toElement = document.getElementById(toId);
        if (!fromElement || !toElement) return;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const lineId = `wire_${fromId}_${toId}`;
        line.id = lineId;

        const updateWirePosition = () => {
            const fromRect = fromElement.getBoundingClientRect();
            const toRect = toElement.getBoundingClientRect();
            const dropRect = this.elements.dropZone.getBoundingClientRect();

            const x1 = fromRect.left - dropRect.left + fromRect.width / 2;
            const y1 = fromRect.top - dropRect.top + fromRect.height / 2;
            const x2 = toRect.left - dropRect.left + toRect.width / 2;
            const y2 = toRect.top - dropRect.top + toRect.height / 2;

            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
        };

        line.setAttribute('stroke', '#2196F3');
        line.setAttribute('stroke-width', '4');
        line.setAttribute('stroke-linecap', 'round');
        line.classList.add('wire');
        
        updateWirePosition();
        this.wiresContainer.appendChild(line);

        line.updatePosition = updateWirePosition;
    }

    updateWiresForElement(elementId) {
        const relatedConnections = this.state.connections.filter(conn => 
            conn.from === elementId || conn.to === elementId
        );

        relatedConnections.forEach(conn => {
            const wire = document.getElementById(conn.id);
            if (wire && wire.updatePosition) {
                wire.updatePosition();
            }
        });
    }

    removeElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) element.remove();

        this.state.placedElements = this.state.placedElements.filter(el => el.id !== elementId);

        const connectionsToRemove = this.state.connections.filter(conn => 
            conn.from === elementId || conn.to === elementId
        );

        connectionsToRemove.forEach(conn => {
            const wire = document.getElementById(conn.id);
            if (wire) wire.remove();
        });

        this.state.connections = this.state.connections.filter(conn => 
            conn.from !== elementId && conn.to !== elementId
        );

        if (this.state.selectedElement === elementId) {
            this.deselectElement();
        }

        this.showFeedback('Элемент удален', 'info');
    }

    loadLevel() {
        if (this.state.currentLevel > Object.keys(GameConfig.LEVELS).length) {
            this.completeGame();
            return;
        }
        
        const level = GameConfig.LEVELS[this.state.currentLevel];
        if (!level) {
            this.completeGame();
            return;
        }

        ElectricalTasks.initLevel(this.state.currentLevel);

        this.state.currentQuestion = 1;
        this.timeLeft = level.timeLimit;
        this.clearWorkspace();
        this.updateUI();

        this.elements.taskDescription.textContent = level.description;
        
        this.adjustUIForLevel();
        
        this.loadProblem();

        this.showLevelRulesModal();
    }

    adjustUIForLevel() {
        const level = this.state.currentLevel;
        
        if (this.elements.identificationArea) {
            this.elements.identificationArea.style.display = 'none';
        }
        if (this.elements.formulaArea) {
            this.elements.formulaArea.style.display = 'none';
        }
        if (this.elements.dropZone) {
            this.elements.dropZone.style.display = 'none';
        }
        if (this.elements.elementsGrid) {
            this.elements.elementsGrid.style.display = 'none';
        }
        if (this.elements.elementsPanel) {
            this.elements.elementsPanel.style.display = 'none';
        }
        if (this.elements.circuitArea) {
            this.elements.circuitArea.style.display = 'none';
        }
        if (this.elements.questionText) {
            this.elements.questionText.style.display = 'block';
        }
        
        const oldNumericArea = document.getElementById('numericAnswerArea');
        if (oldNumericArea) {
            oldNumericArea.style.display = 'none';
        }
        
        switch(level) {
            case 1:
                if (this.elements.identificationArea) {
                    this.elements.identificationArea.style.display = 'grid';
                }
                if (this.elements.questionText) {
                    this.elements.questionText.style.display = 'block';
                }
                break;
                
            case 2:
                if (this.elements.elementsPanel) {
                    this.elements.elementsPanel.style.display = 'block';
                }
                if (this.elements.elementsGrid) {
                    this.elements.elementsGrid.style.display = 'grid';
                }
                if (this.elements.circuitArea) {
                    this.elements.circuitArea.style.display = 'block';
                }
                if (this.elements.dropZone) {
                    this.elements.dropZone.style.display = 'block';
                }
                if (this.elements.questionText) {
                    this.elements.questionText.style.display = 'block';
                }
                break;
                
            case 3:
                if (this.elements.formulaArea) {
                    this.elements.formulaArea.style.display = 'block';
                }
                if (this.elements.questionText) {
                    this.elements.questionText.style.display = 'block';
                }

                if (!document.getElementById('numericAnswerArea')) {
                    const numericArea = document.createElement('div');
                    numericArea.id = 'numericAnswerArea';
                    numericArea.className = 'numeric-answer-area';
                    numericArea.style.display = 'none';
                    
                    if (this.elements.formulaArea && this.elements.formulaArea.parentNode) {
                        this.elements.formulaArea.parentNode.insertBefore(numericArea, this.elements.formulaArea.nextSibling);
                    }
                }
                break;
        }

        this.updateHints();
    }

    loadProblem() {
        console.log('=== ЗАГРУЗКА ЗАДАЧИ ===');
        console.log('Уровень:', this.state.currentLevel);
        console.log('Вопрос:', this.state.currentQuestion);
        
        if (this.state.currentLevel === 1) {
            this.currentProblem = ElectricalTasks.generateSpecificIdentificationProblem(this.state.currentQuestion);
        } else if (this.state.currentLevel === 2) {
            this.currentProblem = ElectricalTasks.generateAssemblyProblem(this.state.currentQuestion);
        } else {
            this.currentProblem = ElectricalTasks.generateFormulaProblem();
        }
        
        if (!this.currentProblem) {
            console.error('Не удалось создать задание для уровня', this.state.currentLevel);
            return;
        }
        
        console.log('Тип задачи:', this.currentProblem.type);
        console.log('Детали:', this.currentProblem);
        
        this.clearWorkspace();
        this.state.selectedIdentifications.clear();
        this.selectedFormulaAnswer = undefined;
        this.selectedNumericAnswer = '';
        
        if (this.state.currentLevel === 1) {
            this.loadIdentificationProblem();
        } else if (this.state.currentLevel === 2) {
            this.loadAssemblyProblem();
        } else if (this.state.currentLevel === 3) {
            this.loadFormulaProblem();
        }
    }

    loadIdentificationProblem() {
        if (!this.elements.questionText || !this.elements.identificationArea) {
            console.error('DOM элементы не найдены для уровня идентификации');
            return;
        }
        
        this.elements.questionText.textContent = this.currentProblem.questionText;
        
        this.elements.identificationArea.innerHTML = '';
        
        this.currentProblem.elements.forEach(elementType => {
            let elementData = GameConfig.ELECTRICAL_ELEMENTS[elementType] || 
                             GameConfig.MECHANICAL_ELEMENTS[elementType] || 
                             GameConfig.POWER_SOURCES[elementType] || 
                             GameConfig.MEASURING_INSTRUMENTS[elementType];
            
            if (!elementData) {
                console.error('Данные элемента не найдены для типа:', elementType);
                return;
            }
            
            const elementDiv = document.createElement('div');
            elementDiv.className = 'identification-item';
            elementDiv.dataset.type = elementType;
            elementDiv.title = elementData.name;
            
            elementDiv.innerHTML = `
                <div class="identification-icon">${elementData.symbol}</div>
                <div class="identification-name">${elementData.name}</div>
            `;
            
            elementDiv.addEventListener('click', () => {
                this.toggleIdentificationSelection(elementType, elementDiv);
            });
            
            this.elements.identificationArea.appendChild(elementDiv);
        });
    }

    toggleIdentificationSelection(elementType, elementDiv) {
        if (this.state.selectedIdentifications.has(elementType)) {
            this.state.selectedIdentifications.delete(elementType);
            elementDiv.classList.remove('selected');
        } else {
            this.state.selectedIdentifications.add(elementType);
            elementDiv.classList.add('selected');
        }
    }

    loadAssemblyProblem() {
        if (!this.elements.questionText) {
            console.error('DOM элемент questionText не найден');
            return;
        }
        
        this.elements.questionText.innerHTML = this.currentProblem.text;
    }

    loadFormulaProblem() {
        if (!this.elements.questionText || !this.elements.formulaArea) {
            console.error('DOM элементы не найдены для уровня формул');
            return;
        }
        
        this.elements.formulaArea.innerHTML = '';
        this.elements.formulaArea.style.display = 'block';
        
        const numericArea = document.getElementById('numericAnswerArea');
        if (numericArea) {
            numericArea.style.display = 'none';
        }
        
        this.selectedFormulaAnswer = undefined;
        this.selectedNumericAnswer = '';
        
        if (this.currentProblem.subtask === 1) {
            this.elements.questionText.innerHTML = `
                <strong>${this.currentProblem.name}</strong><br>
                ${this.currentProblem.description}<br><br>
                ${this.currentProblem.subtask1.question}
            `;
            
            this.currentProblem.subtask1.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'formula-option';
                optionDiv.dataset.index = index;
                
                optionDiv.innerHTML = `
                    <div class="formula-text">${option}</div>
                `;
                
                optionDiv.addEventListener('click', () => {
                    document.querySelectorAll('.formula-option').forEach(el => {
                        el.classList.remove('selected');
                    });
                    
                    optionDiv.classList.add('selected');
                    this.selectedFormulaAnswer = index;
                });
                
                this.elements.formulaArea.appendChild(optionDiv);
            });
        } else {
            this.elements.questionText.innerHTML = `
                <strong>${this.currentProblem.name}</strong><br>
                <div style="font-size: 18px; color: #FFEB3B; margin: 10px 0; padding: 10px; background: rgba(255, 235, 59, 0.1); border-radius: 8px;">
                    Формула: ${this.currentProblem.formula}
                </div>
                ${this.currentProblem.subtask2.question}
            `;
            
            this.elements.formulaArea.style.display = 'none';
            
            const numericArea = document.getElementById('numericAnswerArea');
            if (numericArea) {
                numericArea.style.display = 'flex';
                numericArea.style.flexDirection = 'column';
                numericArea.style.alignItems = 'center';
                numericArea.style.gap = '15px';
                
                numericArea.innerHTML = '';

                const inputContainer = document.createElement('div');
                inputContainer.style.display = 'flex';
                inputContainer.style.flexDirection = 'column';
                inputContainer.style.alignItems = 'center';
                inputContainer.style.gap = '10px';

                const label = document.createElement('div');
                label.textContent = 'Введите ответ:';
                label.style.color = '#aaa';
                label.style.fontSize = '16px';

                const input = document.createElement('input');
                input.type = 'number';
                input.id = 'numericAnswerInput';
                input.placeholder = 'Число';
                input.min = '0';
                input.step = '1';
                input.style.width = '200px';
                input.style.padding = '12px 15px';
                input.style.background = 'rgba(255, 255, 255, 0.1)';
                input.style.border = '2px solid rgba(255, 255, 255, 0.2)';
                input.style.borderRadius = '8px';
                input.style.color = 'white';
                input.style.fontSize = '18px';
                input.style.fontWeight = 'bold';
                input.style.textAlign = 'center';
                input.style.transition = 'all 0.3s ease';
                
                input.addEventListener('focus', () => {
                    input.style.borderColor = '#2196F3';
                    input.style.boxShadow = '0 0 10px rgba(33, 150, 243, 0.5)';
                    input.style.background = 'rgba(255, 255, 255, 0.15)';
                });
                
                input.addEventListener('blur', () => {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    input.style.boxShadow = 'none';
                    input.style.background = 'rgba(255, 255, 255, 0.1)';
                });
                
                inputContainer.appendChild(label);
                inputContainer.appendChild(input);
                numericArea.appendChild(inputContainer);

                if (this.currentProblem.subtask2.units) {
                    const unitsLabel = document.createElement('div');
                    unitsLabel.textContent = `Единицы измерения: ${this.currentProblem.subtask2.units}`;
                    unitsLabel.style.color = '#4CAF50';
                    unitsLabel.style.fontSize = '14px';
                    unitsLabel.style.fontWeight = 'bold';
                    numericArea.appendChild(unitsLabel);
                }
                
                setTimeout(() => {
                    input.focus();
                }, 100);
            }
        }
    }

    checkAnswer() {
        if (this.state.isPaused || this.state.isGameOver) return;

        const level = GameConfig.LEVELS[this.state.currentLevel];
        let isCorrect = false;

        if (this.state.currentLevel === 1) {
            isCorrect = this.checkIdentificationAnswer();
        } else if (this.state.currentLevel === 2) {
            isCorrect = this.checkAssemblyAnswer();
        } else if (this.state.currentLevel === 3) {
            isCorrect = this.checkFormulaAnswer();
            if (isCorrect) {
                if (this.currentProblem.subtask === 1) {
                    this.currentProblem.subtask = 2;
                    this.showFeedback('✅ Правильно! Теперь решите задачу.', 'success');
                    
                    setTimeout(() => {
                        this.loadFormulaProblem();
                        this.updateUI();
                    }, 1500);
                    return;
                } else {
                    const points = GameConfig.SCORING.CORRECT_ANSWER * level.difficultyMultiplier;
                    this.updateScore(points);
                    
                    
                    this.showCorrectModal();
                    return;
                }
            } else {
                this.updateScore(GameConfig.SCORING.WRONG_ANSWER);
                this.state.attemptsLeft--;
                
                if (this.state.attemptsLeft <= 0) {
                    this.handleLevelFailure();
                } else {
                    this.showWrongModal();
                }
                this.updateUI();
                return;
            }
        }

        console.log('Результат проверки:', isCorrect);

        if (isCorrect) {
            const points = GameConfig.SCORING.CORRECT_ANSWER * level.difficultyMultiplier;
            this.updateScore(points);
            
            
            this.showCorrectModal();
        } else {
            this.updateScore(GameConfig.SCORING.WRONG_ANSWER);
            this.state.attemptsLeft--;
            
            if (this.state.attemptsLeft <= 0) {
                this.handleLevelFailure();
            } else {
                this.showWrongModal();
            }
        }
        
        this.updateUI();
    }

    checkIdentificationAnswer() {
        const userAnswers = Array.from(this.state.selectedIdentifications);
        return ElectricalTasks.checkAnswer(this.currentProblem, userAnswers);
    }

    checkAssemblyAnswer() {
        const problem = this.currentProblem;

        this.debugCircuit();
        
        const placedTypes = this.state.placedElements.map(el => el.type);
        const hasAllElements = problem.requiredElements.every(type => 
            placedTypes.includes(type)
        );
        
        if (!hasAllElements) {
            const missing = problem.requiredElements.filter(t => !placedTypes.includes(t));
            const missingNames = missing.map(t => 
                GameConfig.ELECTRICAL_ELEMENTS[t]?.name || 
                GameConfig.POWER_SOURCES[t]?.name || 
                t
            );
            this.showFeedback(`Не хватает элементов: ${missingNames.join(', ')}`, 'error');
            return false;
        }
        
        if (this.state.connections.length === 0) {
            this.showFeedback('Элементы не соединены!', 'error');
            return false;
        }
        
        if (problem.type === 'sequential') {
            return this.checkSequentialCircuit(problem);
        } else if (problem.type === 'parallel') {
            return this.checkParallelCircuit(problem);
        } else if (problem.type === 'mixed') {
            return this.checkMixedCircuit(problem);
        }
        
        return false;
    }

    checkSequentialCircuit(problem) {
        return ConnectionChecker.checkSequentialByOrder(
            this.state.placedElements,
            this.state.connections,
            problem.correctOrder
        );
    }

    checkParallelCircuit(problem) {
        return ConnectionChecker.checkCircuitByConnections(
            this.state.placedElements,
            this.state.connections,
            problem.requiredConnections
        );
    }

    checkMixedCircuit(problem) {
        return ConnectionChecker.checkCircuitByConnections(
            this.state.placedElements,
            this.state.connections,
            problem.requiredConnections
        );
    }

    checkFormulaAnswer() {
        if (this.currentProblem.subtask === 1) {
            if (typeof this.selectedFormulaAnswer === 'undefined') {
                this.showFeedback('Выберите вариант ответа!', 'error');
                return false;
            }
            
            return this.selectedFormulaAnswer === this.currentProblem.subtask1.correctAnswer;
        } else {
            const input = document.getElementById('numericAnswerInput');
            if (!input || input.value.trim() === '') {
                this.showFeedback('Введите числовой ответ!', 'error');
                return false;
            }
            
            const userAnswer = parseInt(input.value);
            if (isNaN(userAnswer)) {
                this.showFeedback('Введите корректное число!', 'error');
                return false;
            }
            
            return userAnswer === this.currentProblem.subtask2.correctAnswer;
        }
    }


    completeLevel() {
        const level = GameConfig.LEVELS[this.state.currentLevel];
        const levelScore = GameConfig.SCORING.LEVEL_COMPLETE * level.difficultyMultiplier;
        
        if (this.timeLeft > level.timeLimit * 0.5) {
            const timeBonus = GameConfig.SCORING.TIME_BONUS * level.difficultyMultiplier;
            this.updateScore(timeBonus);
        }
        
        this.state.currentLevel++;
        this.state.attemptsLeft = 3;
        
        if (this.state.currentLevel <= Object.keys(GameConfig.LEVELS).length) {
            this.showLevelCompleteModal();
        } else {
            this.completeGame();
        }
    }

    showLevelCompleteModal() {
        const modal = this.elements.levelCompleteModal;
        document.getElementById('levelScore').textContent = this.state.score;
        document.getElementById('correctAnswers').textContent = this.state.currentQuestion - 1;
        
        const totalSeconds = GameConfig.LEVELS[Math.min(this.state.currentLevel, Object.keys(GameConfig.LEVELS).length)].timeLimit - this.timeLeft;
        document.getElementById('levelTime').textContent = this.formatTime(totalSeconds);

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            setTimeout(() => {
                confetti({
                    particleCount: 50,
                    spread: 100,
                    origin: { y: 0.5, x: 0.3 }
                });
                confetti({
                    particleCount: 50,
                    spread: 100,
                    origin: { y: 0.5, x: 0.7 }
                });
            }, 200);
        }
        
        modal.style.display = 'flex';
        this.state.isPaused = true;
    }

    nextLevel() {
        this.elements.levelCompleteModal.style.display = 'none';
        this.state.isPaused = false;
        this.loadLevel();
    }

    completeGame() {
        this.saveGameResults();
        window.location.href = 'rating.html';
    }

    handleLevelFailure() {
        this.updateScore(GameConfig.SCORING.LEVEL_FAILURE);
        this.showFeedback('⚠️ Попытки закончились! Уровень провален.', 'error');
        
        setTimeout(() => {
            this.restartLevel();
        }, 2000);
    }

    restartLevel() {
        this.state.attemptsLeft = 3;
        this.state.currentQuestion = 1;
        this.clearWorkspace();
        this.loadProblem();
        this.resumeGame();
    }

    updateScore(points) {
        this.state.score = Math.max(0, this.state.score + points);
        this.elements.score.textContent = this.state.score;
        
        this.elements.score.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.elements.score.style.transform = '';
        }, 300);
    }

    updateUI() {
        this.elements.playerName.textContent = this.state.playerName;
        this.elements.currentLevel.textContent = this.state.currentLevel;
        this.elements.currentLevelDisplay.textContent = this.state.currentLevel;
        this.elements.attempts.textContent = this.state.attemptsLeft;
        this.elements.score.textContent = this.state.score;
        this.elements.questionCounter.textContent = 
            `Вопрос: ${this.state.currentQuestion}/${GameConfig.LEVELS[this.state.currentLevel].questions}`;
    }

    showFeedback(message, type) {
        this.elements.feedback.textContent = message;
        this.elements.feedback.className = `feedback ${type}`;
        this.elements.feedback.style.animation = 'slideIn 0.3s ease';
        
        setTimeout(() => {
            if (this.elements.feedback.textContent === message) {
                this.elements.feedback.textContent = '';
                this.elements.feedback.className = 'feedback';
            }
        }, 3000);
    }

    startTimer() {
        clearInterval(this.timerInterval);
        
        this.timerInterval = setInterval(() => {
            if (!this.state.isPaused && !this.state.isGameOver) {
                this.timeLeft--;
                this.updateTimer();
                
                if (this.timeLeft <= 0) {
                    this.handleTimeUp();
                }
            }
        }, 1000);
    }

    updateTimer() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.elements.timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (this.timeLeft < 60) {
            this.elements.timer.classList.add('critical');
        } else if (this.timeLeft < 120) {
            this.elements.timer.classList.add('warning');
        } else {
            this.elements.timer.classList.remove('warning', 'critical');
        }
    }

    handleTimeUp() {
        clearInterval(this.timerInterval);
        this.state.isGameOver = true;
        this.showFeedback('⏰ Время вышло! Игра завершена.', 'error');
        
        setTimeout(() => this.finishGame(), 2000);
    }

    togglePause() {
        this.state.isPaused = !this.state.isPaused;
        
        if (this.state.isPaused) {
            this.updatePauseModalContent(); 
            this.elements.pauseModal.style.display = 'flex';
        } else {
            this.elements.pauseModal.style.display = 'none';
        }
    }

    resumeGame() {
        this.state.isPaused = false;
        this.elements.pauseModal.style.display = 'none';
    }

    quitToMenu() {
        if (confirm('Выйти в меню? Прогресс не будет сохранен.')) {
            this.debugController.disable();
            this.saveGameProgress();
            window.location.href = 'index.html';
        }
    }

    finishGame() {
        if (confirm('Завершить игру и перейти к рейтингу?')) {
            this.debugController.disable();
            this.saveGameResults();
            window.location.href = 'rating.html';
        }
    }

    resetWorkspace() {
        if (confirm('Сбросить все элементы и соединения?')) {
            this.clearWorkspace();
        }
    }

    clearWorkspace() {
        document.querySelectorAll('.circuit-element').forEach(el => el.remove());
        
        if (this.wiresContainer) {
            this.wiresContainer.innerHTML = '';
        }
        
        this.state.placedElements = [];
        this.state.connections = [];
        this.state.selectedElement = null;
        this.selectedFormulaAnswer = undefined;
        this.selectedNumericAnswer = '';

        const oldInput = document.getElementById('numericAnswerInput');
        if (oldInput) {
            oldInput.value = '';
        }
        
        this.showFeedback('Рабочая область очищена', 'info');
    }

    saveGameResults() {
        const lastCompletedLevel = Math.min(this.state.currentLevel, Object.keys(GameConfig.LEVELS).length);
        
        const result = {
            playerName: this.state.playerName,
            score: this.state.score,
            level: lastCompletedLevel,
            time: GameConfig.LEVELS[lastCompletedLevel].timeLimit - this.timeLeft,
            date: new Date().toISOString(),
            questionsCompleted: this.state.currentQuestion - 1
        };
        
        GameStorage.saveResult(result);
        GameStorage.clearProgress();
    }

    saveGameProgress() {
        const progress = {
            currentLevel: this.state.currentLevel,
            currentQuestion: this.state.currentQuestion,
            score: this.state.score,
            timeLeft: this.timeLeft,
            attemptsLeft: this.state.attemptsLeft
        };
        
        GameStorage.saveProgress(progress);
    }

    handleKeyPress(e) {
        if (['s', 't', 'l'].includes(e.key.toLowerCase())) {
            return;
        }
        
        switch(e.key) {
            case ' ':
            case 'Spacebar':
                e.preventDefault();
                this.togglePause();
                break;
            case 'Escape':
                this.togglePause();
                break;
            case 'r':
                if (this.state.selectedElement) {
                    this.removeElement(this.state.selectedElement);
                }
                break;
        }
    }

    handleKeyUp(e) {
        if (['s', 't', 'l'].includes(e.key.toLowerCase())) {
            return;
        }
    }

    skipTask() {
        const level = GameConfig.LEVELS[this.state.currentLevel];
        const points = GameConfig.SCORING.CORRECT_ANSWER * level.difficultyMultiplier;
        this.updateScore(points);
        this.state.currentQuestion++;
        
        if (this.state.currentQuestion > level.questions) {
            this.completeLevel();
        } else {
            this.showFeedback('✅ Задание пропущено (отладка)', 'info');
            
            setTimeout(() => {
                this.elements.taskDescription.innerHTML = '';
                this.elements.questionText.innerHTML = '';
                this.clearWorkspace();
                this.loadProblem();
                this.updateUI();
            }, 1000);
        }
    }

    skipLevel() {
        const level = GameConfig.LEVELS[this.state.currentLevel];
        const levelScore = GameConfig.SCORING.LEVEL_COMPLETE * level.difficultyMultiplier;
        this.updateScore(levelScore);
        
        this.showFeedback('✅ Уровень пропущен (отладка)', 'info');
        
        this.state.currentLevel++;
        this.state.attemptsLeft = 3;
        this.state.currentQuestion = 1;
        
        setTimeout(() => {
            this.elements.taskDescription.innerHTML = '';
            this.elements.questionText.innerHTML = '';
            this.clearWorkspace();
            
            if (this.state.currentLevel <= Object.keys(GameConfig.LEVELS).length) {
                this.loadLevel();
            } else {
                this.completeGame();
            }
        }, 1000);
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

window.GameStorage = GameStorage;
window.ElectricalTasks = ElectricalTasks;
window.ElectricSchemesGame = ElectricSchemesGame;