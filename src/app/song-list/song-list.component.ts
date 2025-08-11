import { Component } from '@angular/core';
import { Song, SongService } from '../song.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-list',
  imports: [CommonModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {
  songs: Song[] = [];

  constructor(private songService: SongService, private router: Router) { }

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.songService.getSongs().subscribe((songs) => {
      this.songs = songs;
    });
  }

  viewSong(id: number): void {
    this.router.navigate(['/songs', id]);
  }

  createSong(): void {
    this.router.navigate(['/songs/create']);
  }

  deleteSong(id: number): void {
    this.songService.deleteSong(id).subscribe(() => {
      this.loadSongs();
    });
  }
}
