import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {StockDataType} from "./stockState.ts";

const BASE_URL = 'https://api.iex.cloud/v1/data/core'
export type pageNameType = 'prev'|'current'|'next'
export type fetchMethodType = 'load' | 'page_action'
interface fetchArgsType{symbols: string[], page_name: pageNameType, fetchMethod:fetchMethodType}
export interface fetchPayloadType { data: StockDataType[] | null, page_name: pageNameType, fetchMethod:fetchMethodType }
const dataGenerator = (resData:StockDataType) => (
    {
        symbol: resData.symbol,
        companyName: resData.companyName,
        latestPrice:resData.latestPrice,
        avgTotalVolume: resData.avgTotalVolume,
        change: resData.change,
        changePercent:resData.changePercent,
        currency: resData.currency,
        iexOpen:resData.iexOpen,
        iexClose:resData.iexClose,
        iexVolume: resData.iexVolume,
        week52High:resData.week52High,
        week52Low:resData.week52Low
    }
)
async function axiosFetch(symbol:string){
    const response = await axios.get(`${BASE_URL}/quote/${symbol}`, {
        params: {
            token: "sk_ca0d70051b834bee8a783f2f118eaabb",
            format: 'json'
        }
    });
    return response.data[0]
}

export const fetchStocks = createAsyncThunk<fetchPayloadType,fetchArgsType>(
    'stocks/fetch',
    async ({symbols, page_name, fetchMethod}:fetchArgsType, {rejectWithValue}) => {

        try {
            let data: StockDataType[] = [];
            if(symbols.length>0) {
                for (const symbol of symbols) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    const resData = await axiosFetch(symbol)
                    data.push(dataGenerator(resData));
                }
                return { data, page_name, fetchMethod};
            }
            else return {data: null, page_name, fetchMethod}
        } catch (e) {
            if(axios.isAxiosError(e)) {
                return rejectWithValue(e.response?.status)
            }
            else throw e
        }
    })

