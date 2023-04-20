import { UserBankDetailsInterface, UserContactDetailsInterface, UserDetailsInterface } from "../../pages/Auth/types/register";

export type LoginUserRequest = {
    mobile: string;
    company_name: string;
    password: string;
}

export type RegisterUserRequest = {
    userData: UserDetailsInterface,
    bankData: Array<UserBankDetailsInterface>
    contactData: Array<UserContactDetailsInterface>,
}