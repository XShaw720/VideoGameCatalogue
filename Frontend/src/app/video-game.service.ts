import { Injectable} from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { catchError, map, Observable  } from 'rxjs';
import { VideoGameDto, VideoGameResponse } from './video-game-dto';
import { VideoGame } from './video-game';

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
    }).pipe(map(x => x.data.videoGameSet.map(x => this.videoGameDtoToDomain(x))));
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
    }).pipe(map(x => this.videoGameDtoToDomain(x.data.videoGameSet[0])));
  }

  updateVideoGame(videoGame: VideoGame){
    this.apollo.mutate({
      mutation: gql`
        mutation($entity: VideoGamePatchInput!){
          updateVideoGame(entity: $entity){
            id
          }
        }
      `,
      variables: {entity: videoGame}
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

  videoGameDtoToDomain(dto: VideoGameDto): VideoGame{
    return new VideoGame(
      +dto.id,
      dto.title
    );
  }
}
