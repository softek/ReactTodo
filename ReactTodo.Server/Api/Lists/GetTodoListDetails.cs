using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ReactTodo.App;
using ReactTodo.Core.Entities;
using ReactTodo.Core.Entities.Specifications;
using ReactTodo.SharedKernel;

namespace ReactTodo.Server.Api.Lists;

public class GetTodoListDetails(IRepository<TodoList> todoListRepository) : EndpointBaseAsync
    .WithRequest<GetTodoListDetailsRequest>
    .WithActionResult<TodoListDetailDto>

{
    private readonly IRepository<TodoList> _todoListRepository = todoListRepository;

    [OpenApiTag("TodoTasks")]
    [HttpGet(GetTodoListDetailsRequest.Route)]
    public override async Task<ActionResult<TodoListDetailDto>> HandleAsync(
        GetTodoListDetailsRequest request,
        CancellationToken cancellationToken = new())
    {
        var list = await _todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(request.ListId),
            cancellationToken);

        if (list is null)
            return NotFound();

        var response = list.ToTodoListDetailDto();

        return Ok(response);
    }
}
