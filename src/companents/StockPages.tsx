import React from 'react';
import spStyle from './scss/stockPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useFetchByPageOnLoad} from "../hooks/useFetchByPageOnLoad.ts";
import StockTableList from "./StockTableList.tsx";
import PageAction from "./PageAction.tsx";
import ReloadWaitingPage from "./ReloadWaitingPage.tsx";

const StockPages: React.FC = () => {
    const state = useSelector((state:RootState) => state.stockSlice)
    const dispatch = useDispatch<AppDispatch>()
    useFetchByPageOnLoad(state, dispatch)
    if(state.willReload) return <ReloadWaitingPage />
    else return (
        <div className={spStyle.container}>
            <div className={spStyle.title}>World Stock List</div>
            <div className={spStyle.carousel}>
               <StockTableList state={state}/>
            </div>
            <div className={spStyle.counterContainer}>
                <PageAction state={state} dispatch={dispatch}/>
            </div>
        </div>
    );
}

export default StockPages;