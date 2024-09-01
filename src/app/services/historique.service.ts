import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historique } from '../models/historique';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  projetUrl = 'http://localhost:8081/Historique/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Historique[]>{
    return this.httpClient.get<Historique[]>(`${this.projetUrl}`+`list`);
  }

  public create(historique: Historique): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`, historique, this.HttpOptions);
  }

  public getHistoriqueById(id: number): Observable<any>{
    return this.httpClient.get<Historique>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public update(id: number, historique: Historique): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`, historique, this.HttpOptions);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`, this.HttpOptions);
  }

  public getHistoriqueByIdProjet(id: number): Observable<Historique[]>{
    return this.httpClient.get<Historique[]>(`${this.projetUrl}`+`projetID`+`/${id}`, this.HttpOptions);
  }
}
