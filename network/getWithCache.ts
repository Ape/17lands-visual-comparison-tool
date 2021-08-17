import NodeCache from 'node-cache';
import { api } from './index';

const ONE_DAY = 60 * 60 * 24;
const cache = new NodeCache({ stdTTL: ONE_DAY, useClones: false }); // Note: This cache is created for each api route that imports it

interface GetCacheFunction {
  (url: string, params?: any): any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const getWithCache: GetCacheFunction = async (url, params) => {
  const key = JSON.stringify({ url, params });
  const cached = cache.get(key);
  if (cached) {
    console.log(`Cache hit: ${key}`);
    return cached;
  }
  console.log(`Cache miss: ${key}`);
  const result = await api(url, { params });

  cache.set(key, result.data, ONE_DAY);
  return result?.data;
};

export default getWithCache;
