#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 MIGRATION_NAME"
    exit 1
fi

migration_name=$1

context_proj_name="VideoGameCatalogue.Core"
startup_proj_name="VideoGameCatalogue.Web"

dotnet ef migrations --project src/$context_proj_name add $migration_name --context Context --startup-project src/$startup_proj_name
dotnet ef database update --project src/$startup_proj_name
