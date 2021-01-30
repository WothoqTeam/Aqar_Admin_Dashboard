import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Support } from '../models/supportModel';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';
  constructor(private http:HttpClient) { }

  getAllsupport(): Observable<Support[]> {
    const newLocal =  this.http.get<Support[]>(`${this.BaseURI}/admin/contact/get-all-tickets`);
    return newLocal;
  }
}
