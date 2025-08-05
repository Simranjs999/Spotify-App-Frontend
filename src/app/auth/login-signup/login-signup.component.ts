import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
  isLoginMode = true;
  email = '';
  password = '';
  message = { type: '', text: '' };

  constructor(private authService: AuthService) { }

  // Toggles between login and signup forms
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = { type: '', text: '' }; // Clear messages on mode switch
  }

  // Handles form submission (login or signup)
  onSubmit() {
    if (this.isLoginMode) {
      // Login logic
      this.authService.login(this.email, this.password).subscribe({
        next: () => {
          this.message = { type: 'success', text: 'Login successful!' };
          // Redirection is handled by the authService
        },
        error: (error) => {
          this.message = { type: 'error', text: error.message || 'Login failed.' };
        }
      });
    } else {
      // Signup logic
      this.authService.signup(this.email, this.password).subscribe({
        next: (response) => {
          this.message = { type: 'success', text: response.message || 'Signup successful! You can now log in.' };
          // After showing success, switch to login mode and clear fields after 1.5s
          setTimeout(() => {
            this.isLoginMode = true;
            this.message = { type: '', text: '' };
            this.email = '';
            this.password = '';
          }, 1500);
        },
        error: (error) => {
          this.message = { type: 'error', text: error.message || 'Signup failed.' };
        }
      });
    }
  }
}
