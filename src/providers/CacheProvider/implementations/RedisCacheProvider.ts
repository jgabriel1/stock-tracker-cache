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
}

export default RedisCacheProvider;
