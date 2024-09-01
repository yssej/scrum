import { Backlog } from "./backlog";
import { Fonctionnalite } from "./fonctionnalite";
import { Projet } from "./projet";
import { Tache } from "./tache";
import { User } from "./user";

export class Commentaire {
    idCommentaire:number;
    commentaire:string;
    temp:string;
    projet:Projet;
    tache:Tache;
    backlog:Backlog;
    fonctionnalite:Fonctionnalite;
    createur:User;
    updating = false;
    file:boolean;
    projetID:Projet;
}
