import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState, StockDataType} from "./stockState.ts";
import {fetchStocks, pageNameType} from "./actions.ts";


const stockSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        changeToNextPage: (state) => {
            let page = state.current_page-1
            if(!state.cash.hasOwnProperty((page).toString()) || state.current_page!==0)
                if (state.data.prev && state.data.prev.length>0)
                    state.cash[(page).toString()] = state.data.prev

            state.current_page = state.current_page+1
            if(state.data.next && state.data.current) {
                state.data.prev = state.data.current.slice(0)
                state.data.current = state.data.next.slice(0)
            }
            state.data.next = []
        },
        changeToPrevPage: (state) => {
            let page = state.current_page+1
            if(!state.cash.hasOwnProperty((page).toString()) || state.current_page!=10)
                if (state.data.next && state.data.next.length>0)
                    state.cash[(state.current_page-1).toString()] = state.data.next

            state.current_page = state.current_page-1
            if(state.data.prev && state.data.current) {
                state.data.next = state.data.current.slice(0)
                state.data.current = state.data.prev.slice(0)
            }
            state.data.prev = []
        },
        getFromCash:(state, {payload}:PayloadAction<{page_name:pageNameType, page_number:number}>)=>{
            let cashed_data =  state.cash[(payload.page_number).toString()]
            if(cashed_data)
                state.data[payload.page_name] = cashed_data.slice(0)
        },
        setLoading: (state, {payload}:PayloadAction<boolean>) => {
            state.loading = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocks.pending, (state)=>{
                state.disabled = true;
                if (state.data.current == null || state.data.current.length<10) state.loading = true;
            })
            .addCase(fetchStocks.fulfilled, (state, {payload}: PayloadAction<{ data: StockDataType[] | null, page_name: pageNameType }>) => {
                switch (payload.page_name){
                    case 'prev': state.data.prev = payload.data;break;
                    case 'current': state.data.current = payload.data;break;
                    case 'next': state.data.next = payload.data;break;
                }
                state.loading = false;
                state.disabled = false;
            })
            .addCase(fetchStocks.rejected, (state, action) => {
                state.loading = false
                console.log(action.error)
            })
    }
})


export const {
    changeToNextPage,
    changeToPrevPage,
    setLoading,
    getFromCash
} = stockSlice.actions
export default stockSlice.reducer;



