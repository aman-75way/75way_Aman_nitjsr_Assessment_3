import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    endpoints: (builder) => ({

      registerUser: builder.mutation<any, { name : string ,mobile : string ,gender : string ,password : string ,confirmPassword : string  }>
      ({
        query: (userData) => ({
          url: '/register',
          method: 'POST',
          body: userData,
        }),
      }),

      loginUser: builder.mutation<any, { name: string; mobile: string , password : string }>
      ({
        query: (userData) => ({
          url: '/login',
          method: 'POST',
          body: userData,
        }),
      }),


    }),
  });



  export const { useRegisterUserMutation, useLoginUserMutation } = authApi;