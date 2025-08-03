import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
 private apiUrl = 'http://guess-game.runasp.net/api/Auth';
  constructor(private http: HttpClient) {}


 login(loginDto: { Username: string; Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginDto);
  }

  register(registerDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerDto);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
saveUsername(username: string) {
  localStorage.setItem('username', username);
}

getUsername(): string | null {
  return localStorage.getItem('username');
}

}
