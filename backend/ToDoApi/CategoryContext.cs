using Microsoft.EntityFrameworkCore;
namespace ToDoApi
{
    public class CategoryContext : DbContext
    {
        public CategoryContext(DbContextOptions<CategoryContext> options) : base(options) { }
        public DbSet<Category> Categories { get; set; }

    }
}