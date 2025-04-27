import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal} from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VideoGameService } from '../video-game.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoGame } from '../video-game';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  videoGameService = inject(VideoGameService);

  // videoGame: Signal<VideoGame>;
  videoGame: WritableSignal<VideoGame> = signal({} as VideoGame);

  form = new FormGroup({
    title: new FormControl(),
    genre: new FormControl()
  })

  constructor(){
    const videoGameId = Number(this.route.snapshot.params['id']);
    // this.videoGame = toSignal(this.videoGameService.getVideoGameById(videoGameId), {initialValue: {} as VideoGame});
    this.videoGameService.getVideoGameById(videoGameId).subscribe(videoGame => this.videoGame.set(videoGame));
  }

  onSubmit(){
    this.videoGameService.updateVideoGame(this.videoGame());
  }

  onDelete(){
    this.videoGameService.deleteVideoGame(this.videoGame().id);
  }

  updateTitle(newVal: string){
    this.videoGame.update(prevVal => ({...prevVal, title: newVal}));
  }
}
