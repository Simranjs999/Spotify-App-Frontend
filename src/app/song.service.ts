import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateSongDto {
  title: string;
  duration: number;
  artistId: number;
}

export interface UpdateSongDto {
  title?: string;
  duration?: number;
  artistId?: number;
}

export interface Song {
  id: number;
  title: string;
  duration: number;
  artist: {
    id: number;
    name: string;
    biography?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrl}/songs`);
  }

  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/songs/${id}`);
  }

  createSong(song: CreateSongDto): Observable<Song> {
    return this.http.post<Song>(`${this.apiUrl}/songs`, song);
  }

  updateSong(id: number, song: UpdateSongDto): Observable<Song> {
    return this.http.put<Song>(`${this.apiUrl}/songs/${id}`, song);
  }

  deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/songs/${id}`);
  }
}


