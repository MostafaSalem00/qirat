import { IRates } from "./rates";

export interface IMetal 
{
    id: number;
        success: boolean;
        timestamp: number;
        date: string;
        base: string;
        rates: IRates;
        ratesId: number;
        unit: string;
}