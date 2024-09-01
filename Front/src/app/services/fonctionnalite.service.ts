import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fonctionnalite } from '../models/fonctionnalite';

@Injectable({
  providedIn: 'root'
})
export class FonctionnaliteService {

  projetUrl = 'http://localhost:8081/Fonctionnalite/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Fonctionnalite[]>{
    return this.httpClient.get<Fonctionnalite[]>(`${this.projetUrl}`+`list`);
  }

  public getFonctionnaliteById(id: number): Observable<any>{
    return this.httpClient.get<Fonctionnalite>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public create(evenementProjet: Fonctionnalite,userId:string): Observable<any>{
    return this.httpClient.post(`${this.projetUrl}`+`save`+`/${userId}`, evenementProjet, this.HttpOptions);
  }

  public update(id: number, evenementProjet: Fonctionnalite,user:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`+`/${user}`, evenementProjet, this.HttpOptions);
  }

  public delete(id: number,user:string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`+`/${user}`, this.HttpOptions);
  }

  public getFonctionnaliteByIdBacklog(id: number): Observable<Fonctionnalite[]>{
    return this.httpClient.get<Fonctionnalite[]>(`${this.projetUrl}`+`backlogID`+`/${id}`, this.HttpOptions);
  }

  public getFonctionnaliteByIdProjet(id: number): Observable<Fonctionnalite[]>{
    return this.httpClient.get<Fonctionnalite[]>(`${this.projetUrl}`+`projetID`+`/${id}`, this.HttpOptions);
  }
}
