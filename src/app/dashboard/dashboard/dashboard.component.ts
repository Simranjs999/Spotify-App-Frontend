import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
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
