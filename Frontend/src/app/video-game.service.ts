import { Injectable} from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable  } from 'rxjs';
import { VideoGame, VideoGameResponse } from './video-game';

@Injectable({
  providedIn: 'root'
})
export class VideoGameService {

  constructor(private apollo: Apollo) { }

  getAllVideoGames(): Observable<VideoGame[]> {
    return this.apollo.query<VideoGameResponse>({
      query: gql`
        query{
          videoGameSet{
              id
              title
          }
        }
      `,
    }).pipe(map(x => x.data.videoGameSet));
  }

  getVideoGameById(id: number): Observable<VideoGame> {
    return this.apollo.query<VideoGameResponse>({
      query: gql`
        query($id: Long){
          videoGameSet(where: {id: {eq: $id}}){
              id
              title
          }
        }
      `,
      variables: {id: id}
    }).pipe(map(x => x.data.videoGameSet[0]));
  }

  updateVideoGame(id: number, title: string, genre: string){
    const videoGamePatch = {
      id: id,
      title: title,
      genre: genre
    }

    this.apollo.mutate({
      mutation: gql`
        mutation($entity: VideoGamePatchInput!){
          updateVideoGame(entity: $entity){
            id
          }
        }
      `,
      variables: {entity: videoGamePatch}
    }).subscribe({error: x => console.error('failed to update videoGame: ' + x)});
  }

  deleteVideoGame(id: number){
    this.apollo.mutate({
      mutation: gql`
        mutation($id: Long!){
          deleteVideoGame(id: $id)
        }
      `,
      variables: {id: id}
    }).subscribe({error: x => console.error('failed to delete videoGame: ' + x)});
  }
}
