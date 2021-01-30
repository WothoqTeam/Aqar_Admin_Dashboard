import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offers } from '../models/offersModel';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  readonly BaseURI = 'https://aqar.wothoq.co/api';

  constructor(private http:HttpClient) { }

  getalloffer(): Observable<Offers[]> {
    const newLocal =  this.http.get<Offers[]>(`${this.BaseURI}/admin/offers/get-all-offers`);
    return newLocal;
  } 
  //Delete
  deleteOffer(offer_id: number): Observable<Offers> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delBranch = this.http.post<Offers>(`${this.BaseURI}/admin/offers/delete?offer_id=${offer_id}`,httpoptions);
    return delBranch;
  }
 //Edit
 UpdateOffer(offer: Offers): Observable<Offers> {
    return this.http.post<Offers>(`${this.BaseURI}/admin/offers/update `, offer);
  }

  //add
  addOffers(offer:Offers):Observable<Offers>{
    return this.http.post<Offers>(`${this.BaseURI}/admin/offers/store`, offer);

  }
}
