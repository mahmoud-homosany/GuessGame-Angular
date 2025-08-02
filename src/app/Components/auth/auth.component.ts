import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthserviceService } from '../../../Services/authservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [ 
   NgFor,CommonModule,RouterLink,FormsModule
    ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
 loginDto = {
    Username: '',
    Password: ''
  };

  errorMessage = '';

  constructor(private authService: AuthserviceService, private router: Router) {}

login() {
  this.authService.login(this.loginDto).subscribe((response: any) => {
    const token = response.token;
    localStorage.setItem("token", token);

    const userName = this.getUserNameFromToken(token);
    localStorage.setItem("userName", userName);

    this.router.navigate(['/user']);
  });
}

getUserNameFromToken(token: string): string {
  const payload = token.split('.')[1];
  const decodedPayload = atob(payload);
  const payloadObject = JSON.parse(decodedPayload);
  console.log(payloadObject);
  return payloadObject["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
}
}
