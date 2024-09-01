import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvenementProjet } from '../models/evenement-projet';

@Injectable({
  providedIn: 'root'
})
export class EvenementProjetService {

  projetUrl = 'http://localhost:8081/EvenementProjet/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<EvenementProjet[]>{
    return this.httpClient.get<EvenementProjet[]>(`${this.projetUrl}`+`list`);
  }

  public getEvenementProjetById(id: number): Observable<any>{
    return this.httpClient.get<EvenementProjet>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public create(evenementProjet: EvenementProjet,userId:string): Observable<any>{
    return this.httpClient.post(`${this.projetUrl}`+`save`+`/${userId}`, evenementProjet, this.HttpOptions);
  }

  public update(id: number, evenementProjet: EvenementProjet,user:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`+`/${user}`, evenementProjet, this.HttpOptions);
  }

  public delete(id: number,user:string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`+`/${user}`, this.HttpOptions);
  }

  public getEvenementProjetByIdProjet(id: number): Observable<EvenementProjet[]>{
    return this.httpClient.get<EvenementProjet[]>(`${this.projetUrl}`+`projetID`+`/${id}`, this.HttpOptions);
  }
}
