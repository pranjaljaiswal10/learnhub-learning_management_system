import { BASE_URL } from "@/utils/constant";
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseAPi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/courses",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getSearchCourse: builder.query({
      query: () => {},
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `courses/${courseId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    getCourseById: builder.query({
      query: ({ courseId }) => ({
        url: courseId,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `courses/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `${courseId}/lecture`,
        methiod: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({ lectureTitle, isPreviewFree, courseId, lectureId }) => ({
        url: `${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, isPreviewFree },
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetSearchCourseQuery,
  useGetCreatorCourseQuery,
  useEditLectureMutation,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
} = courseApi;
