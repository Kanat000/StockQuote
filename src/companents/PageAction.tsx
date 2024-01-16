import React, {useState} from 'react';
import spStyle from "./scss/stockPage.module.scss";
import {changeToNextPage, changeToPrevPage} from "../app/stockSlice.ts";
import {MdArrowCircleLeft, MdArrowCircleRight} from "react-icons/md";
import {StateType} from "../app/stockState.ts";
import {AppDispatch} from "../app/store.ts";
import {pageNameType} from "../app/actions.ts";
import useFetchByActionDirection from "../hooks/useFetchByActionDirection.ts";

interface pageActionType{
    state: StateType,
    dispatch: AppDispatch
}
const PageAction: React.FC<pageActionType> = ({state, dispatch}) => {
    const [actionDirection, setActionDirection] = useState<pageNameType>('current')
    const displayingPageNumber = state.current_page+1
    useFetchByActionDirection({state, dispatch, actionDirection})

    const goToNextPage = () => {
        dispatch(changeToNextPage())
        setActionDirection('next')
    }
    const goToPrevPage = () => {
        dispatch(changeToPrevPage())
        setActionDirection('prev')
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
                <div>{displayingPageNumber-2>0 ? displayingPageNumber-2 : ''}</div>
                <div>{displayingPageNumber-1>0 ? displayingPageNumber-1 : ''}</div>
                <div className={spStyle.counter_active}>{displayingPageNumber}</div>
                <div>{displayingPageNumber+1<11 ? displayingPageNumber+1 : ''}</div>
                <div>{displayingPageNumber+2<11 ? displayingPageNumber+2 : ''}</div>
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