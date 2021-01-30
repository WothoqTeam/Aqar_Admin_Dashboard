import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cityModels } from '../models/cityModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http:HttpClient) { }

  getallCities(): Observable<cityModels[]> {
    const newLocal =  this.http.get<cityModels[]>(`${this.BaseURI}/admin/cities/get-all-cities`);
    return newLocal;
  }
   //Delete
   deleteApp(city_id: number): Observable<cityModels> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delBranch = this.http.delete<cityModels>(`${this.BaseURI}/admin/cities/destroy?city_id=${city_id}`,httpoptions);
    return delBranch;
  }

  //Edit
  UpdateApp(city: cityModels): Observable<cityModels> {
    return this.http.put<cityModels>(`${this.BaseURI}/admin/cities/update`, city);
  }

  //add
  addApp(city: cityModels): Observable<cityModels>{
    return this.http.post<cityModels>(`${this.BaseURI}/admin/cities/store`, city);

  }
}
