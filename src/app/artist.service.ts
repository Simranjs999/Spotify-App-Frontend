import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Artist {
  id: number;
  name: string;
  biography?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private apiUrl = `${environment.apiUrl}/artists`;

  constructor(private http: HttpClient) { }

  // Private method to create headers with JWT token.
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Method to create an artist, returns Observable.
  createArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl, artist, { headers: this.getHeaders() });
  }

  // Method to get all artists.
  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Method to get a single artist by ID.
  getArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Method to update an artist.
  updateArtist(id: number, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/${id}`, artist, { headers: this.getHeaders() });
  }

  // Method to delete an artist.
  deleteArtist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
