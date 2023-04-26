import api from "../../utils/api-instance";

export const getRegistrationListUsers = async () =>
  await api.get("/admin/registration-list/users");

export const getPublishList = async () => await api.get("/admin/publish-list");

export const getPublishedList = async () =>
  await api.get("/admin/published-list");
