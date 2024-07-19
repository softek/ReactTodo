using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ReactTodo.App;
using ReactTodo.Core.Entities;
using ReactTodo.Core.Entities.Specifications;
using ReactTodo.SharedKernel;

namespace ReactTodo.Server.Api.Tasks;

public class ListTodoTasks(IRepository<TodoList> todoListRepository) : EndpointBaseAsync
    .WithRequest<ListTasksRequest>
    .WithActionResult<IEnumerable<TodoTaskDto>>

{
    private readonly IRepository<TodoList> _todoListRepository = todoListRepository;

    [OpenApiTag("TodoTasks")]
    [HttpGet(ListTasksRequest.Route)]
    public override async Task<ActionResult<IEnumerable<TodoTaskDto>>> HandleAsync(
        ListTasksRequest request,
        CancellationToken cancellationToken = new())
    {
        var list = await _todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(request.ListId),
            cancellationToken);

        if (list is null)
            return NotFound();

        var response = list.Tasks.Select(t => t.ToTodoTaskDto());

        return Ok(response);
    }
}
