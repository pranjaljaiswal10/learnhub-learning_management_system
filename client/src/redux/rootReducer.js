import { combineReducers } from "@reduxjs/toolkit";
import { authapi } from "./api/authapi";
import { courseApi } from "./api/courseAPi";
import { purchaseApi } from "./api/purchaseApi";
import authReducer from "./authSlice"

const rootReducer=combineReducers({
    [authapi.reducerPath]:authapi.reducer,
    [courseApi.reducerPath]:authapi.reducer,
    [purchaseApi.reducerPath]:courseApi.reducer,
    auth:authReducer
})

export default rootReducer;