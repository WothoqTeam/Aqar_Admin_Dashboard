import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';

  constructor(private http: HttpClient) { }

  getalluser(): Observable<User[]> {
    const newLocal = this.http.get<User[]>(`${this.BaseURI}/admin/users/get-all-users`);
    return newLocal;
  }
  //Delete
  deleteUser(user_id: number): Observable<User> {
    const httpoptions = {
      headers: new HttpHeaders({
        'Content-Typpe': 'application/json',
      })
    };
    const delBranch = this.http.post<User>(`${this.BaseURI}/admin/users/delete?user_id=${user_id}`, httpoptions);
    return delBranch;
  }
  //Edit
  UpdateUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.BaseURI}/admin/users/update `, user);
  }

  //add
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.BaseURI}/admin/users/store`, user);

  }
  //Details
  getDetailtById(user_id: number): Observable<User> {
    const newLocal = this.http.get<User>(`${this.BaseURI}/admin/users/get-user?lang=ar&user_id=${user_id}`);
    return newLocal;
  }

  updateStatus( user: User): Observable<User> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    return this.http.post<User>(`${this.BaseURI}/admin/users/update?lang=en`, user, httpoptions);
  }
}
