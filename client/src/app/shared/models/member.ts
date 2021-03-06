import { IAttachment } from "./attachment";

export interface IMember {
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: Date;
    lockoutEnabled: boolean;
    accessFailedCount: number;
    knowAboutUsId: number;    
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    occupation: string;
    otherPhoneNumber: string;
    isAmerican: boolean;
    attachment: IAttachment[],
    residentAddress: string;
    mailingAddress: string;
    acceptPolicy: boolean;
    accepted: boolean;
}

