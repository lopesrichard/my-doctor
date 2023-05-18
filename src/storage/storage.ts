export abstract class Storage<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  read(): T {
    const item = localStorage.getItem(this.key);
    return item ? JSON.parse(item) : null;
  }

  store(data: T) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
