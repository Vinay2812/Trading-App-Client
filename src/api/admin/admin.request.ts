import api from "../../utils/api-instance";

export const getRegistrationListUsers = async () => await api.get("/admin/registration-list/users")
