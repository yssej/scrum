import { Backlog } from "./backlog";
import { Commentaire } from "./commentaire";
import { Fonctionnalite } from "./fonctionnalite";
import { Projet } from "./projet";
import { Tache } from "./tache";
import { User } from "./user";

export class Notification {
    idNotification:number;
    notification:string;
    tempMinute:number;
    tempsuite:string;
    temp:string;
    isread:boolean;
    new:boolean;
    destinataire:User;
    expediteur:User;
    projet:Projet;
    backlog:Backlog;
    fonctionnalite:Fonctionnalite;
    tache:Tache;
    commentaire:Commentaire;
}
