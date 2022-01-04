import { IPlan } from "./plan";
import { IPlanInvitation } from "./planInvitations";


export interface IPlanOrder
{
    plan: IPlan;
    invitations: IPlanInvitation[]
}