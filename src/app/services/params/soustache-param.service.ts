import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SoustacheParam } from 'src/app/models/params/soustache-param';

@Injectable({
  providedIn: 'root'
})
export class SoustacheParamService {

  projetUrl = 'http://localhost:8081/Soustache_param/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<SoustacheParam[]>{
    return this.httpClient.get<SoustacheParam[]>(`${this.projetUrl}`+`list`);
  }

  public create(foo: SoustacheParam): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`, foo, this.HttpOptions);
  }

  public getProjetById(id: number): Observable<any>{
    return this.httpClient.get<SoustacheParam>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public update(id: number, foo: SoustacheParam): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`, foo, this.HttpOptions);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`, this.HttpOptions);
  }
}
