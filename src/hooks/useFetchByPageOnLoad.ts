import {useEffect} from "react";
import {fetchMethodType, fetchStocks, pageNameType} from "../app/actions.ts";
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
    const requestList:{symbols:string[], page_name: pageNameType, fetchMethod:fetchMethodType}[] = [
        {
            symbols: get_slice_data(symbols, current_page),
            page_name: 'current',
            fetchMethod: 'load'
        },
        {
            symbols: get_slice_data(symbols,current_page - 1),
            page_name: 'prev',
            fetchMethod: 'load'
        },
        {
            symbols: get_slice_data(symbols,current_page + 1),
            page_name: 'next',
            fetchMethod: 'load'
        }
    ]
    useEffect(() => {
        let r_length = requestList.length;
        const fetchInterval = setInterval(()=> {
                dispatch(fetchStocks(requestList[r_length - 1]))
                r_length = r_length-1;
                if(r_length===0) clearInterval(fetchInterval)
            }, 200)
    }, []);

}

