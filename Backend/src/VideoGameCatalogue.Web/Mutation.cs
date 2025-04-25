using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using VideoGameCatalogue.Core;
using VideoGameCatalogue.Core.Models.Entites;
using VideoGameCatalogue.Web.Interfaces;
using VideoGameCatalogue.Web.Models.Patch;

namespace VideoGameCatalogue.Web;

public class Mutation
{
    public Task<VideoGame> AddVideoGame(VideoGame entity, Context context, CancellationToken ct) => Add(entity, context, ct);
    public Task<VideoGame> UpdateVideoGame(VideoGamePatch entity, Context context, CancellationToken ct) => Update(entity, context, ct);
    public Task<bool> DeleteVideoGame(long id, Context context, CancellationToken ct) => Delete<VideoGame>(id, context, ct);

    private static async Task<T> Add<T>(T entity, Context context, CancellationToken ct) where T : EntityBase, new()
    {
        entity.OnCreate();
        await context.AddAsync(entity, ct);
        await context.SaveChangesAsync(ct);
        return entity;
    }

    private static async Task<T> Update<T>(IPatch<T> patch, Context context, CancellationToken ct)
    where T : EntityBase
    {
        var existing = await context.Set<T>().SingleAsync(x => x.Id == patch.Id, ct);
        patch.ApplyTo(existing);
        existing.OnUpdate();
        await context.SaveChangesAsync(ct);
        return existing;
    }
    private static async Task<bool> Delete<T>(long id, Context context, CancellationToken ct) where T : EntityBase
    {
        var entity = await context.Set<T>().SingleAsync(x => x.Id == id, ct);
        entity.OnDelete();
        return await context.SaveChangesAsync(ct) > 0;
    }
}
