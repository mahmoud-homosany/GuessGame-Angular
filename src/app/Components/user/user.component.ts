import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [FormsModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
 secretNumber = 0;
  userGuess = 0;
  attempts = 0;
  message = '';
  bestScore: number | null = null;
  userName: string = '';
  cardClass: string = ''; 
  constructor(private http: HttpClient,private router: Router) {}

 ngOnInit(): void {
  this.secretNumber = this.generateRandomNumber();
  this.getBestScore();
  const storedName = localStorage.getItem("userName");
    this.userName = storedName ? storedName : '';
  const token = localStorage.getItem('token');
  if (token) {
    this.userName = this.getUserNameFromToken(token);
  }
}
  generateRandomNumber(): number {
    return Math.floor(Math.random() * 45) + 1;
  }

  checkGuess(): void {
  this.attempts++;

  if (this.userGuess === this.secretNumber) {
    this.message = `✅ Correct! You guessed it in ${this.attempts} attempts.`;
    this.cardClass = 'correct';

    this.updateScore(this.attempts).subscribe({
      next: () => this.getBestScore(),
      error: err => console.error('❌ Error updating score:', err)
    });

    setTimeout(() => {
      this.secretNumber = this.generateRandomNumber();
      this.attempts = 0;
      this.cardClass = '';
      this.message = '';
      this.userGuess = 0;
    }, 1500);

  } else if (this.userGuess < this.secretNumber) {
    this.message = '⬆️ Try a higher number.';
    this.cardClass = 'wrong';

  } else {
    this.message = '⬇️ Try a lower number.';
    this.cardClass = 'wrong';
  }

}
getUserNameFromToken(token: string | null): string {
  if (!token) return '';

  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    const parsed = JSON.parse(decoded);

    return parsed["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || '';
  } catch (e) {
    return '';
  }
}
  getBestScore(): void {
  const token = localStorage.getItem('token');
 const userName = localStorage.getItem('userName'); 

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const body = { userName: userName }; 

  this.http.post<number>('http://guess-game.runasp.net/api/Auth/GetBestScore', body, { headers })
.subscribe({
    next: (res) => this.bestScore = res,
    error: () => this.bestScore = null
  });
}
logout(): void {
  localStorage.removeItem('token');  
  this.router.navigate(['/auth']); 
}
updateScore(score: number): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });


   const body = {
    userName: this.userName, 
    bestScore: score
  };
console.log('Sending score update:', body);
  return this.http.post('http://guess-game.runasp.net/api/Auth/update-score', body, {
    headers: headers
  });
}

}
