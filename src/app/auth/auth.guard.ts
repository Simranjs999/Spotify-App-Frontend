import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * AuthGuard protects routes from unauthorized access.
 * It checks the user's authentication status using AuthService.
 * If the user is not authenticated, it redirects to the login page.
 */
@Injectable({
  providedIn: 'root' // Makes the guard available app-wide as a singleton
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Determines if a route can be activated.
   * - Subscribes to AuthService's isAuthenticated$ observable.
   * - If authenticated, allows access.
   * - If not, redirects to login page.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated$.pipe(
      take(1), // Only take the latest authentication status
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true; // Allow route activation
        } else {
          // Redirect to login/home page if not authenticated
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}