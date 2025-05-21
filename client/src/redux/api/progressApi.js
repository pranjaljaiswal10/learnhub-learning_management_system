import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const progressApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: courseId,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `${courseId}/lecture/${lectureId}`,
        method: "POST",
      }),
    }),
    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `${courseId}/complete`,
        method: "POST",
      }),
    }),
    inCompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useCompleteCourseMutation,
  useInCompleteCourseMutation,
} = progressApi;
