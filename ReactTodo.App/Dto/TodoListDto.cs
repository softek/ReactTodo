using ReactTodo.App.Dto;
using ReactTodo.Core.Entities;

namespace ReactTodo.App;

public class TodoListDto : ICopyableDto<TodoList, TodoListDto>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public void Copy(TodoList source, TodoListDto targetDto)
    {
        targetDto.Id = source.Id;
        targetDto.Name = source.Name;
    }
}
