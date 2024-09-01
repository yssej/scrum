import { Fonctionnalite } from "./fonctionnalite";
import { Projet } from "./projet";
import { User } from "./user";

export class Tache {
    idTache:number;
    nom:string;
    couleur:string;
    description:string;
    dateCreation:string;
    etat:string;
    dateDebut:string;
    dateFin:string;
    termine:string;
    avance:number;
    idResponsable:User;
    idRapporteur:User;
    projet:Projet;
    fonctionnalite:Fonctionnalite;

    constructor(idRapporteur:User) {
        this.idRapporteur = idRapporteur;
    }
}
