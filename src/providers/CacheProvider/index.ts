import RedisCacheProvider from './implementations/RedisCacheProvider';
import UselessCacheProvider from './implementations/UselessCacheProvider';
import config from '../../config';

export default config.cache.USE_CACHE
  ? RedisCacheProvider
  : UselessCacheProvider;
