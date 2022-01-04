
export interface IPlanInvitation
{
    id: number;
    inviter: string;
    invitee: string;
    email: string;
    createdDate: Date;
    expiration: Date;
    planId : number;
    status: number;
}