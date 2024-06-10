export interface StorageEvent<T> {
  key: string;
  oldValue: T | null;
  newValue: T | null;
}

export type StorageListener<T = unknown> = (event: StorageEvent<T>) => void;

export abstract class StorageAdapter {
  abstract get<T = unknown>(key: string): Promise<T | null>;
  abstract getAll(): Promise<Record<string, unknown>>;
  abstract set<T = unknown>(key: string, value: T): Promise<void>;
  abstract remove(key: string): Promise<void>;
  abstract watch<T = unknown>(key: string, listener: StorageListener<T>): void;
  abstract unwatch<T = unknown>(
    key: string,
    listener: StorageListener<T>,
  ): void;
}
