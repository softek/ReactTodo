import { emptyApi as api } from "./api-base";
export const addTagTypes = ["TodoLists", "TodoTasks"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            createTodoList: build.mutation<
                CreateTodoListApiResponse,
                CreateTodoListApiRequest
            >({
                query: (queryArg) => ({
                    url: `/api/v1/todolists`,
                    method: "POST",
                    body: queryArg.todoListCreateDto,
                }),
                invalidatesTags: ["TodoLists"],
            }),
            listTodoLists: build.query<
                ListTodoListsApiResponse,
                ListTodoListsApiRequest
            >({
                query: () => ({ url: `/api/v1/todolists` }),
                providesTags: ["TodoLists"],
            }),
            createTodoTask: build.mutation<
                CreateTodoTaskApiResponse,
                CreateTodoTaskApiRequest
            >({
                query: (queryArg) => ({
                    url: `/api/v1/todolists/${queryArg.listId}/tasks`,
                    method: "POST",
                    body: queryArg.todoTaskCreateDto,
                }),
                invalidatesTags: ["TodoTasks"],
            }),
            deleteTodoTask: build.mutation<
                DeleteTodoTaskApiResponse,
                DeleteTodoTaskApiRequest
            >({
                query: (queryArg) => ({
                    url: `/api/v1/todolists/${queryArg.listId}/tasks/${queryArg.taskId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["TodoTasks"],
            }),
            updateTodoTask: build.mutation<
                UpdateTodoTaskApiResponse,
                UpdateTodoTaskApiRequest
            >({
                query: (queryArg) => ({
                    url: `/api/v1/todolists/${queryArg.listId}/tasks/${queryArg.taskId}`,
                    method: "PUT",
                    body: queryArg.todoTaskUpdateDto,
                }),
                invalidatesTags: ["TodoTasks"],
            }),
            getTodoListDetails: build.query<
                GetTodoListDetailsApiResponse,
                GetTodoListDetailsApiRequest
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
export type CreateTodoListApiResponse = /** status 200  */ TodoListDto;
export type CreateTodoListApiRequest = {
    todoListCreateDto: TodoListCreateDto;
};
export type ListTodoListsApiResponse = /** status 200  */ TodoListDto[];
export type ListTodoListsApiRequest = void;
export type CreateTodoTaskApiResponse = /** status 200  */ TodoTaskDto;
export type CreateTodoTaskApiRequest = {
    listId: string;
    todoTaskCreateDto: TodoTaskCreateDto;
};
export type DeleteTodoTaskApiResponse = /** status 200  */ void;
export type DeleteTodoTaskApiRequest = {
    listId: string;
    taskId: string;
};
export type UpdateTodoTaskApiResponse = /** status 200  */ TodoTaskDto;
export type UpdateTodoTaskApiRequest = {
    listId: string;
    taskId: string;
    todoTaskUpdateDto: TodoTaskUpdateDto;
};
export type GetTodoListDetailsApiResponse =
    /** status 200  */ TodoListDetailDto;
export type GetTodoListDetailsApiRequest = {
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
