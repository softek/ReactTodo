using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ReactTodo.Core.Entities;
using ReactTodo.Core.Entities.Specifications;
using ReactTodo.SharedKernel;

namespace ReactTodo.Htmx.Pages.List.Task;

public class IndexModel(
    IRepository<TodoList> todoListRepository)
    : PageModel
{
    private readonly IRepository<TodoList> _todoListRepository = todoListRepository;

    public async Task<IActionResult> OnGet(Guid listId, Guid taskId, CancellationToken cancellationToken)
    {
        var list = await _todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(listId),
            cancellationToken);

        if (list is null)
            return StatusCode(404, "List not found");

        var task = list.Tasks.FirstOrDefault(t => t.Id == taskId);

        if (task is null)
            return StatusCode(404, "Task not found");

        return Partial("_Task", task);
    }

    public async Task<IActionResult> OnDelete(Guid listId, Guid taskId, CancellationToken cancellationToken)
    {
        var list = await _todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(listId),
            cancellationToken);

        if (list is null)
            return StatusCode(404, "List not found");

        var task = list.Tasks.FirstOrDefault(t => t.Id == taskId);

        if (task is null)
            return StatusCode(404, "Task not found");

        list.RemoveItem(task);
        await todoListRepository.SaveChangesAsync(cancellationToken);

        return StatusCode(200);
    }

    public async Task<IActionResult> OnGetEdit(Guid listId, Guid taskId, CancellationToken cancellationToken)
    {
        var list = await _todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(listId),
            cancellationToken);

        if (list is null)
            return StatusCode(404, "List not found");

        var task = list.Tasks.FirstOrDefault(t => t.Id == taskId);

        if (task is null)
            return StatusCode(404, "Task not found");

        return Partial("_Edit", task);
    }

    public async Task<IActionResult> OnPostEdit(Guid listId, Guid taskId, [FromForm]TaskUpdate update, CancellationToken cancellationToken)
    {
        var list = await _todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(listId),
            cancellationToken);

        if (list is null)
            return StatusCode(404, "List not found");

        var task = list.Tasks.FirstOrDefault(t => t.Id == taskId);

        if (task is null)
            return StatusCode(404, "Task not found");

        task.UpdateName(update.Name);
        task.UpdateIsCompleted(update.IsCompleted == "on");

        await todoListRepository.SaveChangesAsync(cancellationToken);

        return Partial("_Task", task);
    }

    public class TaskUpdate
    {
        public string Name { get; set; } = string.Empty;
        public string IsCompleted { get; set; }
    }
}
