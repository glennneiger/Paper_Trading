interface OrderElement {
    id: number;
    userId: number;
    stockSymbol: string;
    actionType: string;
    priceType: string;
    statusType: string;
    quantity: number;
    limitPrice: number;
    stopPrice: number; 
    pricePaid: number;
    commission: number;
    total: number;
    orderDate: string;
    tradeDate: string;
}

export default OrderElement; 