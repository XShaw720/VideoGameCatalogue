using Microsoft.EntityFrameworkCore;
using VideoGameCatalogue.Core.Models.Entites;

namespace VideoGameCatalogue.Core;

public class Context(DbContextOptions<Context> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<VideoGame>().HasQueryFilter(x => x.DeletedAt == null);
    }
}
