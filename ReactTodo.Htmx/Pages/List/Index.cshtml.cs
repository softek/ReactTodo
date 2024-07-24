using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ReactTodo.Core.Entities;
using ReactTodo.Core.Entities.Specifications;
using ReactTodo.SharedKernel;
using Htmx;

namespace ReactTodo.Htmx.Pages.List;

public class ListModel(IRepository<TodoList> todoListRepository) : PageModel
{
    private readonly IRepository<TodoList> _todoListRepository = todoListRepository;

    public async Task<IActionResult> OnGet(Guid id, CancellationToken cancellationToken)
    {
        List = await _todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(id),
            cancellationToken);

        return Render();
    }

    public async Task<IActionResult> OnPostAsync(Guid id, CancellationToken cancellationToken)
    {
        List = await _todoListRepository.FirstOrDefaultAsync(
            new FullTodoListByIdSpec(id),
            cancellationToken);

        if (!ModelState.IsValid)
        {
            return Render();
        }

        var task = new TodoTask(Name, false, List);

        List.AddItem(task);

        await todoListRepository.SaveChangesAsync(cancellationToken);

        ModelState.Clear();
        Name = string.Empty;

        return Render();
    }

    private IActionResult Render() =>
        Request.IsHtmx()
            ? Partial("__List", this)
            : Page();

    public TodoList? List { get; set; }

    [BindProperty]
    public string Name { get; set; }
}
