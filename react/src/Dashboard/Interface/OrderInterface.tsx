import OrderElement from "./OrderElementInterface";

interface Order {
    open: OrderElement[]; 
    executed: OrderElement[]; 
    cancelled: OrderElement[];
}

export default Order; 