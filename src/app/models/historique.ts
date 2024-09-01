import { Projet } from "./projet";
import { User } from "./user";

export class Historique {
    idHistorique:number;
    historique:string;
    dateCreation:string;
    projet:Projet;
    idCreateur:User;
}
