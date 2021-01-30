import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contractorModel } from '../models/contractorModel';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http: HttpClient) { }

getallcontractorModel(): Observable<contractorModel[]> {
  const newLocal =  this.http.get<contractorModel[]>(`${this.BaseURI}/admin/contractors/get-contractors`);
  return newLocal;
} 
  //Delete
  deletecontractorModel(contractor_id: number): Observable<contractorModel> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delBranch = this.http.post<contractorModel>(`${this.BaseURI}/admin/contractors/delete?contractor_id=${contractor_id}`, httpoptions);
    return delBranch;
  }

  //Edit
  UpdatecontractorModel(contractorModel: contractorModel): Observable<contractorModel> {
    return this.http.post<contractorModel>(`${this.BaseURI}/admin/contractors/update`, contractorModel);
  }

  //add
  addcontractorModel(contractorModel: contractorModel): Observable<contractorModel>{
    return this.http.post<contractorModel>(`${this.BaseURI}/admin/contractors/store`, contractorModel);

  }
}
