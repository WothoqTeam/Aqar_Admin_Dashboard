import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { aqarReport } from '../models/aqarReport';

@Injectable({
  providedIn: 'root'
})
export class AqarReportService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http: HttpClient) { }

  getallApps( aqar_type: number): Observable<aqarReport[]> {
    const newLocal =  this.http.get<aqarReport[]>(`${this.BaseURI}/admin/aqar-report/get-all-aqars?aqar_type=${aqar_type}`);
    return newLocal;
  }

// Delete
  deleteAaqar(aqar_id: number,aqar_type:number): Observable<aqarReport> {
    const httpoptions = {headers: new HttpHeaders({
    'Content-Typpe': 'application/json',
     })};
    // tslint:disable-next-line:max-line-length
    const delBranch = this.http.post<aqarReport>(`${this.BaseURI}/admin/aqar-report/delete?aqar_id=${aqar_id}&aqar_type=${aqar_type}`, httpoptions);
     return delBranch;
       }

// EditLand
  UpdateAqar(land: aqarReport): Observable<aqarReport> {
     return this.http.post<aqarReport>(`${this.BaseURI}/admin/aqar-report/update`, land);
   }

//addLand
  addLand(land:aqarReport ): Observable<aqarReport>{
     return this.http.post<aqarReport>(`${this.BaseURI}/admin/aqar-report/store`, land);
 }
  //Details
  // tslint:disable-next-line:variable-name
  getDetailtById(aqar_id: number,aqar_type: number= 0): Observable<aqarReport> {
    // tslint:disable-next-line:max-line-length
    const newLocal = this.http.get<aqarReport>(`${this.BaseURI}/admin/aqar-report/get-aqar?lang=ar&aqar_id=${aqar_id}&aqar_type=${aqar_type}`);
    return newLocal;
  }
  getDetailtByIdAqar(aqar_id: number,aqar_type: number= 1||2||3): Observable<aqarReport> {
    // tslint:disable-next-line:max-line-length
    const newLocal = this.http.get<aqarReport>(`${this.BaseURI}/admin/aqar-report/get-aqar?lang=ar&aqar_id=${aqar_id}&aqar_type=${aqar_type}`);
    return newLocal;
  }

}
