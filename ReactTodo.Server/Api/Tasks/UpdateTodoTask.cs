using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ReactTodo.App;
using ReactTodo.Core.Entities;
using ReactTodo.Core.Entities.Specifications;
using ReactTodo.SharedKernel;

namespace ReactTodo.Server.Api.Tasks;

public class UpdateTodoTask(IRepository<TodoList> todoListRepository) : EndpointBaseAsync
    .WithRequest<UpdateTodoTaskRequest>
    .WithActionResult<TodoTaskDto>
{
    private readonly IRepository<TodoList> _todoListRepository = todoListRepository;

    [OpenApiTag("TodoTasks")]
    [HttpPut(UpdateTodoTaskRequest.Route)]
    public override async Task<ActionResult<TodoTaskDto>> HandleAsync(
        UpdateTodoTaskRequest request,
        CancellationToken cancellationToken = new())
    {
        var list = await _todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(request.ListId),
            cancellationToken);

        if (list is null)
            return NotFound("Task not found");

        var task = list.Tasks.FirstOrDefault(t => t.Id == request.TaskId);

        if (task is null)
            return NotFound("Task not found");

        task.UpdateName(request.Data.Name);
        task.UpdateIsCompleted(request.Data.IsCompleted);

        await _todoListRepository.SaveChangesAsync(cancellationToken);

        var response = task.ToTodoTaskDto();

        return Ok(response);
    }
}
