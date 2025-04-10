import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const appStore=configureStore({
   reducer:rootReducer,
   middleware:(defaultMiddleware)=>defaultMiddleware().concat()
})

export default appStore;