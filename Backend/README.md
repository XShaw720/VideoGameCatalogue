# Video Game Catalogue Backend

## Exanding the fields on an entity
- Add fields to the core model (e.g VideoGame)
- Add fields that can be updated to path model (e.g VideoGamePatch)
- Run `./add-ef-migration <migration-name>`

## Creating new entity
- Create a core model that extends EntityBase
- Create a patch model that extends IPatch<your-core-model>
- Add desired queries and mutations utilising the generic CRUD functions
- Run `./add-ef-migration <migration-name>`

## Testing
#### When running the solution in debug a nitro window should open that offers a grapghql request builder. Example requests:
```
mutation{
  addVideoGame(entity: {
    title: "Mario Kart"
    genre: "Racing Game"
    description: "Race your friends while dodging turts!"
  }){
    id
    title
    genre
    description
    createdAt
    updatedAt
    deletedAt
  }
}

query{
    videoGameSet(where: {title: {eq: "Mario Kart"}})
    {
      id
      title
      genre
      description
      createdAt
      updatedAt
      deletedAt
    }
}

mutation{
  updateVideoGame(entity: {
    id: 6
    description: "Race your friends while dodging turts! It's much better on wii."
  }){
    id
    description
  }
}

mutation{
  deleteVideoGame(id: 2)
}
```