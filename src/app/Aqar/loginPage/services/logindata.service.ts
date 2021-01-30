import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Userinfo } from '../models/userinfo';


@Injectable({
  providedIn: 'root'
})
export class LogindataService {
  userinfo:Userinfo=new Userinfo();
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  userAuth(userinfo) {

    var data = { email: userinfo.email, password: userinfo.password };

    return this.http.post('https://aqar.wothoq.co/api/admin/auth/login', data);
  }
  // tslint:disable-next-line:typedef
  


  login(token) {
    localStorage.setItem('usertoken', token);
    console.log(token);
  }
  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('username');
  }
}
