import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = environment.baseUrl;

  // logoutButton = new Subject();
  // logoutButton$ = this.logoutButton.asObservable();

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;

  constructor(private http: HttpClient) { }

  login(username: String, password: String) {

    // let options = { headers: {authorization: this.createBasicAuthToken(username, password)} };


    // return this.http.get("/api/v1/basicauth",options).pipe(map((res) => {
    //     this.username = username;
    //     this.password = password;
    //     this.registerSuccessfulLogin(username, password);
    //   }));


    let options = { headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.createBasicAuthToken(username, password)) };

    return this.http.get(this.baseUrl + 'api/v1/basicauth',options).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }

}
