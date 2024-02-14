import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice"
import signUpPageStateReducer from "./Slices/SignUpPageStateSlice"
import signUpDataStateReducer from "./Slices/SignUpDataStateSlice"
import createEventPageStateReducer from "./Slices/CreateEventPageStateSlice";
import createEventDataStateReducer from "./Slices/CreateEventDataStateSlice";
import eventDataReducer from "./Slices/EventDataSlice"

export const store=configureStore({
    reducer:{
        authReducer,
        signUpPageStateReducer,
        signUpDataStateReducer,
        createEventPageStateReducer,
        createEventDataStateReducer,
        eventDataReducer,
   },
   middleware: (getDefaultMiddleware)=>
   getDefaultMiddleware({
    serializableCheck: false
  }),
})