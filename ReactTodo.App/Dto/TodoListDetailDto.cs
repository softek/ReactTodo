using ReactTodo.App.Dto;
using ReactTodo.Core.Entities;

namespace ReactTodo.App;

public class TodoListDetailDto : ICopyableDto<TodoList, TodoListDetailDto>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public IEnumerable<TodoTaskDto> Tasks { get; set; }

    public void Copy(TodoList source, TodoListDetailDto targetDto)
    {
        targetDto.Id = source.Id;
        targetDto.Name = source.Name;
        targetDto.Tasks = source.Tasks.Select(x => x.ToTodoTaskDto()).ToList();
    }
}
