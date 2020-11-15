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
}

export default UselessCacheProvider;
