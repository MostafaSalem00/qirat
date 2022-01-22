import { IMetal } from "./metal";

export interface INewPlan 
{
    id: number;
    planTypeId: number;
    metalTypeId: number;
    metalTypeName: string;
    // metalPrice: number;
    amount: number;
    measurementType: string;
    // metal: IMetal;
    // totalPrice: number;
    acceptTerms: boolean;
}