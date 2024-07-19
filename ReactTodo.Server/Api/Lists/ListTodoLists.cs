using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ReactTodo.App;
using ReactTodo.Core.Entities;
using ReactTodo.SharedKernel;

namespace ReactTodo.Server.Api.Lists;

public class ListTodoLists(IRepository<TodoList> todoListRepository) : EndpointBaseAsync
    .WithoutRequest
    .WithActionResult<IEnumerable<TodoListDto>>
{
    private readonly IRepository<TodoList> _todoListRepository = todoListRepository;

    [OpenApiTag("TodoLists")]
    [HttpGet("api/v1/todolists")]
    public override async Task<ActionResult<IEnumerable<TodoListDto>>> HandleAsync(
        CancellationToken cancellationToken = new())
    {
        var todoLists = await _todoListRepository.ListAsync(cancellationToken);

        var response = todoLists.Select(t => t.ToTodoListDto());

        return Ok(response);
    }
}
