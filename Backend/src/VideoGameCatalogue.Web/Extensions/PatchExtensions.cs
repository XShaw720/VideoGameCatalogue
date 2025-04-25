namespace VideoGameCatalogue.Web.Extensions;

public static class PatchExtensions
{
    public static void ApplyIfSupplied<T>(this Optional<T?> optional, Action<T> action)
    {
        if (optional.HasValue)
        {
            action(optional.Value);
        }
    }
}
