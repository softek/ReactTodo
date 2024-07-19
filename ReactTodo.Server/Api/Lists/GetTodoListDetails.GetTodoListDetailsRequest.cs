using Microsoft.AspNetCore.Mvc;

namespace ReactTodo.Server.Api.Lists;

public class GetTodoListDetailsRequest
{
    private const string ListIdPlaceholder = "{ListId:guid}";

    public const string Route = $"api/v1/todolists/{ListIdPlaceholder}";

    public static string BuildRoute(Guid listId) =>
        Route
            .Replace(ListIdPlaceholder, listId.ToString());

    [FromRoute]
    public Guid ListId { get; set; }
}
