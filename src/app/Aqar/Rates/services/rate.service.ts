import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rates } from '../models/rateModel';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  readonly BaseURI = 'https://aqar.wothoq.co/api';

  constructor(private http:HttpClient) { }

  getallRates(): Observable<Rates[]> {
    const newLocal =  this.http.get<Rates[]>(`${this.BaseURI}/admin/rates/get-all-rates`);
    return newLocal;
  } 
  //Delete
  deleteRates(rate_id: number): Observable<Rates> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delBranch = this.http.post<Rates>(`${this.BaseURI}/admin/rates/delete?rate_id=${rate_id}`,httpoptions);
    return delBranch;
  }
  //Details
getDetailtById( rate_id: number): Observable<Rates> {
  const newLocal = this.http.get<Rates>(`${this.BaseURI}/admin/rates/get-rate?lang=ar&rate_id=${rate_id}`);
  return newLocal;
}
}
