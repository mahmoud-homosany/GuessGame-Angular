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
};

errorMessage = '';

constructor(private authService: AuthserviceService, private router: Router) {}


register() {
  const password = this.registerDto.password;

  const hasCapital = /[A-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!this.registerDto.userName || !password) {
    this.errorMessage = "Please fill in all fields.";
    return;
  }

  if (!hasCapital) {
    this.errorMessage = "Password must contain at least one uppercase letter.";
    return;
  }

  if (!hasSymbol) {
    this.errorMessage = "Password must contain at least one special character (e.g., #, @, !).";
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
