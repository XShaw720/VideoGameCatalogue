using Microsoft.EntityFrameworkCore;
using VideoGameCatalogue.Core;
using VideoGameCatalogue.Core.Models.Entites;

namespace VideoGameCatalogue.Web;

public class Query
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<VideoGame> VideoGameSet(Context context) => context.Set<VideoGame>();
}
