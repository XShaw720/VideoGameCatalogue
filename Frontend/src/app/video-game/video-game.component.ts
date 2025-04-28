import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoGame } from '../video-game';

@Component({
  selector: 'app-video-game',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './video-game.component.html',
  styleUrl: './video-game.component.scss'
})
export class VideoGameComponent {
  @Input () videoGame!: VideoGame;
}
