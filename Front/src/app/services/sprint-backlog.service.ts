import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SprintBacklog } from '../models/sprint-backlog';
import { Sprint } from '../models/sprint';
import { Backlog } from '../models/backlog';

@Injectable({
  providedIn: 'root'
})
export class SprintBacklogService {

  projetUrl = 'http://localhost:8081/SprintBacklog/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<SprintBacklog[]>{
    return this.httpClient.get<SprintBacklog[]>(`${this.projetUrl}`+`list`);
  }

  public create(sprintBacklog: SprintBacklog): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`, sprintBacklog, this.HttpOptions);
  }

  public getSprintsAtBacklogId(id: number): Observable<Sprint[]>{
    return this.httpClient.get<Sprint[]>(`${this.projetUrl}`+`backlogID`+`/${id}`, this.HttpOptions);
  }

  public getBacklogsAtSprintId(id: number): Observable<Backlog[]>{
    return this.httpClient.get<Backlog[]>(`${this.projetUrl}`+`sprintID`+`/${id}`, this.HttpOptions);
  }

  public getSprintBacklogByIdProjet(id: number): Observable<SprintBacklog[]>{
    return this.httpClient.get<SprintBacklog[]>(`${this.projetUrl}`+`projetID`+`/${id}`, this.HttpOptions);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`, this.HttpOptions);
  }
}
