import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const purchaseApi=createApi({
    reducerPath:"purchaseApi",
    baseQuery:fetchBaseQuery({
    baseUrl:BASE_URL,
    credentials:"include"
    }),
    endpoints:(builders)=>({
        createOrderId:builders.mutation({
            query:()=>({
                url:"",
                method:"POST",
                
            })
        })
    })
})