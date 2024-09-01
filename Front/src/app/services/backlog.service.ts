import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Backlog } from '../models/backlog';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {

  projetUrl = 'http://localhost:8081/Backlog/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Backlog[]>{
    return this.httpClient.get<Backlog[]>(`${this.projetUrl}`+`list`);
  }

  public getBacklogById(id: number): Observable<any>{
    return this.httpClient.get<Backlog>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public create(evenementProjet: Backlog,userId:string): Observable<any>{
    return this.httpClient.post(`${this.projetUrl}`+`save`+`/${userId}`, evenementProjet, this.HttpOptions);
  }

  public update(id: number, evenementProjet: Backlog,user:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`+`/${user}`, evenementProjet, this.HttpOptions);
  }

  public savePosition(backlogs:Backlog[]): Observable<Object>{
    return this.httpClient.put(`${this.projetUrl}`+`savePosition`, backlogs, this.HttpOptions);
  }

  public delete(id: number,user:string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`+`/${user}`, this.HttpOptions);
  }

  public getBacklogByIdProjet(id: number): Observable<Backlog[]>{
    return this.httpClient.get<Backlog[]>(`${this.projetUrl}`+`projetID`+`/${id}`, this.HttpOptions);
  }

  public getBacklogsnumber(idProjet: number): Observable<number[]>{
    return this.httpClient.get<number[]>(`${this.projetUrl}`+`backlogFinished`+`/${idProjet}`, this.HttpOptions);
  }
}
