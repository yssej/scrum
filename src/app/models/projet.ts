import { User } from "./user";

export class Projet {
    idProjet:number;
    nom:string;
    description:string;
    etat:string;
    dateCreation:string;
    dateDebut:string | any;
    dateFin:string| any;
    idCreateur:User;
    idResponsable:User;
    daysLeft:number;
    avancementJ:number;
    avancementP:number;
    dateTermine:string | any;

    constructor(user?: User) {
        if(user) this.idCreateur = user;
    }
}
