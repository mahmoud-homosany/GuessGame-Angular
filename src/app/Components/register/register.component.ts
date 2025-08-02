import { Component } from '@angular/core';
import { AuthserviceService } from '../../../Services/authservice.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
registerDto = {
  userName: '',
  password: '',
  confirmPassword: ''
};

errorMessage = '';

constructor(private authService: AuthserviceService, private router: Router) {}

register() {
  if (this.registerDto.password !== this.registerDto.confirmPassword) {
    this.errorMessage = "Passwords do not match.";
    return;
  }

  this.authService.register(this.registerDto).subscribe({
    next: res => {
      this.router.navigate(['/auth']); 
    },
    error: err => {
      this.errorMessage = 'Registration failed.';
    }
  });
}
}
