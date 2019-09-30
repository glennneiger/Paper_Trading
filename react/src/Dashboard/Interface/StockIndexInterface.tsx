import StockQuote from './StockQuoteInterface';

interface StockIndex {
    stockQuote: StockQuote[]; 
    time: string[];
    stockChart: number[][]; 
    listOfSymbol: string[]; 
}

export default StockIndex; 