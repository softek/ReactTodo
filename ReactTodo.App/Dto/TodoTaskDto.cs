using ReactTodo.App.Dto;
using ReactTodo.Core.Entities;

namespace ReactTodo.App;

public class TodoTaskDto : ICopyableDto<TodoTask, TodoTaskDto>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }

    public void Copy(TodoTask source, TodoTaskDto targetDto)
    {
        targetDto.Id = source.Id;
        targetDto.Name = source.Name;
        targetDto.IsCompleted = source.IsCompleted;
    }
}
