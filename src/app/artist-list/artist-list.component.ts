import { Component, OnInit } from '@angular/core';
import { Artist, ArtistService } from '../artist.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-list',
  imports: [CommonModule],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css'
})
export class ArtistListComponent implements OnInit {

  artists: Artist[] = [];

  constructor(private artistService: ArtistService, private router: Router) { }

  // Lifecycle hook to load data.
  ngOnInit(): void {
    this.loadArtists();
  }

  // Method to fetch data and subscribe.
  loadArtists(): void {
    this.artistService.getArtists().subscribe((artists) => {
      this.artists = artists;
    });
  }

  // Navigation to view details.
  viewArtist(id: number): void {
    this.router.navigate(['/artists', id]);
  }

  // Navigation to create form.
  createArtist(): void {
    this.router.navigate(['/artists/create']);
  }

  // Delete and reload list.
  deleteArtist(id: number): void {
    this.artistService.deleteArtist(id).subscribe(() => {
      this.loadArtists();
    });
  }

}
