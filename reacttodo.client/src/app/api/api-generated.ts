import { emptyApi as api } from "./api-base";
export const addTagTypes = ["WeatherForecast", "TodoLists"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            weatherForecastGet: build.query<
                WeatherForecastGetApiResponse,
                WeatherForecastGetApiRequest
            >({
                query: () => ({ url: `/WeatherForecast` }),
                providesTags: ["WeatherForecast"],
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
export type WeatherForecastGetApiResponse =
    /** status 200  */ WeatherForecast[];
export type WeatherForecastGetApiRequest = void;
export type CreateTodoListHandleApiResponse = /** status 200  */ TodoListDto;
export type CreateTodoListHandleApiRequest = {
    todoListCreateDto: TodoListCreateDto;
};
export type ListTodoListsHandleApiResponse = /** status 200  */ TodoListDto[];
export type ListTodoListsHandleApiRequest = void;
export type WeatherForecast = {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary?: string | null;
};
export type TodoListDto = {
    id: string;
    name: string;
};
export type TodoListCreateDto = {
    name: string;
};
