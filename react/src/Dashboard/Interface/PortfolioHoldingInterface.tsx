interface PortfolioHolding {
    symbol: string;
    lastPrice: number;
    change: number;
    changePercentage: number;
    quantity: number;
    pricePaid: number;
    dayGain: number;
    totalGain: number;
    totalGainPercentage: number;
    value: number;
}

export default PortfolioHolding; 