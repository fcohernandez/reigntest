import api from '../config';

import { ApiResponse } from 'apisauce';

interface Request {
  page: number;
  search: string;
}

interface PaginatedResponse<T> {
  nbHits: number;
  page: number;
  hitsPerPage: number;
  nbPages: number;
  hits: T[];
}

export interface New {
  story_title: string;
  story_url: string;
  created_at: string;
  author: string;
  fav?: boolean;
}

export interface ApiErrorI {
  code: number | string;
  message: string;
  internalCode: string;
  param?: string;
  description?: string;
}

export type NewsResponse = PaginatedResponse<New>;

export const getNews = ({
  page = 0,
  search
}: Request) =>
  api
    .get<NewsResponse, ApiErrorI>('api/v1/search_by_date', {
    query: search,
    page,
  }).then(apiResponseHandler);


export const apiResponseHandler = <T, U>(response: ApiResponse<T, U>) => {
  if (!response.ok) {
    throw response;
  }

  if(response.data)
    return response.data;
};

