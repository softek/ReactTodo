using ReactTodo.Core.Entities;

namespace ReactTodo.App;

public static class TodoTaskConversionExtensions
{
    public static TodoTaskDto ToTodoTaskDto(this TodoTask entity) =>
        entity.ToDto<TodoTask, TodoTaskDto>();
}
