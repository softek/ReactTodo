using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ReactTodo.Core.Infrastructure.Data;
using ReactTodo.SharedKernel;

namespace ReactTodo.Core.Infrastructure;
public static class StartupSetup
{
    public static void AddApplicationDbContext(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(connectionString));

        services.AddTransient(typeof(IRepository<>), typeof(EfRepository<>));
    }
}
