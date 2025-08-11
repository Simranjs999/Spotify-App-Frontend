import { Routes } from '@angular/router';
import { LoginSignupComponent } from './auth/login-signup/login-signup.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongDetailsComponent } from './song-details/song-details.component';

export const routes: Routes = [
    { path: 'login-signup', component: LoginSignupComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'artists', component: ArtistListComponent, canActivate: [AuthGuard] },
    { path: 'artists/create', component: ArtistDetailsComponent, canActivate: [AuthGuard] },
    { path: 'artists/:id', component: ArtistDetailsComponent, canActivate: [AuthGuard] },
    { path: 'songs', component: SongListComponent, canActivate: [AuthGuard] },
    { path: 'songs/create', component: SongDetailsComponent, canActivate: [AuthGuard] },
    { path: 'songs/:id', component: SongDetailsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login-signup', pathMatch: 'full' },
    { path: '**', redirectTo: '/login-signup' }
];