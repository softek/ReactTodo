using Ardalis.GuardClauses;
using ReactTodo.SharedKernel;

namespace ReactTodo.Core.Entities;

public class TodoList : BaseEntity, IAggregateRoot
{
    private readonly List<TodoTask> _tasks = [];

#pragma warning disable CS8618
    protected TodoList() {/* Required for EF */}
#pragma warning restore CS8618

    public TodoList(string name) =>
        Name = Guard.Against.NullOrEmpty(name);

    public string Name { get; private set; }

    public IEnumerable<TodoTask> Tasks => _tasks;

    public void AddItem(TodoTask task) =>
        _tasks.Add(Guard.Against.Null(task));

    public void RemoveItem(TodoTask task) =>
        _tasks.Remove(Guard.Against.Null(task));
}
