import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtistService, Artist } from '../artist.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artist-details',
  imports: [ReactiveFormsModule],
  templateUrl: './artist-details.component.html',
  styleUrl: './artist-details.component.css'
})
export class ArtistDetailsComponent {
  artistForm: FormGroup;
  artistId: number | null = null;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.artistForm = this.fb.group({
      name: ['', Validators.required],
      biography: [''],
    });
  }

  /**
   * Angular lifecycle hook. On component initialization, retrieves the artist ID from the route.
   * If an ID is present, loads the artist data for editing; otherwise, prepares the form for creation.
   */
  ngOnInit(): void {
    this.artistId = +this.route.snapshot.paramMap.get('id')!;
    if (this.artistId) {
      this.loadArtist();
    }
  }

  /**
   * Fetches artist data from the backend using the artist ID and populates the form for editing.
   */
  loadArtist(): void {
    this.artistService.getArtist(this.artistId!).subscribe((artist) => {
      this.artistForm.patchValue(artist);
    });
  }

  /**
   * Handles form submission. If the form is valid, either creates a new artist or updates an existing one
   * based on the presence of artistId. Navigates back to the artist list after saving.
   */
  saveArtist(): void {
    if (this.artistForm.valid) {
      const artistData = this.artistForm.value;
      if (this.artistId) {
        this.artistService.updateArtist(this.artistId, artistData).subscribe(() => {
          this.router.navigate(['/artists']);
        });
      } else {
        this.artistService.createArtist(artistData).subscribe(() => {
          this.router.navigate(['/artists']);
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

}


