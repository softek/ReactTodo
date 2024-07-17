import { emptyApi as api } from "./api-base";
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        weatherForecastGet: build.query<
            WeatherForecastGetApiResponse,
            WeatherForecastGetApiRequest
        >({
            query: () => ({ url: `/WeatherForecast` }),
        }),
    }),
    overrideExisting: false,
});
export { injectedRtkApi as api };
export type WeatherForecastGetApiResponse =
    /** status 200  */ WeatherForecast[];
export type WeatherForecastGetApiRequest = void;
export type WeatherForecast = {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary?: string | null;
};
