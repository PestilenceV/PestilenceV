/**
 * Класс для работы с электрическими формулами
 */

class ElectricalFormulas {
    static formulas = {
        ohmLaw: {
            name: 'Закон Ома',
            formula: 'I = U / R',
            description: 'Ток прямо пропорционален напряжению и обратно пропорционален сопротивлению',
            units: { I: 'A (Ампер)', U: 'V (Вольт)', R: 'Ω (Ом)' }
        },
        power: {
            name: 'Мощность',
            formula: 'P = U × I',
            description: 'Мощность равна произведению напряжения на ток',
            units: { P: 'W (Ватт)', U: 'V (Вольт)', I: 'A (Ампер)' }
        },
        seriesResistance: {
            name: 'Последовательное соединение резисторов',
            formula: 'Rобщ = R₁ + R₂ + ... + Rₙ',
            description: 'Общее сопротивление равно сумме сопротивлений всех резисторов',
            units: { R: 'Ω (Ом)' }
        },
        parallelResistance: {
            name: 'Параллельное соединение резисторов',
            formula: '1/Rобщ = 1/R₁ + 1/R₂ + ... + 1/Rₙ',
            description: 'Обратная величина общего сопротивления равна сумме обратных величин сопротивлений',
            units: { R: 'Ω (Ом)' }
        },
        voltageDivider: {
            name: 'Делитель напряжения',
            formula: 'Uвых = Uвх × (R₂ / (R₁ + R₂))',
            description: 'Выходное напряжение пропорционально отношению сопротивлений резисторов',
            units: { U: 'V (Вольт)', R: 'Ω (Ом)' }
        }
    };
    
    static getAllFormulas() {
        return this.formulas;
    }
    
    static getRandomFormula() {
        const keys = Object.keys(this.formulas);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return this.formulas[randomKey];
    }
    
    static calculateOhmLaw(known) {
        let result = {};
        
        if (known.U && known.R) {
            result.I = known.U / known.R;
            result.formula = `I = ${known.U}V / ${known.R}Ω`;
            result.value = `${result.I.toFixed(2)}A`;
        } else if (known.U && known.I) {
            result.R = known.U / known.I;
            result.formula = `R = ${known.U}V / ${known.I}A`;
            result.value = `${result.R.toFixed(2)}Ω`;
        } else if (known.I && known.R) {
            result.U = known.I * known.R;
            result.formula = `U = ${known.I}A × ${known.R}Ω`;
            result.value = `${result.U.toFixed(2)}V`;
        }
        
        return result;
    }
    
    static calculatePower(known) {
        let result = {};
        
        if (known.U && known.I) {
            result.P = known.U * known.I;
            result.formula = `P = ${known.U}V × ${known.I}A`;
            result.value = `${result.P.toFixed(2)}W`;
        } else if (known.U && known.R) {
            result.P = (known.U * known.U) / known.R;
            result.formula = `P = (${known.U}V)² / ${known.R}Ω`;
            result.value = `${result.P.toFixed(2)}W`;
        } else if (known.I && known.R) {
            result.P = (known.I * known.I) * known.R;
            result.formula = `P = (${known.I}A)² × ${known.R}Ω`;
            result.value = `${result.P.toFixed(2)}W`;
        }
        
        return result;
    }
    
    static calculateSeriesResistance(resistors) {
        const total = resistors.reduce((sum, r) => sum + r, 0);
        return {
            formula: `Rобщ = ${resistors.join('Ω + ')}Ω`,
            value: `${total}Ω`,
            calculation: total
        };
    }
    
    static calculateParallelResistance(resistors) {
        const inverseSum = resistors.reduce((sum, r) => sum + (1 / r), 0);
        const total = 1 / inverseSum;
        return {
            formula: `1/Rобщ = ${resistors.map(r => `1/${r}Ω`).join(' + ')}`,
            value: `${total.toFixed(2)}Ω`,
            calculation: total
        };
    }
    
    static generateRandomProblem(type) {
        const problems = {
            ohmLaw: this.generateOhmLawProblem(),
            power: this.generatePowerProblem(),
            series: this.generateSeriesProblem(),
            parallel: this.generateParallelProblem()
        };
        
        return problems[type] || problems.ohmLaw;
    }
    
    static generateOhmLawProblem() {
        const U = Math.floor(Math.random() * 20) + 5;
        const R = Math.floor(Math.random() * 900) + 100;
        const I = U / R;
        
        const variants = [
            { given: { U, R }, find: 'I', answer: I.toFixed(2) },
            { given: { U, I: I.toFixed(3) }, find: 'R', answer: R },
            { given: { I: I.toFixed(3), R }, find: 'U', answer: U }
        ];
        
        return variants[Math.floor(Math.random() * variants.length)];
    }
    
    static generatePowerProblem() {
        const U = Math.floor(Math.random() * 20) + 5;
        const I = (Math.random() * 2 + 0.1).toFixed(2);
        const P = U * I;
        
        const variants = [
            { given: { U, I }, find: 'P', answer: P.toFixed(2) },
            // Добавьте больше
        ];
        return variants[0]; // Для примера
    }
    
    static generateSeriesProblem() {
        const resistors = [100, 200, 300];
        const total = resistors.reduce((sum, r) => sum + r, 0);
        return { given: { resistors }, find: 'Rобщ', answer: total };
    }
    
    static generateParallelProblem() {
        const resistors = [100, 200];
        const total = 1 / resistors.reduce((sum, r) => sum + 1/r, 0);
        return { given: { resistors }, find: 'Rобщ', answer: total.toFixed(2) };
    }
    
    static checkAnswer(problem, userAnswer, tolerance = 0.05) {
        const correctAnswer = parseFloat(problem.answer);
        const difference = Math.abs(userAnswer - correctAnswer);
        const allowedDifference = correctAnswer * tolerance;
        
        return difference <= allowedDifference;
    }
}

window.ElectricalFormulas = ElectricalFormulas;