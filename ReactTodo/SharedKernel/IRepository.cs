using Ardalis.Specification;

namespace ReactTodo.SharedKernel;

public interface IRepository<T> : IRepositoryBase<T> where T : class, IAggregateRoot
{
}
