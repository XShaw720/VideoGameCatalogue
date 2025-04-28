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
              genre
              description
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
              genre
              description
          }
        }
      `,
      variables: {id: id}
    }).pipe(map(x => x.data.videoGameSet[0]));
  }

  addVideoGame(title: string, genre: string, description: string): Observable<any> {
    const videoGamePatch = {
      title: title,
      genre: genre,
      description
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation($entity: VideoGameInput!){
          addVideoGame(entity: $entity){
            id
          }
        }
      `,
      variables: {entity: videoGamePatch}
    });
  }

  updateVideoGame(id: number, title: string, genre: string, description: string): Observable<any> {
    const videoGamePatch = {
      id: id,
      title: title,
      genre: genre,
      description
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation($entity: VideoGamePatchInput!){
          updateVideoGame(entity: $entity){
            id
          }
        }
      `,
      variables: {entity: videoGamePatch}
    });
  }

  deleteVideoGame(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation($id: Long!){
          deleteVideoGame(id: $id)
        }
      `,
      variables: {id: id}
    });
  }
}
