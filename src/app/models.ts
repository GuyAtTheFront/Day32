export interface Item {
    id: number;
    name: string;
    unitPrice: number;
    quantity: number;
}

export interface Cart{
    id: string;
    name: string;
    address: string;
    delivery: string;
    items: Item[];
}