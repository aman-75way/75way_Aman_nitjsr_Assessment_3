import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// app.post('/api/group/sendMessage' , SendGroupMessage);


// app.get('/api/group/groupName' , GroupList);

interface SendMessageRequest {
    chatName: string;
    message: {
      sender: string;
      content: string;
    }[];
}

  
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/group' }),
    endpoints: (builder) => ({

         send_Message: builder.mutation<any, SendMessageRequest>({
            query: (userData) => ({
              url: '/sendMessage',
              method: 'POST',
              body: userData,
            }),
          }),

          
          FindGroupMessage: builder.mutation<any , {chat : string}>({
            query: (userData) => ({
              url : '/fetchChatMessage',
              method : 'POST',
              body : userData,
            })
          })
          

    //   loginUser: builder.mutation<any, { name: string; mobile: string , password : string }>
    //   ({
    //     query: (userData) => ({
    //       url: '/login',
    //       method: 'POST',
    //       body: userData,
    //     }),
    //   }),


    }),
  });



  export const { useSend_MessageMutation , useFindGroupMessageMutation } = authApi;