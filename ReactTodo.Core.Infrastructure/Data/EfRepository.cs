using Ardalis.Specification.EntityFrameworkCore;
using ReactTodo.SharedKernel;

namespace ReactTodo.Core.Infrastructure.Data;

public class EfRepository<T> : RepositoryBase<T>, IReadRepository<T>, IRepository<T> where T : class, IAggregateRoot
{
    public EfRepository(AppDbContext dbContext) : base(dbContext)
    {
    }
}
