using Microsoft.AspNetCore.Http.HttpResults;
using ReactTodo.App;
using ReactTodo.Core.Entities;
using ReactTodo.Core.Entities.Specifications;
using ReactTodo.SharedKernel;

namespace ReactTodo.Server.Api;

public static class TodoLists
{
    public static void MapTodoListsEndpoints(this IEndpointRouteBuilder builder)
    {
        const string TodoLists = "TodoLists";
        const string TodoTasks = "TodoTasks";
        var group = builder.MapGroup("api/v1/todolists")
            // Middleware can be applied to groups
            //.RequireAuthorization()
            //.RequireRateLimiting()
            //.AddEndpointFilter()
            ;

        group.MapPost("{listId:guid}/tasks", CreateTodoTask)
            // TODO: RTK Query wants the "_Handle" suffix?
            .WithName($"{nameof(CreateTodoTask)}_Handle")
            .WithTags(TodoTasks);

        group.MapDelete("{listId:guid}/tasks/{taskId:guid}", DeleteTodoTask)
            .WithName($"{nameof(DeleteTodoTask)}_Handle")
            .WithTags(TodoTasks);

        group.MapPost("", CreateTodoList)
            .WithName($"{nameof(CreateTodoList)}_Handle")
            .WithTags(TodoLists);

        group.MapGet("{listId:guid}", GetTodoListDetails)
            .WithName($"{nameof(GetTodoListDetails)}_Handle")
            .WithTags(TodoTasks);

        group.MapPut("{listId:guid}/tasks/{taskId:guid}", UpdateTodoTask)
            .WithName($"{nameof(UpdateTodoTask)}_Handle")
            .WithTags(TodoTasks);

        group.MapGet("", ListTodoLists)
            .WithName($"{nameof(ListTodoLists)}_Handle")
            .WithTags(TodoLists);
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

    public static async Task<Results<Ok<TodoListDetailDto>, NotFound>> GetTodoListDetails(
        IRepository<TodoList> todoListRepository,
        Guid listId,
        CancellationToken cancellationToken)
    {
        var list = await todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(listId),
            cancellationToken);

        if (list is null)
            return TypedResults.NotFound();

        var response = list.ToTodoListDetailDto();
        return TypedResults.Ok(response);
    }

    public static async Task<Results<Ok<TodoTaskDto>, NotFound, ProblemHttpResult>> CreateTodoTask(
        IRepository<TodoList> todoListRepository,
        Guid listId,
        TodoTaskCreateDto data,
        CancellationToken cancellationToken)
    {
        var list = await todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(listId),
            cancellationToken);

        if (list is null)
            return TypedResults.NotFound();

        var task = new TodoTask(data.Name, false, list);

        list.AddItem(task);

        try
        {
            await todoListRepository.SaveChangesAsync(cancellationToken);
        }
        catch (Exception e)
        {
            return TypedResults.Problem(
                title: "Could not add the todo list to the data store.",
                detail: e.Message);
        }

        var response = task.ToTodoTaskDto();

        return TypedResults.Ok(response);
    }

    public static async Task<Results<Ok<TodoTaskDto>, NotFound<string>>> UpdateTodoTask(
        IRepository<TodoList> todoListRepository,
        Guid listId,
        Guid taskId,
        TodoTaskUpdateDto data,
        CancellationToken cancellationToken)
    {
        var list = await todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(listId),
            cancellationToken);

        if (list is null)
            return TypedResults.NotFound("List not found");

        var task = list.Tasks.FirstOrDefault(t => t.Id == taskId);

        if (task is null)
            return TypedResults.NotFound("Task not found");

        task.UpdateName(data.Name);
        task.UpdateIsCompleted(data.IsCompleted);

        await todoListRepository.SaveChangesAsync(cancellationToken);

        var response = task.ToTodoTaskDto();

        return TypedResults.Ok(response);
    }

    public static async Task<Results<Ok, NotFound<string>>> DeleteTodoTask(
        IRepository<TodoList> todoListRepository,
        Guid listId,
        Guid taskId,
        CancellationToken cancellationToken)
    {
        var list = await todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(listId),
            cancellationToken);

        if (list is null)
            return TypedResults.NotFound("List not found");

        var task = list.Tasks.FirstOrDefault(t => t.Id == taskId);

        if (task is null)
            return TypedResults.NotFound("Task not found");

        list.RemoveItem(task);
        await todoListRepository.SaveChangesAsync(cancellationToken);

        return TypedResults.Ok();
    }
}
