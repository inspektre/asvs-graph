import { request } from 'graphql-request'

const fetcher = query => request('https://sydney.inspektre.com', query);

export default fetcher