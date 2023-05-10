import { AddUserRequestType } from "../../hooks/api-hooks/admin/use-add-user";
import { AdminLoginRequest } from "../../hooks/api-hooks/admin/use-admin-login";
import { MapClientRequest } from "../../hooks/api-hooks/admin/use-map-client";
import { PostPublishRequest } from "../../hooks/api-hooks/admin/use-post-publish-list";
import api from "../../utils/api-instance";

export const adminLogin = async (data: AdminLoginRequest) =>
  await api.post("/admin/login", data);

export const getRegistrationListUsers = async () =>
  await api.get("/admin/registration-list/users");

export const getPublishList = async () => await api.get("/admin/publish-list");

export const getPublishedList = async () =>
  await api.get("/admin/published-list");

export const addUser = async (data: AddUserRequestType) =>
  await api.post("/admin/registration-list/add-user", data);

export const mapClient = async (data: MapClientRequest) =>
  await api.post("/admin/registration-list/map-client", data);

export const postPublishList = async (data: PostPublishRequest) =>
  await api.post("/admin/publish-list", data);
