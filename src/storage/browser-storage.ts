import { browser, Storage } from 'wxt/browser';

import { StorageAdapter, StorageListener } from './storage-adapter';

export class BrowserStorage extends StorageAdapter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listeners: Record<string, StorageListener<any>[]> = {};

  private storage: Storage.StorageArea;

  constructor(area: keyof Omit<Storage.Static, 'onChanged'>) {
    super();
    this.storage = browser.storage[area];
    this.storage.onChanged.addListener((changes) => {
      for (const key in changes) {
        const listeners = this.listeners[key];
        if (listeners) {
          const { oldValue, newValue } = changes[key];
          listeners.forEach((listener) => {
            listener({
              key,
              oldValue: oldValue ? JSON.parse(oldValue) : null,
              newValue: newValue ? JSON.parse(newValue) : null,
            });
          });
        }
      }
    });
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    return this.storage.get(key).then((data) => {
      return data[key] ? JSON.parse(data[key]) : null;
    });
  }

  async getAll(): Promise<Record<string, unknown>> {
    const data = await this.storage.get(null);
    const result: Record<string, unknown> = {};
    for (const key in data) {
      try {
        result[key] = data[key] ? JSON.parse(data[key]) : null;
      } catch (error) {
        console.error(
          `Error parsing storage data: ${key} - ${data[key]}`,
          error,
        );
        result[key] = data[key];
      }
    }
    return result;
  }

  set<T = unknown>(key: string, value: T): Promise<void> {
    return this.storage.set({ [key]: JSON.stringify(value) });
  }

  remove(key: string): Promise<void> {
    return this.storage.remove(key);
  }

  watch<T = unknown>(key: string, listener: StorageListener<T>): void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(listener);
  }

  unwatch<T = unknown>(key: string, listener: StorageListener<T>): void {
    this.listeners[key] = this.listeners[key].filter((l) => l !== listener);
  }
}
