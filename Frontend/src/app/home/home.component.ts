import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoGameComponent } from '../video-game/video-game.component';
import { VideoGameService } from '../video-game.service';
import { VideoGame } from '../video-game';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [VideoGameComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private destroy$ = new Subject<void>();
  videoGameService: VideoGameService = inject(VideoGameService);
  videoGames: VideoGame[] = [];
  filteredVideoGames: VideoGame[] = [];

  constructor(){
    this.videoGameService.getAllVideoGames().pipe(takeUntil(this.destroy$)).subscribe((videoGames: VideoGame[]) => {
      this.videoGames = videoGames;
      this.filteredVideoGames = videoGames;
    });
  }

  filterResults(text: string){
    if(!text) this.filteredVideoGames = this.videoGames;
    this.filteredVideoGames = this.videoGames.filter(videoGame => videoGame.title?.toLowerCase().includes(text.toLowerCase()));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
