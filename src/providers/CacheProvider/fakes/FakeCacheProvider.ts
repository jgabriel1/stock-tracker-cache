import ICacheProviderOptions from '../models/ICacheProviderOptions';

class FakeCacheProvider {
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
}

export default FakeCacheProvider;
