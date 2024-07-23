using Microsoft.AspNetCore.Http.HttpResults;
using ReactTodo.App;
using ReactTodo.Core.Entities;
using ReactTodo.SharedKernel;

namespace ReactTodo.Server.Api;

public static class TodoLists
{
    public static void MapTodoListsEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("api/v1/todolists")
            .WithTags("TodoLists");

        group.MapPost("", CreateTodoList)
            .WithName(nameof(CreateTodoList));

        group.MapGet("", ListTodoLists)
            .WithName(nameof(ListTodoLists));
    }

    public static async Task<Ok<IEnumerable<TodoListDto>>> ListTodoLists(
        IRepository<TodoList> todoListRepository,
        CancellationToken cancellationToken)
    {
        var todoLists = await todoListRepository.ListAsync(cancellationToken);
        var response = todoLists.Select(t => t.ToTodoListDto());
        return TypedResults.Ok(response);
    }

    public static async Task<Results<Ok<TodoListDto>, ProblemHttpResult>> CreateTodoList(
        IRepository<TodoList> todoListRepository,
        TodoListCreateDto data,
        CancellationToken cancellationToken)
    {
        var todoList = new TodoList(data.Name);

        try
        {
            await todoListRepository.AddAsync(todoList, cancellationToken);
        }
        catch (Exception e)
        {
            return TypedResults.Problem(
                title: "Could not add the todo list to the data store.",
                detail: e.Message);
        }

        var response = todoList.ToTodoListDto();
        return TypedResults.Ok(response);
    }
}
