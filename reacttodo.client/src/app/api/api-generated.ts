import { emptyApi as api } from "./api-base";
export const addTagTypes = ["TodoTasks", "TodoLists"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            createTodoTaskHandle: build.mutation<
                CreateTodoTaskHandleApiResponse,
                CreateTodoTaskHandleApiRequest
            >({
                query: (queryArg) => ({
                    url: `/api/v1/todolists/${queryArg.listId}/tasks`,
                    method: "POST",
                    body: queryArg.todoTaskCreateDto,
                }),
                invalidatesTags: ["TodoTasks"],
            }),
            listTodoTasksHandle: build.query<
                ListTodoTasksHandleApiResponse,
                ListTodoTasksHandleApiRequest
            >({
                query: (queryArg) => ({
                    url: `/api/v1/todolists/${queryArg.listId}/tasks`,
                }),
                providesTags: ["TodoTasks"],
            }),
            deleteTodoTaskHandle: build.mutation<
                DeleteTodoTaskHandleApiResponse,
                DeleteTodoTaskHandleApiRequest
            >({
                query: (queryArg) => ({
                    url: `/api/v1/todolists/${queryArg.listId}/tasks/${queryArg.taskId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["TodoTasks"],
            }),
            updateTodoTaskHandle: build.mutation<
                UpdateTodoTaskHandleApiResponse,
                UpdateTodoTaskHandleApiRequest
            >({
                query: (queryArg) => ({
                    url: `/api/v1/todolists/${queryArg.listId}/tasks/${queryArg.taskId}`,
                    method: "PUT",
                    body: queryArg.todoTaskUpdateDto,
                }),
                invalidatesTags: ["TodoTasks"],
            }),
            createTodoListHandle: build.mutation<
                CreateTodoListHandleApiResponse,
                CreateTodoListHandleApiRequest
            >({
                query: (queryArg) => ({
                    url: `/api/v1/todolists`,
                    method: "POST",
                    body: queryArg.todoListCreateDto,
                }),
                invalidatesTags: ["TodoLists"],
            }),
            listTodoListsHandle: build.query<
                ListTodoListsHandleApiResponse,
                ListTodoListsHandleApiRequest
            >({
                query: () => ({ url: `/api/v1/todolists` }),
                providesTags: ["TodoLists"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type CreateTodoTaskHandleApiResponse = /** status 200  */ TodoTaskDto;
export type CreateTodoTaskHandleApiRequest = {
    listId: string;
    todoTaskCreateDto: TodoTaskCreateDto;
};
export type ListTodoTasksHandleApiResponse = /** status 200  */ TodoTaskDto[];
export type ListTodoTasksHandleApiRequest = {
    listId: string;
};
export type DeleteTodoTaskHandleApiResponse = unknown;
export type DeleteTodoTaskHandleApiRequest = {
    listId: string;
    taskId: string;
};
export type UpdateTodoTaskHandleApiResponse = /** status 200  */ TodoTaskDto;
export type UpdateTodoTaskHandleApiRequest = {
    listId: string;
    taskId: string;
    todoTaskUpdateDto: TodoTaskUpdateDto;
};
export type CreateTodoListHandleApiResponse = /** status 200  */ TodoListDto;
export type CreateTodoListHandleApiRequest = {
    todoListCreateDto: TodoListCreateDto;
};
export type ListTodoListsHandleApiResponse = /** status 200  */ TodoListDto[];
export type ListTodoListsHandleApiRequest = void;
export type TodoTaskDto = {
    id: string;
    name: string;
    isCompleted: boolean;
};
export type TodoTaskCreateDto = {
    name: string;
};
export type TodoTaskUpdateDto = {
    name: string;
    isCompleted: boolean;
};
export type TodoListDto = {
    id: string;
    name: string;
};
export type TodoListCreateDto = {
    name: string;
};
