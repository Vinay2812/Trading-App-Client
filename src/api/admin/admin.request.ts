import { AddUserRequestType } from "../../hooks/api-hooks/admin/use-add-user";
import { AdminLoginRequest } from "../../hooks/api-hooks/admin/use-admin-login";
import api from "../../utils/api-instance";

export const adminLogin = async (data: AdminLoginRequest) => await api.post("/admin/login", data);

export const getRegistrationListUsers = async () =>
  await api.get("/admin/registration-list/users");

export const getPublishList = async () => await api.get("/admin/publish-list");

export const getPublishedList = async () =>
  await api.get("/admin/published-list");

export const addUser = async (data: AddUserRequestType) =>
  await api.post("/admin/registration-list/add-user", data);
