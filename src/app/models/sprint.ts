import { Projet } from "./projet";
import { User } from "./user";

export class Sprint {
    idSprint:number;
    nom:string;
    dateCreation:string;
    date_debut:string;
    date_fin:string;
    termine:string;
    etat:string;
    objectif:string;
    idCreateur:User;
    projet:Projet;
    newSubTask:boolean;
    couleur:string;
}
