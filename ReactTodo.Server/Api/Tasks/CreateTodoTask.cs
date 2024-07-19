using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ReactTodo.App;
using ReactTodo.Core.Entities;
using ReactTodo.Core.Entities.Specifications;
using ReactTodo.SharedKernel;

namespace ReactTodo.Server.Api.Tasks;

public class CreateTodoTask(IRepository<TodoList> todoListRepository) : EndpointBaseAsync
    .WithRequest<CreateTodoTaskRequest>
    .WithActionResult<TodoTaskDto>
{
    private readonly IRepository<TodoList> _todoListRepository = todoListRepository;

    private ObjectResult CreateTodoListTaskFailedResult(HttpContext ctx, Exception e) =>
        StatusCode(500, ProblemDetailsFactory.CreateProblemDetails(
            title: "Could not add the todo list task to the data store.",
            detail: e.Message,
            statusCode: 500,
            httpContext: ctx));

    [OpenApiTag("TodoTasks")]
    [ProducesResponseType(typeof(TodoTaskDto), 200)]
    [HttpPost(CreateTodoTaskRequest.Route)]
    public override async Task<ActionResult<TodoTaskDto>> HandleAsync(
        CreateTodoTaskRequest request,
        CancellationToken cancellationToken = new())
    {
        var requestData = request.Data;

        var list = await _todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(request.ListId),
            cancellationToken);

        if (list is null)
            return NotFound();

        var task = new TodoTask(requestData.Name, false, list);

        list.AddItem(task);

        try
        {
            await _todoListRepository.SaveChangesAsync(cancellationToken);
        }
        catch (Exception e)
        {
            return CreateTodoListTaskFailedResult(HttpContext, e);
        }

        var response = task.ToTodoTaskDto();

        return Ok(response);
    }
}
