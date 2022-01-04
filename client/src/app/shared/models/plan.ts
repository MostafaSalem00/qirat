import { IOrderItem } from "./orderItem";
import { IPlanType } from "./planType";

export interface IPlan
{
    id: number;
    planType: IPlanType;
    planTypeId: number;
    createdDate: Date;
    status: string;
    
    orderItems: IOrderItem[];
}