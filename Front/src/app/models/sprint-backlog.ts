import { Backlog } from "./backlog";
import { Projet } from "./projet";
import { Sprint } from "./sprint";

export class SprintBacklog {
    id:number;
    sprint:Sprint;
    backlog:Backlog;
    projet:Projet;
}
