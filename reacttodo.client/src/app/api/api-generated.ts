import { emptyApi as api } from "./api-base";
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        weatherForecastGet: build.query<
            WeatherForecastGetApiResponse,
            WeatherForecastGetApiRequest
        >({
            query: () => ({ url: `/WeatherForecast` }),
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
        }),
        listTodoListsHandle: build.query<
            ListTodoListsHandleApiResponse,
            ListTodoListsHandleApiRequest
        >({
            query: () => ({ url: `/api/v1/todolists` }),
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
