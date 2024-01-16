import React from 'react';
import {StateType} from "../app/stockState.ts";
import Loading from "./Loading.tsx";
import StockTable from "./StockTable.tsx";
import spStyle from "./scss/stockPage.module.scss";

interface tableListType {
    state: StateType
}

const StockTableList: React.FC<tableListType> = ({state}) => {

    const tableList = [
        {
            data: state.data.prev,
            className: spStyle.prev_card
        },
        {
            data: state.data.current,
            className: spStyle.active_card
        },
        {
            data: state.data.next,
            className: spStyle.next_card
        },
    ]
    if (state.loading) return <Loading/>
    else return (
        <>
            {
                tableList.map((t) => {

                    return t.data ? (
                        t.data.length > 0 ? <div className={t.className}><StockTable stocks={t.data}/></div>
                            : <div className={t.className}
                                   style={{
                                       backgroundColor: " rgba(255, 255, 255, 0.2)",
                                       backdropFilter: "blur(5px)"
                                   }}>
                            </div>
                    ) : <></>
                })
            }
        </>
    );
}

export default StockTableList;