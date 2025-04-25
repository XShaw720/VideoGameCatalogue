using System.Runtime.CompilerServices;
using VideoGameCatalogue.Core.Models.Entites;

namespace VideoGameCatalogue.Web.Interfaces;

public interface IPatch<in TEntity> where TEntity : EntityBase
{
    long Id { get; init; }

    void ApplyTo(TEntity entity);
}
