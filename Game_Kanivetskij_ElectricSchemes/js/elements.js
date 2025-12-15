/**
 * Класс для работы с элементами электрических схем
 */

class CircuitElements {
    static getElements() {
        return {
            battery: {
                name: 'Батарея',
                symbol: '🔋',
                description: 'Источник постоянного напряжения',
                voltage: [1.5, 3, 4.5, 6, 9, 12],
                resistance: 0,
                color: '#4CAF50'
            },
            bulb: {
                name: 'Лампочка',
                symbol: '💡',
                description: 'Осветительный прибор',
                voltage: [2.5, 3.5, 6, 12, 24],
                resistance: [10, 20, 30, 40, 50, 60],
                power: [1, 3, 5, 10, 15],
                color: '#FFEB3B'
            },
            resistor: {
                name: 'Резистор',
                symbol: '🔌',
                description: 'Пассивный элемент с сопротивлением',
                resistance: [100, 220, 330, 470, 680, 1000, 2200, 4700, 10000],
                tolerance: 5,
                color: '#FF9800'
            },
            switch: {
                name: 'Выключатель',
                symbol: '🎚️',
                description: 'Коммутационный аппарат',
                type: ['SPST', 'SPDT', 'DPST', 'DPDT'],
                color: '#9C27B0'
            },
            led: {
                name: 'Светодиод',
                symbol: '💎',
                description: 'Полупроводниковый источник света',
                color: ['красный', 'зеленый', 'синий', 'желтый', 'белый'],
                voltage: [1.8, 2.2, 3.2, 3.6],
                current: 20,
                color: '#2196F3'
            },
            capacitor: {
                name: 'Конденсатор',
                symbol: '🔄',
                description: 'Накопитель электрической энергии',
                capacitance: [1, 10, 100, 1000, 10000],
                voltage: [16, 25, 50, 100],
                color: '#FF5722'
            }
        };
    }
    
    static getRandomElement(type = null) {
        const elements = this.getElements();
        
        if (type && elements[type]) {
            return this.generateElementData(elements[type], type);
        }
        
        const keys = Object.keys(elements);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return this.generateElementData(elements[randomKey], randomKey);
    }
    
    static generateElementData(element, type) {
        let value = '';
        
        switch(type) {
            case 'battery':
                const voltage = element.voltage[Math.floor(Math.random() * element.voltage.length)];
                value = `${voltage}V`;
                break;
            case 'resistor':
                const resistance = element.resistance[Math.floor(Math.random() * element.resistance.length)];
                value = `${resistance}Ω`;
                break;
            case 'bulb':
                const power = element.power[Math.floor(Math.random() * element.power.length)];
                value = `${power}W`;
                break;
        }
        
        return {
            type: type,
            name: element.name,
            symbol: element.symbol,
            description: element.description,
            value: value,
            color: element.color
        };
    }
    
    static checkCompatibility(element1, element2) {
        const incompatiblePairs = [
            ['battery', 'battery'],
            ['led', 'battery']
        ];
        
        const pair = [element1.type, element2.type].sort();
        return !incompatiblePairs.some(
            incompatible => incompatible.sort().toString() === pair.toString()
        );
    }
    
    static calculateCurrent(voltage, resistance) {
        if (resistance === 0) return 0;
        return voltage / resistance;
    }
    
    static calculateVoltage(current, resistance) {
        return current * resistance;
    }
    
    static calculateResistance(voltage, current) {
        if (current === 0) return 0;
        return voltage / current;
    }
}

window.CircuitElements = CircuitElements;