using VideoGameCatalogue.Core.Models.Entites;
using VideoGameCatalogue.Web.Extensions;
using VideoGameCatalogue.Web.Interfaces;

namespace VideoGameCatalogue.Web.Models.Patch;

public class VideoGamePatch : IPatch<VideoGame>
{
    public long Id { get; init; }

    public Optional<string?> Title { get; init; }

    public void ApplyTo(VideoGame videoGame)
    {
        Title.ApplyIfSupplied(x => videoGame.Title = x);
    }
}
