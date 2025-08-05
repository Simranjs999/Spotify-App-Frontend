import { Routes } from '@angular/router';
import { LoginSignupComponent } from './auth/login-signup/login-signup.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    // Default route redirects to the login/signup page
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // Route for login/signup
    { path: 'login', component: LoginSignupComponent },
    // Protected route for the dashboard.
    // The 'canActivate' guard ensures only authenticated users can access this route.
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    // Wildcard route for any other unknown paths, redirects to login
    { path: '**', redirectTo: 'login' }
];
