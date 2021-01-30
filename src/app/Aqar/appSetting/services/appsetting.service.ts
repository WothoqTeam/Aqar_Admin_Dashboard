import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSetting } from '../models/appSettingModel';

@Injectable({
  providedIn: 'root'
})
export class AppsettingService {

  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http:HttpClient) { }

  getallApps(): Observable<AppSetting[]> {
    const newLocal =  this.http.get<AppSetting[]>(`${this.BaseURI}/admin/setting/get-app-setting`);
    return newLocal;
  }

  //Delete
  deleteApp(setting_id: number): Observable<AppSetting> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delBranch = this.http.post<AppSetting>(`${this.BaseURI}/admin/setting/delete?setting_id=${setting_id}`,httpoptions);
    return delBranch;
  }

  //Edit
  UpdateApp(setting: AppSetting): Observable<AppSetting> {
    return this.http.post<AppSetting>(`${this.BaseURI}/admin/setting/update`, setting);
  }

  //add
  addApp(setting: AppSetting): Observable<AppSetting>{
    return this.http.post<AppSetting>(`${this.BaseURI}/admin/setting/store`, setting);

  }
}
