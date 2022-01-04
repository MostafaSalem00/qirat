import { Role } from "./Role";


export interface IUser {
    email: string;
    userName: string;
    role : Role[];
    token: string;
}