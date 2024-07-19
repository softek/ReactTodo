using Microsoft.AspNetCore.Mvc;
using ReactTodo.App;

namespace ReactTodo.Server.Api;

public class CreateTodoListRequest
{
    public const string Route = $"api/v1/todolists";

    [FromBody]
    public TodoListCreateDto Data { get; set; } = new();
}
