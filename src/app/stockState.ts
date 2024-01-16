export interface StockDataType {
    symbol: string;
    companyName: string;
    latestPrice: number;
    avgTotalVolume: number;
    change: number;
    changePercent: number;
    currency: string;
    iexOpen: number;
    iexClose: number;
    iexVolume: number;
    week52High: number;
    week52Low: number;
}

export interface StateType {
    data: { prev: StockDataType[] | null, current:StockDataType[] | null, next:StockDataType[] | null },
    cash: { [key:string] : StockDataType[] | null },
    symbols: string[],
    current_page: number,
    loading: boolean,
    disabled: boolean,
    willReload: boolean
}

export const initialState: StateType = {
    data: {
        prev: null,
        current:null,
        next: null
    },
    cash: {},
    symbols: [
        'AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA',
        'META', 'NVDA', 'NFLX', 'INTC', 'IBM',
        'JPM', 'GS', 'C', 'BA', 'CAT',
        'GE', 'XOM', 'CVX', 'WMT', 'TGT',
        'AMT', 'SBUX', 'KO', 'PEP', 'PG',
        'MMM', 'UNH', 'VZ', 'DIS', 'CMCSA',
        'V', 'MA', 'JNJ', 'MRK', 'PFE',
        'AAP', 'CSCO', 'ORCL', 'MU', 'PYPL',
        'ADBE', 'CRM', 'T', 'HD', 'LOW',
        'AMGN', 'BIIB', 'GILD', 'ABBV', 'CELG',
        'VRTX', 'WBA', 'CVS', 'CI', 'HUM',
        'FDX', 'UPS', 'DAL', 'AAL', 'UAL',
        'AZO', 'COST', 'MCD', 'SNAP', 'CMG',
        'AMAT', 'FDS', 'GM', 'F', 'BA',
        'UBER', 'LYFT', 'TWTR', 'PINS', 'ZM',
        'ROKU', 'SQ', 'ATVI', 'EA', 'TTWO',
        'LULU', 'NKE', 'UA', 'Z', 'ROST',
        'GPS', 'LB', 'TJX', 'ROKU', 'SWKS',
        'AMD', 'QCOM', 'TXN', 'LRCX', 'ASML'
    ],
    current_page: 0,
    loading: false,
    disabled: false,
    willReload: false
}
