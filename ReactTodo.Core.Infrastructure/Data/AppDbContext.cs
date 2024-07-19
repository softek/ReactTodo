using Microsoft.EntityFrameworkCore;
using ReactTodo.Core.Entities;

namespace ReactTodo.Core.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
        optionsBuilder.UseSqlite("Data Source=C:\\temp\\todo.db;");

    public DbSet<TodoList> TodoLists => Set<TodoList>();
}
