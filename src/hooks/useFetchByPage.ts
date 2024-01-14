import {useEffect} from "react";
import {fetchStocks, pageNameType} from "../app/actions.ts";
import {AppDispatch} from "../app/store.ts";
import {StateType} from "../app/stockState.ts";

export const get_slice_data = (symbols:string[], page: number) => {
    let start = page * 10;
    let end = start + 10;
    return symbols.slice(start, end)
}
export const useFetchByPageOnLoad = (stocks: StateType, dispatch: AppDispatch) => {
    const current_page = stocks.current_page
    const symbols = stocks.symbols
    const requestList:{symbols:string[], page_name: pageNameType}[] = [
        {
            symbols: get_slice_data(symbols, current_page),
            page_name: 'current'
        },
        {
            symbols: get_slice_data(symbols,current_page - 1),
            page_name: 'prev'
        },
        {
            symbols: get_slice_data(symbols,current_page + 1),
            page_name: 'next'
        }
    ]
    useEffect(() => {
        (requestList.forEach(r=> {
           dispatch(fetchStocks(r))
       }))

    }, [dispatch]);

}

