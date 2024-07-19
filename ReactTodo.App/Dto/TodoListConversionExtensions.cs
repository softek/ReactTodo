using ReactTodo.Core.Entities;

namespace ReactTodo.App;

public static class TodoListConversionExtensions
{
    public static TodoListDto ToTodoListDto(this TodoList entity) =>
        entity.ToDto<TodoList, TodoListDto>();
}
