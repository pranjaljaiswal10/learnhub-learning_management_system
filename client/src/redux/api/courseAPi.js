import { BASE_URL } from "@/utils/constant";
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const courseApi = createApi({
  reducerPath: "courseAPi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
  baseQuery:fetchBaseQuery({
    baseUrl:BASE_URL,
    credentials:"include"
  }),
  endpoints:(builders)=>({
    createCourse:builders.mutation({
        query:({courseTitle,category})=>({
            url:"/courses",
            method:"POST",
            
        })
    })
  })
});