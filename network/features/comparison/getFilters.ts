import getWithCache from '../../getWithCache';

export interface GetFiltersFunction {
  (params: void): any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const getFilters: GetFiltersFunction = async () => {
  try {
    const response = await getWithCache('https://www.17lands.com/data/filters');

    return response;
  } catch (error) {
    return null;
  }
};
