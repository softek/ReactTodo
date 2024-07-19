using Ardalis.GuardClauses;
using ReactTodo.SharedKernel;

namespace ReactTodo.Core.Entities;

public class TodoTask : BaseEntity
{
#pragma warning disable CS8618
    protected TodoTask() {/* Required for EF */}
#pragma warning restore CS8618

    public TodoTask(string name, bool isCompleted, TodoList list)
    {
        Name = Guard.Against.NullOrEmpty(name);
        IsCompleted = isCompleted;
        List = Guard.Against.Null(list);
    }

    public string Name { get; private set; }
    public bool IsCompleted { get; private set; }
    public TodoList List { get; private set; }

    public void UpdateName(string newName) =>
        Name = Guard.Against.NullOrEmpty(newName);

    public void UpdateIsCompleted(bool isCompleted) =>
        IsCompleted = isCompleted;
}
