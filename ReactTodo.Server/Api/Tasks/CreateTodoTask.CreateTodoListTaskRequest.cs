using Microsoft.AspNetCore.Mvc;
using ReactTodo.App;

namespace ReactTodo.Server.Api.Tasks;

public class CreateTodoTaskRequest
{
    private const string ListIdPlaceholder = "{ListId:guid}";

    public const string Route = $"api/v1/todolists/{ListIdPlaceholder}/tasks";

    public static string BuildRoute(Guid listId) =>
        Route
            .Replace(ListIdPlaceholder, listId.ToString());

    [FromRoute]
    public Guid ListId { get; set; }

    [FromBody]
    public TodoTaskCreateDto Data { get; set; } = new();
}
