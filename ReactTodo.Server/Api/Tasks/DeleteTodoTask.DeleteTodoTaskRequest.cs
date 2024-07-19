using Microsoft.AspNetCore.Mvc;

namespace ReactTodo.Server.Api.Tasks;

public class DeleteTodoTaskRequest
{
    private const string ListIdPlaceholder = "{ListId:guid}";
    private const string TaskIdPlaceholder = "{TaskId:guid}";

    public const string Route = $"api/v1/todolists/{ListIdPlaceholder}/tasks/{TaskIdPlaceholder}";

    [FromRoute]
    public Guid ListId { get; set; }

    [FromRoute]
    public Guid TaskId { get; set; }
}
