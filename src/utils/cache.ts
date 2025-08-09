enum cacheType {
  local,
  session,
}

class Cache {
  storage: Storage;

  constructor(type: cacheType) {
    this.storage = type === cacheType.local ? localStorage : sessionStorage;
  }

  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

const localCache = new Cache(cacheType.local);
const sessionCache = new Cache(cacheType.session);

export { localCache, sessionCache };
