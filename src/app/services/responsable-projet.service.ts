import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsableProjet } from '../models/responsable-projet';
import { Projet } from '../models/projet';
import { Fonctionnalite } from '../models/fonctionnalite';
import { Tache } from '../models/tache';
import { Backlog } from '../models/backlog';

@Injectable({
  providedIn: 'root'
})
export class ResponsableProjetService {

  projetUrl = 'http://localhost:8081/ResponsableProjet/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<ResponsableProjet[]>{
    return this.httpClient.get<ResponsableProjet[]>(`${this.projetUrl}`+`list`);
  }

  public getResponsableProjetById(id: number): Observable<ResponsableProjet>{
    return this.httpClient.get<ResponsableProjet>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public create(responsableProjet: ResponsableProjet,user:string): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`+`/${user}`, responsableProjet, this.HttpOptions);
  }

  public update(id: number, responsableProjet: ResponsableProjet,user:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`+`/${user}`, responsableProjet, this.HttpOptions);
  }

  public delete(id: number,user:string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`+`/${user}`, this.HttpOptions);
  }

  public getResponsableProjetByIdProjet(id: number): Observable<ResponsableProjet[]>{
    return this.httpClient.get<ResponsableProjet[]>(`${this.projetUrl}`+`projetID`+`/${id}`, this.HttpOptions);
  }

  public getResponsableBacklogInProject(id: number): Observable<ResponsableProjet[]>{
    return this.httpClient.get<ResponsableProjet[]>(`${this.projetUrl}`+`backlogProjetID`+`/${id}`, this.HttpOptions);
  }

  public getResponsableFonctionnaliteInBacklog(id: number): Observable<ResponsableProjet[]>{
    return this.httpClient.get<ResponsableProjet[]>(`${this.projetUrl}`+`fonctionnaliteBacklogID`+`/${id}`, this.HttpOptions);
  }

  public getResponsableBacklogById(id: number): Observable<ResponsableProjet[]>{
    return this.httpClient.get<ResponsableProjet[]>(`${this.projetUrl}`+`backlogID`+`/${id}`, this.HttpOptions);
  }

  public getResponsablesProjetByIdResponsable(id: string): Observable<ResponsableProjet[]>{
    return this.httpClient.get<ResponsableProjet[]>(`${this.projetUrl}`+`responsableID`+`/${id}`, this.HttpOptions);
  }

  public getResponsablesProjetByIdScrumMaster(id: string): Observable<ResponsableProjet[]>{
    return this.httpClient.get<ResponsableProjet[]>(`${this.projetUrl}`+`scrumMasterID`+`/${id}`, this.HttpOptions);
  }

  public getResponsablesProjetByIdProductOwnerID(id: string): Observable<ResponsableProjet[]>{
    return this.httpClient.get<ResponsableProjet[]>(`${this.projetUrl}`+`productOwnerID`+`/${id}`, this.HttpOptions);
  }

  public getResponsablesProjetByIddevellopersID(id: string): Observable<ResponsableProjet[]>{
    return this.httpClient.get<ResponsableProjet[]>(`${this.projetUrl}`+`devellopersID`+`/${id}`, this.HttpOptions);
  }

  public getProjetAssignedByUserID(id: string): Observable<Projet[]>{
    return this.httpClient.get<Projet[]>(`${this.projetUrl}`+`projetAssignedID`+`/${id}`, this.HttpOptions);
  }

  public getBacklogAssignedByUserID(id: string): Observable<Backlog[]>{
    return this.httpClient.get<Backlog[]>(`${this.projetUrl}`+`backlogAssignedID`+`/${id}`, this.HttpOptions);
  }

  public getBacklogAssignedByUserID2(id: string): Observable<ResponsableProjet[]>{
    return this.httpClient.get<ResponsableProjet[]>(`${this.projetUrl}`+`backlogAssignedID2`+`/${id}`, this.HttpOptions);
  }

  public getFonctionnaliteAssignedByUserID(id: string): Observable<Fonctionnalite[]>{
    return this.httpClient.get<Fonctionnalite[]>(`${this.projetUrl}`+`fonctionnaliteAssignedID`+`/${id}`, this.HttpOptions);
  }

  public getTacheAssignedByUserID(id: string): Observable<Tache[]>{
    return this.httpClient.get<Tache[]>(`${this.projetUrl}`+`tacheAssignedID`+`/${id}`, this.HttpOptions);
  }
}
