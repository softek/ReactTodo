using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ReactTodo.Core.Entities;
using ReactTodo.Core.Entities.Specifications;
using ReactTodo.SharedKernel;

namespace ReactTodo.Server.Api.Tasks;

public class DeleteTodoTask(IRepository<TodoList> todoListRepository) : EndpointBaseAsync
    .WithRequest<DeleteTodoTaskRequest>
    .WithoutResult
{
    private readonly IRepository<TodoList> _todoListRepository = todoListRepository;

    [OpenApiTag("TodoTasks")]
    [HttpDelete(DeleteTodoTaskRequest.Route)]
    public override async Task<ActionResult> HandleAsync(
        DeleteTodoTaskRequest request,
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

        list.RemoveItem(task);
        await _todoListRepository.SaveChangesAsync(cancellationToken);

        return Ok();
    }
}
