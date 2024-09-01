import { Projet } from "./projet";
import { User } from "./user";
import { Backlog } from "./backlog"
import { Fonctionnalite } from "./fonctionnalite";
import { Tache } from "./tache";

export class ResponsableProjet {
    id:number;
    projet:Projet;
    idResponsable:User;
    idProductOwner:User;
    idScrumMaster:User;
    idDevellopers:User;
    idCreateur:User;
    backlog:Backlog;
    fonctionnalite:Fonctionnalite;
    tache:Tache;
    dateFin:Date;
    dateFinString :string;
}
