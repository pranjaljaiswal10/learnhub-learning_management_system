import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    allCourse: null,
    singleCourse: null,
  },
  reducers: {
    addAllCourse: (state, action) => {
      state.allCourse = action.payload;
    },
    addSingleCourse: (state, action) => {
      state.singleCourse = action.payload;
    },
  },
});

export const { addAllCourse, addSingleCourse } = courseSlice.actions;
export default courseSlice.reducer;
