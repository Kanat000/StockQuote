import React from 'react';
import siStyle from "./scss/stockTable.module.scss";

interface StockHeaderType{
    headers: string[]
}
const StockTableHeader: React.FC<StockHeaderType> = ({headers}) => {
    return (
        <tr className={siStyle.headRow}>
            {headers.map(h=>{
                return <th>{h.split(/(?=[A-Z])/).join(' ').toLowerCase()}</th>
            })}
        </tr>
    );
}

export default StockTableHeader;