﻿using HotChocolate;
using HotChocolate.Types;

namespace VideoGameCatalogue.Core.Models.Entites;

public abstract class EntityBase
{
    private protected EntityBase() { }

    [GraphQLType(typeof(IdType))]
    public long Id { get; private protected set; }

    public DateTime? CreatedAt { get; protected set; }
    public DateTime? UpdatedAt { get; protected set; }
    public DateTime? DeletedAt { get; protected set; }

    public void OnCreate()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public void OnUpdate()
    {
        UpdatedAt = DateTime.UtcNow;
    }

    public void OnDelete()
    {
        DeletedAt = DateTime.UtcNow;
    }
}
