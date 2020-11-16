import ICacheProviderOptions from './ICacheProviderOptions';

export default interface ICacheProvider {
  set(key: string, data: any, options?: ICacheProviderOptions): Promise<void>;
  setMany(
    data: Map<string, any>,
    options?: ICacheProviderOptions,
  ): Promise<void>;
  get<T = any>(key: string): Promise<T | null>;
  getMany<T = any>(keys: string[]): Promise<Map<string, T | null>>;
}
