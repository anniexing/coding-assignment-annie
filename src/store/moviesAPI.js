/**
 * it is very important that  createApi, fetchBaseQuery is imported from '@reduxjs/toolkit/query/react'
 * it is default imported from '@reduxjs/toolkit/query'. this will not auto generated the hooks in the extended endpoint api
 **/
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { ENDPOINT } from '../apiUtils/constants';

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 *
 * Configuration -> https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#parameters
 */
export const moviesAPI = createApi({
  reducerPath: "moviesAPI",
  baseQuery:fetchBaseQuery({baseUrl:`${ENDPOINT}`}),
  endpoints:() => ({})
})

export default moviesAPI;
