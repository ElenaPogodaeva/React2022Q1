import { API_KEY } from '../common/constants';
import { SearchImagesParams, SearchInfoParams, SearchParams } from '../types/types';

export async function flickr(method: string, params: SearchImagesParams | SearchInfoParams) {
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
  const fetchedData = await response.json();
  return fetchedData;
}
