using Htmx;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ReactTodo.Core.Entities;
using ReactTodo.SharedKernel;

namespace ReactTodo.Htmx.Pages;
public class IndexModel(
    IRepository<TodoList> todoListRepository)
    : PageModel
{
    private readonly IRepository<TodoList> _todoListRepository = todoListRepository;

    public async Task<IActionResult> OnGet(CancellationToken cancellationToken)
    {
        TodoLists = await _todoListRepository.ListAsync(cancellationToken);

        return Render();
    }

    public async Task<IActionResult> OnPostAsync(CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            TodoLists = await _todoListRepository.ListAsync(cancellationToken);
            return Render();
        }
        var todoList = new TodoList(Name);

        await todoListRepository.AddAsync(todoList, cancellationToken);

        ModelState.Clear();
        Name = string.Empty;

        TodoLists = await _todoListRepository.ListAsync(cancellationToken);
        return Render();
    }

    private IActionResult Render() =>
        Request.IsHtmx()
            ? Partial("__Lists", this)
            : Page();

    public List<TodoList> TodoLists { get; set; }

    [BindProperty]
    public string Name { get; set; }
}
