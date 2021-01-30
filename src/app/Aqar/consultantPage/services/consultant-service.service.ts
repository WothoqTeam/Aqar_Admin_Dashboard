import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultant } from '../models/consultant';

@Injectable({
  providedIn: 'root'
})
export class ConsultantServiceService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http: HttpClient) { }

getallconsultant(): Observable<Consultant[]> {
  const newLocal =  this.http.get<Consultant[]>(`${this.BaseURI}/admin/consultants/get-consultants`);
  return newLocal;
} 
  //Delete
  deleteConsultant(consultant_id: number): Observable<Consultant> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delBranch = this.http.post<Consultant>(`${this.BaseURI}/admin/consultants/delete?consultant_id=${consultant_id}`, httpoptions);
    return delBranch;
  }

  //Edit
  UpdateConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.post<Consultant>(`${this.BaseURI}/admin/consultants/update`, consultant);
  }

  //add
  addConsultant(consultant: Consultant): Observable<Consultant>{
    return this.http.post<Consultant>(`${this.BaseURI}/admin/consultants/store`, consultant);

  }

  //Details
  getConsultantById(consultant_id:number): Observable<Consultant> {
    const newLocal = this.http.get<Consultant>(`${this.BaseURI}/admin/consultants/get-consultant?lang=ar&consultant_id=${consultant_id}`);
    return newLocal;
  }
}
