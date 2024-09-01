import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SprintParam } from 'src/app/models/params/sprint-param';

@Injectable({
  providedIn: 'root'
})
export class SprintParamService {

  projetUrl = 'http://localhost:8081/Sprint_param/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<SprintParam[]>{
    return this.httpClient.get<SprintParam[]>(`${this.projetUrl}`+`list`);
  }

  public create(foo: SprintParam): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`, foo, this.HttpOptions);
  }

  public getProjetById(id: number): Observable<any>{
    return this.httpClient.get<SprintParam>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public update(id: number, foo: SprintParam): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`, foo, this.HttpOptions);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`, this.HttpOptions);
  }
}
