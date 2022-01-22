import { IMetal } from "./metal";

export interface IOrderItem
{
    id : number;
    // metal : IMetal;
    metalId: number;
    createdDate: Date;
    metalTypeId: number;
    metalTypeName : string;
    price: number;
    status: string;
    quantity: number;
    totalPrice: number;
    measurementType: string;
    orderStatus: string;
}