import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { districtModel } from '../models/districtModel';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http:HttpClient) { }

  getallDistrict(): Observable<districtModel[]> {
    const newLocal =  this.http.get<districtModel[]>(`${this.BaseURI}/admin/districts/get-all-districts`);
    return newLocal;
  }
   //Delete
   deleteApp(district_id: number): Observable<districtModel> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delBranch = this.http.delete<districtModel>(`${this.BaseURI}/admin/districts/destroy?district_id=${district_id}`,httpoptions);
    return delBranch;
  }

  //Edit
  UpdateApp(city: districtModel): Observable<districtModel> {
    return this.http.put<districtModel>(`${this.BaseURI}/admin/districts/update`, city);
  }

  //add
  addApp(city: districtModel): Observable<districtModel>{
    return this.http.post<districtModel>(`${this.BaseURI}/admin/districts/store`, city);

  }
}
