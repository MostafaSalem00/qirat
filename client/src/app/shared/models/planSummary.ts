import { IOrderItem } from "./orderItem";
import { IPlanType } from "./planType";

export interface IPlanSummary{
    id: number;
    planType: IPlanType;
    planTypeId: number;
    
    orderItem: IOrderItem;
}