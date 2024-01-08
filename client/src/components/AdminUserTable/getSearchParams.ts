import {EParams} from './types';

export const getSearchParams = (
  searchParams: URLSearchParams,
): {
  page: null | number;
  limit: null | number;
} => {
  let page: string | null | number = searchParams.get(EParams.PAGE);

  if (page && /[1-9][0-9]*/.test(page)) {
    page = parseInt(page);
  } else {
    page = null;
  }

  let limit: string | null | number = searchParams.get(EParams.LIMIT);

  if (limit && /[1-9][0-9]*/.test(limit)) {
    limit = parseInt(limit);
  } else {
    limit = null;
  }

  return {page, limit};
};
