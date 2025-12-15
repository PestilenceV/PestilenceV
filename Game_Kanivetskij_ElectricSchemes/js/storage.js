/**
 * Класс для работы с localStorage
 */

class GameStorage {
    constructor() {
        this.STORAGE_KEY = 'electric_schemes_results';
        this.PROGRESS_KEY = 'electric_schemes_progress';
    }
    
    saveResult(gameData) {
        const results = this.getResults();
        results.push(gameData);
        
        results.sort((a, b) => b.score - a.score);
        
        const topResults = results.slice(0, 50);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(topResults));
    }
    
    getResults() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
    
    clearResults() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
    
    getTopResults(limit = 10) {
        const results = this.getResults();
        return results.slice(0, limit);
    }
    
    getPlayerResults(playerName) {
        const results = this.getResults();
        return results.filter(result => result.playerName === playerName);
    }
    
    saveProgress(gameState) {
        localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(gameState));
    }
    
    loadProgress() {
        const data = localStorage.getItem(this.PROGRESS_KEY);
        return data ? JSON.parse(data) : null;
    }
    
    clearProgress() {
        localStorage.removeItem(this.PROGRESS_KEY);
    }
}

window.GameStorage = GameStorage;