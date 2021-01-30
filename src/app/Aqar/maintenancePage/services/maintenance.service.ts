import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/maintenanceModel';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  readonly BaseURI = 'https://aqar.wothoq.co/api';

  constructor(private http: HttpClient) { }

  getallrequest(): Observable<Maintenance[]> {
    const newLocal = this.http.get<Maintenance[]>(`${this.BaseURI}/admin/maintenance/get-all-maintenance`);
    return newLocal;
  }
  //Delete
  deleteRequest(maintenance_id: number): Observable<Maintenance> {
    const httpoptions = {
      headers: new HttpHeaders({
        'Content-Typpe': 'application/json',
      })
    };
    const delBranch = this.http.post<Maintenance>(`${this.BaseURI}/admin/maintenance/delete?maintenance_id=${maintenance_id}`, httpoptions);
    return delBranch;
  }
  //Edit
  UpdateRequest(maintenance: Maintenance): Observable<Maintenance> {
    return this.http.post<Maintenance>(`${this.BaseURI}/admin/maintenance/update `, maintenance);
  }

  //add
  addRequest(maintenance: Maintenance): Observable<Maintenance> {
    return this.http.post<Maintenance>(`${this.BaseURI}/admin/maintenance/store`, maintenance);

  }
  //Details
  // tslint:disable-next-line:variable-name
  getDetailtById(maintenance_id: number): Observable<Maintenance> {
    // tslint:disable-next-line:max-line-length
    const newLocal = this.http.get<Maintenance>(`${this.BaseURI}/admin/maintenance/get-maintenance?lang=ar&maintenance_id=${maintenance_id}`);
    return newLocal;
  }
}
