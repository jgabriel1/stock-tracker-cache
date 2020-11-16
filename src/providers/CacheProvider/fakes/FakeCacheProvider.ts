import ICacheProvider from '../models/ICacheProvider';
import ICacheProviderOptions from '../models/ICacheProviderOptions';

class FakeCacheProvider implements ICacheProvider {
  private cache: Map<string, string>;

  constructor() {
    this.cache = new Map();
  }

  public async set(
    key: string,
    data: any,
    { ttlInSeconds }: ICacheProviderOptions,
  ): Promise<void> {
    const stringifiedData = JSON.stringify(data);

    this.cache.set(key, stringifiedData);

    setTimeout(() => {
      this.cache.delete(key);
    }, ttlInSeconds * 1000 || 5000);
  }

  public async get(key: string): Promise<any | null> {
    const data = this.cache.get(key);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  public async setMany(
    data: Map<string, any>,
    { ttlInSeconds }: ICacheProviderOptions,
  ): Promise<void> {
    data.forEach((value, key) => {
      this.set(key, value, { ttlInSeconds });
    });
  }

  public async getMany(keys: string[]): Promise<Map<string, any | null>> {
    const storedValues = new Map<string, any | null>();

    await Promise.all(
      keys.map(async key => {
        const storedValue = await this.get(key);

        storedValues.set(key, storedValue);
      }),
    );

    return storedValues;
  }
}

export default FakeCacheProvider;
