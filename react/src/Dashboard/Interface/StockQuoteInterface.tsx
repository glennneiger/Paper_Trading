interface StockQuote {
    symbol: string;
    compnayName: string; 
    primaryExchange: string;
    latestPrice: number; 
    previousClose: number; 
    change: number; 
    changePercent: number; 
    week52Low: number; 
    week52High: number; 
    isUSMarketOpen: boolean;
}

export default StockQuote; 