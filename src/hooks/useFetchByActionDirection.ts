import {fetchStocks, pageNameType} from "../app/actions.ts";
import {getFromCash} from "../app/stockSlice.ts";
import {useEffect} from "react";
import {get_slice_data} from "./useFetchByPageOnLoad.ts";
import {StateType} from "../app/stockState.ts";
import {AppDispatch} from "../app/store.ts";

interface FetchByDirectionType{
    state: StateType,
    dispatch: AppDispatch,
    actionDirection: pageNameType
}
export const UseFetchByActionDirection = ({state, dispatch, actionDirection}:FetchByDirectionType) => {
    const fetchDataByDirection = (direction: pageNameType, stepCount:number) => {
        let page = state.current_page+stepCount
        if (page.toString() in Object.keys(state.cash)) {
            dispatch(getFromCash({page_name:direction, page_number:page}))
        }else {
            dispatch(fetchStocks({symbols: get_slice_data(state.symbols, page), page_name: direction, fetchMethod:'page_action'}))
        }
    }
    useEffect(() => {
        switch (actionDirection){
            case 'next':
                fetchDataByDirection(actionDirection, 1);
                break;
            case 'prev':
                fetchDataByDirection(actionDirection, -1)
                break;
            default: break;
        }
    }, [state.current_page]);
}


export default UseFetchByActionDirection;