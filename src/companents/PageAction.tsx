import React from 'react';
import spStyle from "./scss/stockPage.module.scss";
import {changeToNextPage, changeToPrevPage, getFromCash} from "../app/stockSlice.ts";
import {MdArrowCircleLeft, MdArrowCircleRight} from "react-icons/md";
import {StateType} from "../app/stockState.ts";
import {AppDispatch} from "../app/store.ts";
import {fetchStocks} from "../app/actions.ts";
import {get_slice_data} from "../hooks/useFetchByPage.ts";

interface pageActionType{
    state: StateType,
    dispatch: AppDispatch
}
const PageAction: React.FC<pageActionType> = ({state, dispatch}) => {
    console.log(state.current_page)
    const goToNextPage = () => {
        dispatch(changeToNextPage())
        let page = state.current_page+1
        if (page.toString() in Object.keys(state.cash)) {
            dispatch(getFromCash({page_name:'next', page_number:page}))
        }else dispatch(fetchStocks({symbols: get_slice_data(state.symbols, page), page_name: "next"}))
    }
    const goToPrevPage = () => {
        dispatch(changeToPrevPage())
        let page = state.current_page-1
        if (page.toString() in Object.keys(state.cash)) {
            dispatch(getFromCash({page_name:'prev', page_number:page}))
        }else dispatch(fetchStocks({symbols: get_slice_data(state.symbols, page), page_name: "prev"}))
    }
    return (
        <div className={spStyle.counterBlock}>
            <div className={spStyle.counter_action}>
                <button
                    disabled={state.current_page===0 || state.disabled}
                    onClick={()=>goToPrevPage()}
                >
                    <MdArrowCircleLeft />
                </button>
            </div>
            <div className={spStyle.counter}>
                <div>1</div>
                <div>2</div>
                <div className={spStyle.counter_active}>3</div>
                <div>4</div>
                <div>5</div>
            </div>
            <div className={spStyle.counter_action}>
                <button
                    disabled={state.current_page===10 || state.disabled}
                    onClick={()=>goToNextPage()}>
                    <MdArrowCircleRight />
                </button>
            </div>

        </div>
    );
}

export default PageAction;