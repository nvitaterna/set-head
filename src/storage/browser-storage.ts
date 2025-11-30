import { storage, StorageArea, WatchCallback } from 'wxt/utils/storage';

export class BrowserStorage {
  listeners: Record<
    string,
    {
      listener: WatchCallback<unknown>;
      unwatch: () => void;
    }[]
  > = {};

  private storageArea: StorageArea;

  constructor(area: StorageArea) {
    this.storageArea = area;
  }

  private getKey(key: string): `${StorageArea}:${string}` {
    return `${this.storageArea}:${key}`;
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    const value = await storage.getItem<string>(this.getKey(key));

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T | null;
  }

  async getAll(): Promise<Record<string, unknown>> {
    const values = await storage.snapshot(this.storageArea);

    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(values)) {
      const shortKey = key.replace(`${this.storageArea}:`, '');
      if (!value) {
        result[shortKey] = null;
      } else {
        // TODO: fix typing
        result[shortKey] = JSON.parse(value as string);
      }
    }

    return result;
  }

  set<T = unknown>(key: string, value: T): Promise<void> {
    const stringifiedValue = JSON.stringify(value);
    return storage.setItem(this.getKey(key), stringifiedValue);
  }

  remove(key: string): Promise<void> {
    return storage.removeItem(this.getKey(key));
  }

  watch<T = unknown>(key: string, listener: WatchCallback<T | null>) {
    const unwatch = storage.watch<string>(
      this.getKey(key),
      (newValue, oldValue) => {
        const parsedNewValue: T | null =
          newValue === null ? null : JSON.parse(newValue);
        const parsedOldValue: T | null =
          oldValue === null ? null : JSON.parse(oldValue);
        listener(parsedNewValue, parsedOldValue);
      },
    );
    this.listeners[key] = this.listeners[key] || [];
    this.listeners[key].push({
      listener: listener as WatchCallback<unknown>,
      unwatch,
    });
  }

  unwatch<T = unknown>(key: string, listener: WatchCallback<T>): void {
    const listeners = this.listeners[key];

    if (!listeners) {
      return;
    }

    const foundListener = listeners.find((l) => l.listener === listener);

    if (foundListener) {
      foundListener.unwatch();
      this.listeners[key] = listeners.filter((l) => l.listener !== listener);
    }
  }
}
