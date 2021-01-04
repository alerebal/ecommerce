import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { newUserUrl, logInUrl, getUserUrl } from 'src/app/config/api';
import { User } from 'src/app/interfaces/User';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  newUser(user: User): Observable<User> {
    return this.http.post<User>(newUserUrl, user)
  }

  logIn(user: User): Observable<User> {
    return this.http.post<User>(logInUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  loggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${getUserUrl}/${id}`);
  }

}
