export interface UserOnlineDetailsInterface {
    userId: string;
    company_name: string;
    email: string;
    password: string;
    address: string;
    state: string;
    district: string;
    pincode: number;
    mobile: string;
    whatsapp?: string;
    gst?: string;
    pan: string;
    fssai?: string;
    tan?: string;
    constitution_of_firm: string;
    authorized?: string;
    accoid?: number;
}

export type LoginUserResponse = {
    userData: UserOnlineDetailsInterface,
}