import { AddUserRequestType } from "../../hooks/api-hooks/admin/use-add-user";
import { AdminLoginRequest } from "../../hooks/api-hooks/admin/use-admin-login";
import { MapClientRequest } from "../../hooks/api-hooks/admin/use-map-client";
import { PostPublishRequest } from "../../hooks/api-hooks/admin/use-post-publish-list";
import { UpdatePendingOrder } from "../../hooks/api-hooks/admin/use-update-pending-order";
import { UpdatePublishedListItemRequest } from "../../hooks/api-hooks/admin/use-update-published-list-item";
import { UpdateTradeTimeReq } from "../../hooks/api-hooks/admin/use-update-trade-time";
import api from "../../utils/api-instance";

export const adminLogin = async (data: AdminLoginRequest) =>
  await api.post("/admin/login", data);

export const getRegistrationListUsers = async () =>
  await api.get("/admin/registration-list/users");

export const getPublishList = async () => await api.get("/admin/publish-list");

export const getPublishedList = async (query: string) =>
  await api.get("/admin/published-list" + query);

export const getAllTradeStatus = async () =>
  await api.get("/admin/published-list/status/all");
export const updateAllTradeStatus = async (data: { status: "Y" | "N" }) =>
  api.patch("/admin/published-list/status/all", data);

export const addUser = async (data: AddUserRequestType) =>
  await api.post("/admin/registration-list/add-user", data);

export const mapClient = async (data: MapClientRequest) =>
  await api.post("/admin/registration-list/map-client", data);

export const postPublishList = async (data: PostPublishRequest) =>
  await api.post("/admin/publish-list", data);

export const updatePublishedListItem = async (
  data: UpdatePublishedListItemRequest
) => await api.patch("/admin/published-list/item", data);

export const getOrderList = async (query: string) =>
  await api.get("/admin/order-list" + query);
export const updatePendingOrder = async (data: UpdatePendingOrder) =>
  await api.patch("/admin/pending-order", data);

export const getTradeTime = async () => await api.get("/admin/trade-time");

export const updateTradeTime = async (data: UpdateTradeTimeReq) =>
  await api.patch("/admin/trade-time", data);

export const updatePublishDates = async (data: {
  publishDate: Date | string;
}) => api.patch("/admin/publlished-list/publish-date", data);
