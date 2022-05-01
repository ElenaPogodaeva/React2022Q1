import { response } from 'msw';
import { API_KEY } from '../common/constants';
import { SearchImagesParams, SearchInfoParams, SearchParams } from '../types/types';

export async function flickr(method: string, params: SearchImagesParams | SearchInfoParams) {
  try {
    const url = new URL('https://www.flickr.com/services/rest');
    const flickrParams: SearchParams = {
      method: `flickr.${method}`,
      api_key: API_KEY,
      format: 'json',
      nojsoncallback: '1',
      ...params,
    };
    url.search = new URLSearchParams(flickrParams).toString();
    const response = await fetch(url.href);
    if (!response.ok) {
      throw Error('could not fetch the data');
    }
    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    throw error;
  }
}
