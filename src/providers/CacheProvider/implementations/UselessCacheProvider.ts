/* eslint-disable no-useless-return */
import ICacheProvider from '../models/ICacheProvider';

class UselessCacheProvider implements ICacheProvider {
  constructor() {
    console.log('Cache disabled.');
  }

  public async set(...args: any[]): Promise<void> {
    return;
  }

  public async get(...args: any[]): Promise<null> {
    return null;
  }

  public async setMany(...args: any[]): Promise<void> {
    return;
  }

  public async getMany(...args: any[]): Promise<Map<string, any>> {
    return new Map();
  }
}

export default UselessCacheProvider;
