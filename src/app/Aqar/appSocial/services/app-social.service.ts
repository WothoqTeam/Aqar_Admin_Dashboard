import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appSocial } from '../models/appSocialModel';

@Injectable({
  providedIn: 'root'
})
export class AppSocialService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http:HttpClient) { }

  getallApps(): Observable<appSocial[]> {
    const newLocal =  this.http.get<appSocial[]>(`${this.BaseURI}/admin/social/get-app-social`);
    return newLocal;
  }

  //Delete
  deleteApp(social_id: number): Observable<appSocial> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delBranch = this.http.post<appSocial>(`${this.BaseURI}/admin/social/delete?social_id=${social_id}`,httpoptions);
    return delBranch;
  }

  //Edit
  UpdateApp(social: appSocial): Observable<appSocial> {
    return this.http.post<appSocial>(`${this.BaseURI}/admin/social/update`, social);
  }

  //add
  addApp(social: appSocial): Observable<appSocial>{
    return this.http.post<appSocial>(`${this.BaseURI}/admin/social/store`, social);

  }
}
