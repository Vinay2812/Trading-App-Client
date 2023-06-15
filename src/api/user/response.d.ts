import {
  UserBankDetailsInterface,
  UserContactDetailsInterface,
  UserDetailsInterface,
} from "../../pages/Auth/types/register";

export interface UserDetailsType extends UserDetailsInterface {
  isMapped: boolean;
  isAdded: boolean;
}
