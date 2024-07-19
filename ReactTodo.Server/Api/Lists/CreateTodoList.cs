using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ReactTodo.App;
using ReactTodo.Core.Entities;
using ReactTodo.SharedKernel;

namespace ReactTodo.Server.Api.Lists;

public class CreateTodoList(IRepository<TodoList> todoListRepository) : EndpointBaseAsync
    .WithRequest<CreateTodoListRequest>
    .WithActionResult<TodoListDto>
{
    private readonly IRepository<TodoList> _todoListRepository = todoListRepository;

    private ObjectResult CreateTodoListFailedResult(HttpContext ctx, Exception e) =>
        StatusCode(500, ProblemDetailsFactory.CreateProblemDetails(
            title: "Could not add the todo list to the data store.",
            detail: e.Message,
            statusCode: 500,
            httpContext: ctx));

    [OpenApiTag("TodoLists")]
    [ProducesResponseType(typeof(TodoListDto), 200)]
    [HttpPost(CreateTodoListRequest.Route)]
    public override async Task<ActionResult<TodoListDto>> HandleAsync(
        CreateTodoListRequest request,
        CancellationToken cancellationToken = new())
    {
        var requestData = request.Data;

        var todoList = new TodoList(
            requestData.Name);

        try
        {
            await _todoListRepository.AddAsync(todoList, cancellationToken);
        }
        catch (Exception e)
        {
            return CreateTodoListFailedResult(HttpContext, e);
        }

        var response = todoList.ToTodoListDto();

        return Ok(response);
    }
}

