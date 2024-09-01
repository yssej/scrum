import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  projetUrl = 'http://localhost:8081/Notification/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Notification[]>{
    return this.httpClient.get<Notification[]>(`${this.projetUrl}`+`list`);
  }

  public create(foo: Notification): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`, foo, this.HttpOptions);
  }

  public getNotificationById(id: number): Observable<any>{
    return this.httpClient.get<Notification>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public getNotificationByIdDestinataire(id: string): Observable<Notification[]>{
    return this.httpClient.get<Notification[]>(`${this.projetUrl}`+`destinataireID`+`/${id}`, this.HttpOptions);
  }

  public update(id: number, foo: Notification): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`, foo, this.HttpOptions);
  }

  public readNotifications(id: string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`readNotificationByUserID`+`/${id}`, this.HttpOptions);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`, this.HttpOptions);
  }
}
