const LOCAL_STORAGE_KEY = 'cny_angpao_entries';

// State Management Wrapper
class ObjectStore {
    constructor(key) {
        this.key = key;
        this.data = this.loadData();
        this.listeners = [];
    }

    loadData() {
        const rawData = localStorage.getItem(this.key);
        return rawData ? JSON.parse(rawData) : [];
    }

    saveData() {
        localStorage.setItem(this.key, JSON.stringify(this.data));
        this.notifyListeners();
    }

    // Schema: { id, from, amount, timestamp }
    addEntry(from, amount) {
        const newEntry = {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            from: from,
            amount: parseFloat(amount),
            timestamp: new Date().toISOString()
        };

        this.data.push(newEntry);
        this.saveData();
        return newEntry;
    }

    removeEntry(id) {
        this.data = this.data.filter(entry => entry.id !== id);
        this.saveData();
    }

    updateEntry(id, updatedFrom, updatedAmount) {
        const index = this.data.findIndex(entry => entry.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], from: updatedFrom, amount: parseFloat(updatedAmount) };
            this.saveData();
        }
    }

    // Subscribe to state changes (React-like reactivity via callbacks)
    subscribe(listenerCallback) {
        this.listeners.push(listenerCallback);
        listenerCallback(this.data); // trigger initial state
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== listenerCallback);
        }
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.data));
    }
}

// Initialize global store
export const angpaoStore = new ObjectStore(LOCAL_STORAGE_KEY);
