import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  selectedUser: User = {
    email: '',
    phone: '',
    passowrd: '',
    candidates: [],
  };
  constructor(private http: HttpClient) {}

  registerUser = (user: User) => {
    return this.http.post(`${environment.apiBaseUrl}/signup`, user);
  };

  loginUser = (user: User) => {
    console.log(user);
    return this.http.post(`${environment.apiBaseUrl}/signin`, user);
  };

  setToken = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  logoutUser = () => {
    return this.http.get(`${environment.apiBaseUrl}/signout`);
  };

  deleteToken = () => {
    localStorage.removeItem('user');
  };

  getUserPayload = () => {
    var user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  };

  getUserId = () => {
    var userPayload = this.getUserPayload();
    return userPayload.user._id;
  };

  isLoggedIn = () => {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return true;
    } else {
      return false;
    }
  };
}
