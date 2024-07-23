namespace ReactTodo.Server.Api;

public static class IEndpointRouteBuilderExtensions
{
    public static void MapApiEndpoints(this IEndpointRouteBuilder builder)
    {
        builder.MapTodoListsEndpoints();
        builder.MapTodoTasksEndpoints();
    }
}
