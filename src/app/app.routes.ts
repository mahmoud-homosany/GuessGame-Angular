import { Routes } from '@angular/router';
import { AuthComponent } from './Components/auth/auth.component';
import { UserComponent } from './Components/user/user.component';
import { RegisterComponent } from './Components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'user', component: UserComponent },
  { path: 'register', component: RegisterComponent }
];
