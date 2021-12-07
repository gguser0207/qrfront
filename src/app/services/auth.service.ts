import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Login, UserNoPW, Businesslogin } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  userNoPW: UserNoPW;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  prepEndpoint(ep) {
    // 1. localhost에 포팅시
    return 'http://localhost:3000/' + ep;

    // 2. Heroku 클라우드 서버에 포팅시
    // return ep;
  }

  registerUser(user): Observable<any> {
    const registerUrl = this.prepEndpoint('users/register');
    return this.http.post(registerUrl, user, httpOptions);
  }

  authenticateUser(login): Observable<any> {
    const loginUrl = this.prepEndpoint('users/authenticate');
    return this.http.post<Login>(loginUrl, login, httpOptions);
  }

  storeUserData(token, userNoPW) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(userNoPW));
    this.authToken = token;
    this.userNoPW = userNoPW;
  }

  getProfile(): Observable<any> {
    this.authToken = localStorage.getItem('id_token');
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    // const profileUrl = 'users/profile';
    const profileUrl = this.prepEndpoint('users/profile');
    return this.http.get(profileUrl, httpOptions1);
  }

  logout() {
    this.authToken = null;
    this.userNoPW = null;
    localStorage.clear();
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired(this.authToken);
  }

  businessUser(businessuser): Observable<any> {
    const BusinessUrl = this.prepEndpoint('businesses/cos');
    return this.http.post(BusinessUrl, businessuser, httpOptions);
  }

  authenticatebusiness(businesslogin): Observable<any> {
    const BloginUrl = this.prepEndpoint('businesses/authenticate');
    return this.http.post<Businesslogin>(BloginUrl, businesslogin, httpOptions);
  }
}
