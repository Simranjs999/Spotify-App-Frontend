import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'; // Import environment for API URL

// Interface for login response containing JWT token
interface AuthResponse {
  token: string;
}

// Interface for signup response containing a message
interface MessageResponse {
  message: string;
}

/**
 * AuthService handles all authentication-related operations:
 * - User login and signup
 * - Token management
 * - Authentication status tracking
 * - Logout functionality
 */
@Injectable({
  providedIn: 'root' // Makes the service available app-wide as a singleton
})
export class AuthService {
  // BehaviorSubject to track authentication status (true/false)
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  // Observable for components to subscribe to authentication status
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Base URL for backend API, imported from environment.ts for flexibility
  private apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient, private router: Router) {
    // Check authentication status on service initialization
    this.checkAuthStatus();
  }

  /**
   * Checks if a JWT token exists in local storage and updates authentication status.
   */
  private checkAuthStatus() {
    const token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token);
  }

  /**
   * Sends login request to backend and handles authentication.
   * On success, stores token and updates authentication status.
   * Navigates to dashboard.
   */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error.error || { message: 'Login failed. Please try again.' });
      })
    );
  }

  /**
   * Sends signup request to backend.
   * Handles errors such as email already in use.
   */
  signup(email: string, password: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/signup`, { email, password }).pipe(
      catchError(error => {
        console.error('Signup failed:', error);
        return throwError(() => error.error || { message: 'Signup failed. Please try again.' });
      })
    );
  }

  /**
   * Retrieves JWT token from local storage.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Logs out the user by removing token and updating authentication status.
   * Navigates to home/login page.
   */
  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }
}