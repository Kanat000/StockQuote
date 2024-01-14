import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {StockDataType} from "./stockState.ts";

const BASE_URL = 'https://api.iex.cloud/v1/data/core'
export type pageNameType = 'prev'|'current'|'next'
interface fetchArgsType{symbols: string[], page_name: pageNameType}

export const fetchStocks = createAsyncThunk(
    'stocks/fetch',
    async ({symbols, page_name}:fetchArgsType) => {
        try {
            let data: StockDataType[] = [];
            if(symbols.length>0) {
                for (const symbol of symbols) {
                    const response = await axios.get(`${BASE_URL}/quote/${symbol}`, {
                        params: {
                            token: 'token',
                            format: 'json'
                        }
                    });
                    const resData = response.data[0]

                    data.push({
                        avgTotalVolume: resData.avgTotalVolume,
                        change: resData.change,
                        close: resData.close,
                        companyName: resData.companyName,
                        currency: resData.currency,
                        delayedPrice: resData.delayedPrice,
                        extendedChange: resData.extendedChange,
                        extendedPrice: resData.extendedPrice,
                        high: resData.high,
                        latestPrice: resData.latestPrice,
                        low: resData.low,
                        symbol: resData.symbol
                    });

                    // Introduce a delay of 200 milliseconds before the next request
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
                return { data, page_name };
            }
            else return {data: null, page_name}
        } catch (e) {
            throw e
        }
    })

