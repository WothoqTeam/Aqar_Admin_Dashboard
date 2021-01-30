import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { aqarModel } from '../models/aqarModels';

@Injectable({
  providedIn: 'root'
})
export class AqarService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http: HttpClient) { }

getallAqars(aqar_type:number): Observable<aqarModel[]> {
  const newLocal =  this.http.get<aqarModel[]>(`${this.BaseURI}/admin/aqar/get-all-aqars?aqar_type=${aqar_type}`);
  return newLocal;
} 
// Delete
deleteAaqar(aqar_id: number,aqar_type:number=0): Observable<aqarModel> {
  const httpoptions = {headers: new HttpHeaders({
  'Content-Typpe': 'application/json',
   })};
  // tslint:disable-next-line:max-line-length
  const delBranch = this.http.post<aqarModel>(`${this.BaseURI}/admin/aqar/delete?aqar_id=${aqar_id}&aqar_type=${aqar_type}`, httpoptions);
   return delBranch;
     }

// EditLand
UpdateAqar(land: aqarModel): Observable<aqarModel> {
  return this.http.post<aqarModel>(`${this.BaseURI}/admin/aqar/update`, land);
}

//addLand
addLand(land:aqarModel): Observable<aqarModel>{
  return this.http.post<aqarModel>(`${this.BaseURI}/admin/aqar/store`, land);
}

//Details
// tslint:disable-next-line:variable-name
getDetailtById(aqar_id: number,aqar_type: number= 0): Observable<aqarModel> {
 // tslint:disable-next-line:max-line-length
 const newLocal = this.http.get<aqarModel>(`${this.BaseURI}/admin/aqar/get-aqar?aqar_type=${aqar_type}&aqar_id=${aqar_id}`);
 return newLocal;
}
}
