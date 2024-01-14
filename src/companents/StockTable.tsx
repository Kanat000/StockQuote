import React from 'react';
import stStyle from './scss/stockTable.module.scss'
import StockTableHeader from "./StockTableHeader.tsx";
import StockItem from "./StockItem.tsx";
import {StockDataType} from "../app/stockState.ts";

interface StockTableType{
    stocks: StockDataType[]
}
const StockTable: React.FC<StockTableType> = ({stocks}) => {
    return (
        <div className={stStyle.container}>
            <table>
                <thead className={stStyle.tableHead}>
                    <StockTableHeader headers={Object.keys(stocks[0])}/>
                </thead>
                <tbody className={stStyle.tableBody}>
                    {stocks.map(v=>{
                        return <StockItem items={v}/>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default StockTable;