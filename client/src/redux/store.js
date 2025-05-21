import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authapi } from "./api/authapi";
import { courseApi } from "./api/courseAPi";
import { purchaseApi } from "./api/purchaseApi";
import { progressApi } from "./api/progressApi";

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authapi.middleware,
      courseApi.middleware,
      purchaseApi.middleware,
      progressApi.middleware
    ),
});

export default appStore;
