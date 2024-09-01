import { Commentaire } from "./commentaire";
import { Projet } from "./projet";
import { User } from "./user";

export class Fichier {
    idFichier:number;
    nom:string;
    chemin:string;
    dateCreation:String;
    idCommentaire:number;
    projet:Projet;
    commentaire:Commentaire;
    user:User
}
