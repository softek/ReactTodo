using Ardalis.Specification;

namespace ReactTodo.Core.Entities.Specifications;
public sealed class FullTodoListByIdSpec : SingleResultSpecification<TodoList>
{
    public FullTodoListByIdSpec(Guid id) =>
        Query.Where(x => x.Id == id)
            .Include(x => x.Tasks);
}
