import { Projet } from "./projet";
import { Sprint } from "./sprint";
import { User } from "./user";

export class Backlog {
    id:number;
    nom:string;
    abbreviate:string;
    description:string;
    dateCreation:string;
    dateDebut:string | any;
    termine:string | any;
    dateFin:string | any;
    etat:string;
    projet:Projet;
    idCreateur:User;
    createFonction:boolean;
    sprint:Sprint | null;
    position:number;
    priorite:number;
    storyPoint:number;
    dateMin:Date;
    dateMax:Date;
    sprints:Sprint[];
}
