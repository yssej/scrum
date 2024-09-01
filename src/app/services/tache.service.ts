import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../models/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  projetUrl = 'http://localhost:8081/Tache/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Tache[]>{
    return this.httpClient.get<Tache[]>(`${this.projetUrl}`+`list`);
  }

  public create(tache: Tache): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`, tache, this.HttpOptions);
  }

  public savePosition(tache:Tache[]): Observable<Object>{
    return this.httpClient.put(`${this.projetUrl}`+`savePosition`, tache, this.HttpOptions);
  }

  public getTacheById(id: number): Observable<any>{
    return this.httpClient.get<Tache>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public getTacheByNom(nom: string): Observable<any>{
    return this.httpClient.get<Tache>(`${this.projetUrl}`+`nom`+`/${nom}`, this.HttpOptions);
  }

  public getTacheByEtat(etat: string): Observable<any>{
    return this.httpClient.get<Tache>(`${this.projetUrl}`+`etat`+`/${etat}`, this.HttpOptions);
  }

  public countTacheResp(user: string, etat:string): Observable<any>{
    return this.httpClient.get<Tache>(`${this.projetUrl}`+`countTacheResp`+`/${user}`+`/${etat}`, this.HttpOptions);
  }

  public findAllByOrderByDateDebut(order:string): Observable<any>{
    return this.httpClient.get<Tache>(`${this.projetUrl}`+`findAllByOrderByDateDebut`+`/${order}`, this.HttpOptions);
  }

  public getTacheByIdProjet(id: number): Observable<Tache[]>{
    return this.httpClient.get<Tache[]>(`${this.projetUrl}`+`projetID`+`/${id}`, this.HttpOptions);
  }

  public getTacheByIdFonctionnalite(id: number): Observable<Tache[]>{
    return this.httpClient.get<Tache[]>(`${this.projetUrl}`+`fonctionnaliteID`+`/${id}`, this.HttpOptions);
  }

  public getTacheByBacklog(id: number): Observable<Tache[]>{
    return this.httpClient.get<Tache[]>(`${this.projetUrl}`+`fonctionnaliteBacklogID`+`/${id}`, this.HttpOptions);
  }

  public getTacheByIdRapporteur(id: number): Observable<Tache[]>{
    return this.httpClient.get<Tache[]>(`${this.projetUrl}`+`rapporteurID`+`/${id}`, this.HttpOptions);
  }

  public getTacheByIdResponsable(id: number): Observable<Tache[]>{
    return this.httpClient.get<Tache[]>(`${this.projetUrl}`+`responsableID`+`/${id}`, this.HttpOptions);
  }

  public update(id: number, foo: Tache,user:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`+`/${user}`, foo, this.HttpOptions);
  }

  public delete(id: number,user:string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`+`/${user}`, this.HttpOptions);
  }
}
