import api from "../../utils/api-instance";
import { PostTodoRequestType } from "./request";

export const getTodos = async (userId: string) => await api.get(`/todos/all/${userId}`)
export const postTodo = async (data: PostTodoRequestType) => await api.post("/todos", data)