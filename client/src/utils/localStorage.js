export function saveToLocalStorage(key, value) {
    try {
        console.log('Saving to localStorage: ', value, key)
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (err) {
        console.log('Error saving data to localStorage: ', err);
    }
}

export function getFromLocalStorage(key) {
    try {
        console.log('Getting from localStorage: ', key)
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return undefined;
        return JSON.parse(serializedValue);
    } catch (err) {
        console.log('Error getting data from localStorage: ', err);
        return undefined;
    }
}

export function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.log('Error removing data from localStorage: ', err);
    }
}

export function clearLocalStorage() {
    try { 
        localStorage.clear();
    } catch (err) {
        console.log('Error clearing localStorage: ', err);
    }
}