export function saveToLocalStorage(key, data) {
    try {
        const serializedValue = JSON.stringify(data);
        localStorage.setItem(key, serializedValue);
    } catch (err) {
        console.log('Error saving data to localStorage: ', err);
    }
}

export function getFromLocalStorage(key) {
    try {
        console.log('Getting from localStorage: ', key)
        const serializedData = localStorage.getItem(key);
        return serializedData ? JSON.parse(serializedData) : null;
    } catch (err) {
        console.log('Error getting data from localStorage: ', err);
        return null;
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