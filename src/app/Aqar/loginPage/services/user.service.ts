import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const NAME_KEY = 'auth-name';
const ID_KEY = 'auth-id';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  public saveUserName(user) {
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, JSON.stringify(user));
  }

  public getUserName()  {
    return JSON.parse(sessionStorage.getItem(NAME_KEY));
  }
  public saveUserId(user) {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, JSON.stringify(user));
  }

  public getUserId()  {
    return JSON.parse(sessionStorage.getItem(ID_KEY));
  }
}
