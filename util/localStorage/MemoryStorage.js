class MemoryStorage {
  getItem(key) {
    return this[key] || null;
  }

  setItem(key, value) {
    this[key] = value;
  }

  removeItem(key) {
    delete this[key];
  }
}

export default MemoryStorage;
