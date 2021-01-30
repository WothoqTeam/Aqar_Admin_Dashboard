import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/companyModel';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http:HttpClient) { }

  getallcompany(): Observable<Company[]> {
    const newLocal =  this.http.get<Company[]>(`${this.BaseURI}/admin/companies/get-companies`);
    return newLocal;
  } 

  //Delete
  deleteCompany(company_id: number): Observable<Company> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delBranch = this.http.post<Company>(`${this.BaseURI}/admin/companies/delete?company_id=${company_id}`,httpoptions);
    return delBranch;
  }

  //Edit
  UpdateCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.BaseURI}/admin/companies/update`, company);
  }

  //add
  addFinance(company:Company):Observable<Company>{
    return this.http.post<Company>(`${this.BaseURI}/admin/companies/store`, company);

  }
  
}
