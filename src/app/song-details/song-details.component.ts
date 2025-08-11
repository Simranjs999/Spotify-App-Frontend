import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Artist, ArtistService } from '../artist.service';
import { SongService } from '../song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateSongDto, UpdateSongDto } from '../song.service';

@Component({
  selector: 'app-song-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './song-details.component.html',
  styleUrl: './song-details.component.css'
})
export class SongDetailsComponent implements OnInit {

  songForm: FormGroup;
  songId: number | null = null;
  artists: Artist[] = [];

  constructor(
    private songService: SongService,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.songForm = this.fb.group({
      title: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      artistId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.artistService.getArtists().subscribe((artists) => {
      this.artists = artists;
    });
    this.songId = +this.route.snapshot.paramMap.get('id')!;
    if (this.songId) {
      this.loadSong();
    }
  }

  loadSong(): void {
    this.songService.getSong(this.songId!).subscribe((song) => {
      this.songForm.patchValue({
        title: song.title,
        duration: song.duration,
        artistId: song.artist.id,
      });
    });
  }

  saveSong(): void {
    if (this.songForm.valid) {
      const formValue = this.songForm.value;

      if (this.songId) {
        // For updates, create UpdateSongDto
        const updateData: UpdateSongDto = {
          title: formValue.title,
          duration: parseInt(formValue.duration),
          artistId: parseInt(formValue.artistId)
        };

        this.songService.updateSong(this.songId, updateData).subscribe({
          next: () => {
            console.log('Song updated successfully');
            this.router.navigate(['/songs']);
          },
          error: (error) => {
            console.error('Update song error:', error);
          }
        });
      } else {
        // For creation, create CreateSongDto
        const createData: CreateSongDto = {
          title: formValue.title,
          duration: parseInt(formValue.duration),
          artistId: parseInt(formValue.artistId)
        };

        this.songService.createSong(createData).subscribe({
          next: () => {
            console.log('Song created successfully');
            this.router.navigate(['/songs']);
          },
          error: (error) => {
            console.error('Create song error:', error);
          }
        });
      }
    } else {
      console.log('Form is invalid:', this.songForm.errors);
    }
  }
}