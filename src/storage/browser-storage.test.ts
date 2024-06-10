import { describe, expect, it, vi } from 'vitest';

import { BrowserStorage } from './browser-storage';

describe('BrowserStorage', () => {
  it('should set and get value', async () => {
    const storage = new BrowserStorage('local');
    await storage.set('key', 'value');
    const value = await storage.get('key');
    expect(value).toBe('value');
  });

  it('should remove value', async () => {
    const storage = new BrowserStorage('local');
    await storage.set('key', 'value');
    await storage.remove('key');
    const value = await storage.get('key');
    expect(value).toBeNull();
  });

  it('should get all values', async () => {
    const storage = new BrowserStorage('local');
    await storage.set('key1', 'value1');
    const all = await storage.getAll();

    expect(all).toEqual({ key1: 'value1' });
  });

  it('should remove a value', async () => {
    const storage = new BrowserStorage('local');
    await storage.set('key', 'value');
    await storage.remove('key');
    const value = await storage.get('key');
    expect(value).toBeNull();
  });

  it('should watch for changes', async () => {
    const storage = new BrowserStorage('local');
    const listener = vi.fn();
    storage.watch('key', listener);
    await storage.set('key', 'value');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should unwatch for changes', async () => {
    const storage = new BrowserStorage('local');
    const listener = vi.fn();
    storage.watch('key', listener);
    storage.unwatch('key', listener);
    await storage.set('key', 'value');
    expect(listener).toHaveBeenCalledTimes(0);
  });
});
