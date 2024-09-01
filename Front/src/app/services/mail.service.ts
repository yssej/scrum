import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MailContent } from '../models/mail-content';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  projetUrl = 'http://localhost:8081/Mail/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public sendMail(mail: MailContent): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`create`, mail, this.HttpOptions);
  }
}
