import React from 'react';
import siStyle from './scss/stockItem.module.scss';
import {StockDataType} from "../app/stockState.ts";

interface StockItemType{
    items: StockDataType
}
const StockItem: React.FC<StockItemType> = ({items}) => {
    return (
        <tr className={siStyle.item}>
            {Object.values(items).map(i=>{
                return <td>{i}</td>
            })}
        </tr>
    );
}

export default StockItem;