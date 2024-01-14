import {configureStore} from "@reduxjs/toolkit";
import stockSlice from "./stockSlice.ts";


const store = configureStore({
    reducer:{
        stockSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;