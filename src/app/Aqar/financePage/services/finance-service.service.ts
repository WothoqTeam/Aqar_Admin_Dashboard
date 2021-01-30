import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Finance } from '../models/financeModel';

@Injectable({
  providedIn: 'root'
})
export class FinanceServiceService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http:HttpClient) { }
  
  getAllfinance(): Observable<Finance[]> {
    const newLocal =  this.http.get<Finance[]>(`${this.BaseURI}/admin/finance/get-all-applications`);
    return newLocal;
  }

  //Delete
  deleteFinance(finance_id: number): Observable<Finance> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delBranch = this.http.post<Finance>(`${this.BaseURI}/admin/finance/delete?finance_id=${finance_id}`,httpoptions);
    return delBranch;
  }
  //Edit
 UpdateApp(finance: Finance ): Observable<Finance> {
  return this.http.post<Finance>(`${this.BaseURI}/admin/finance/update`, finance);
}

//add
addApp(finance: Finance): Observable<Finance>{
  return this.http.post<Finance>(`${this.BaseURI}/admin/finance/store`, finance);

}
//Details
getApptById(finance_id: number): Observable<Finance> {
  const newLocal = this.http.get<Finance>(`${this.BaseURI}/admin/finance/get-application?lang=ar&finance_id=${finance_id}`);
  return newLocal;
}
}

