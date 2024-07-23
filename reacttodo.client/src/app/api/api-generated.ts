import { emptyApi as api } from "./api-base";
export const addTagTypes = ["TodoLists", "TodoTasks"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
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
            getTodoListDetailsHandle: build.query<
                GetTodoListDetailsHandleApiResponse,
                GetTodoListDetailsHandleApiRequest
            >({
                query: (queryArg) => ({
                    url: `/api/v1/todolists/${queryArg.listId}`,
                }),
                providesTags: ["TodoTasks"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type CreateTodoListHandleApiResponse = /** status 200  */ TodoListDto;
export type CreateTodoListHandleApiRequest = {
    todoListCreateDto: TodoListCreateDto;
};
export type ListTodoListsHandleApiResponse = /** status 200  */ TodoListDto[];
export type ListTodoListsHandleApiRequest = void;
export type CreateTodoTaskHandleApiResponse = /** status 200  */ TodoTaskDto;
export type CreateTodoTaskHandleApiRequest = {
    listId: string;
    todoTaskCreateDto: TodoTaskCreateDto;
};
export type DeleteTodoTaskHandleApiResponse = /** status 200  */ void;
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
export type GetTodoListDetailsHandleApiResponse =
    /** status 200  */ TodoListDetailDto;
export type GetTodoListDetailsHandleApiRequest = {
    listId: string;
};
export type TodoListDto = {
    id: string;
    name: string;
};
export type TodoListCreateDto = {
    name: string;
};
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
export type TodoListDetailDto = {
    id: string;
    name: string;
    tasks: TodoTaskDto[];
};
