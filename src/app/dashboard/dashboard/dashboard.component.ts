import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService) { }
  // Calls the logout method from the authentication service.
  onLogout() {
    this.authService.logout();
  }
}
