import { Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoGameService } from '../video-game.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private destroy$ = new Subject<void>();
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  videoGameService = inject(VideoGameService);

  videoGameId: number;
  form = new FormGroup({
    title: new FormControl(),
    genre: new FormControl(),
    description: new FormControl()
  })

  constructor(){
    this.videoGameId = Number(this.route.snapshot.params['id']);
    if(this.videoGameId){
      this.videoGameService.getVideoGameById(this.videoGameId).pipe(takeUntil(this.destroy$)).subscribe(videoGame => {
        if(!videoGame){
          console.warn('Invalid link, video game not found.')
          this.router.navigate(['/']);
        }
        else{
          this.form.controls['title'].setValue(videoGame.title);
          this.form.controls['genre'].setValue(videoGame.genre);
          this.form.controls['description'].setValue(videoGame.description);
        }
      });
    }
  }

  onSubmit(){
    if(this.videoGameId){
      this.videoGameService.updateVideoGame(
        this.videoGameId,
        this.form.value.title,
        this.form.value.genre,
        this.form.value.description
      ).subscribe(() => this.router.navigate(['/']));
    }
    else{
      this.videoGameService.addVideoGame(
        this.form.value.title,
        this.form.value.genre,
        this.form.value.description
      ).subscribe(() => this.router.navigate(['/']));
    }
  }

  onDelete(){
    this.videoGameService.deleteVideoGame(this.videoGameId).subscribe(() => this.router.navigate(['/']));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
