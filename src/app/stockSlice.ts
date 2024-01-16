import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./stockState.ts";
import {fetchPayloadType, fetchStocks, pageNameType} from "./actions.ts";


const stockSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        changeToNextPage: (state) => {
            let page = state.current_page-1
            if(!state.cash.hasOwnProperty((page).toString()) && page!==-1)
                if (state.data.prev && state.data.prev.length>0)
                    state.cash[(page).toString()] = state.data.prev
            console.log(state.current_page)
            state.current_page = state.current_page+1
            if(state.data.next && state.data.current) {
                state.data.prev = state.data.current.slice(0)
                state.data.current = state.data.next.slice(0)
            }
            state.data.next = []
        },
        changeToPrevPage: (state) => {
            let page = state.current_page+1
            if(!state.cash.hasOwnProperty((page).toString()) && page!=11)
                if (state.data.next && state.data.next.length>0)
                    state.cash[(page).toString()] = state.data.next

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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocks.pending, (state, {meta})=>{
                state.disabled = true;
                if (meta.arg.fetchMethod==='load') state.loading = true;
            })
            .addCase(fetchStocks.fulfilled, (state, {payload}: PayloadAction<fetchPayloadType>) => {
                switch (payload.page_name){
                    case 'prev': state.data.prev = payload.data;break;
                    case 'current': state.data.current = payload.data;break;
                    case 'next': state.data.next = payload.data;break;
                }
                if (payload.fetchMethod==='load') state.loading = false;
                state.disabled = false;
            })
            .addCase(fetchStocks.rejected, (state, action) => {
                state.loading = false
                console.log(action.error)
                if(action.payload === 429){
                    setTimeout(()=>window.location.reload(), 2000)
                    state.willReload = true
                }
            })

    }
})


export const {
    changeToNextPage,
    changeToPrevPage,
    getFromCash
} = stockSlice.actions
export default stockSlice.reducer;



