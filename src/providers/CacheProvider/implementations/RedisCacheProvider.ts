import Redis, { Redis as RedisInstance } from 'ioredis';

import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private cache: RedisInstance;

  constructor() {
    this.cache = new Redis();
  }

  public async set(
    data: any,
    key: string,
    { ttlInSeconds } = { ttlInSeconds: 5 },
  ): Promise<void> {
    const stringifiedData = JSON.stringify(data);

    await this.cache.set(key, stringifiedData, 'SETEX', ttlInSeconds);
  }

  public async get<T = any>(key: string): Promise<T | null> {
    const cachedValue = await this.cache.get(key);

    if (!cachedValue) {
      return null;
    }

    const parsedValue = JSON.parse(cachedValue) as T;

    return parsedValue;
  }

  public async setMany(
    data: Map<string, any>,
    { ttlInSeconds } = { ttlInSeconds: 5 },
  ): Promise<void> {
    const dataEntries = Array.from(data.entries());

    await Promise.allSettled(
      dataEntries.map(async ([key, value]) => {
        const stringifiedValue = JSON.stringify(value);

        await this.cache.set(key, stringifiedValue, 'SETEX', ttlInSeconds);
      }),
    );
  }

  public async getMany<T = any>(
    keys: string[],
  ): Promise<Map<string, T | null>> {
    const storedData = await this.cache.mget(keys);

    const results = new Map<string, T | null>();

    keys.forEach((key, index) => {
      let parsedValue = null;

      const storedValue = storedData[index];

      if (storedValue) {
        parsedValue = JSON.parse(storedValue) as T;
      }

      results.set(key, parsedValue);
    });

    return results;
  }
}

export default RedisCacheProvider;
