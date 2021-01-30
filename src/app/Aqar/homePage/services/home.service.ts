import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { homeModel } from '../models/homeModel';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';

  constructor(private http: HttpClient) { }

  getalldata(): Observable<homeModel> {
    const newLocal = this.http.get<homeModel>(`${this.BaseURI}/admin/home/index`);
    return newLocal;
  }
}
