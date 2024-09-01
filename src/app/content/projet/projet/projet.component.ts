import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Backlog } from 'src/app/models/backlog';
import { Fonctionnalite } from 'src/app/models/fonctionnalite';
import { Projet } from 'src/app/models/projet';
import { User } from 'src/app/models/user';
import { BacklogService } from 'src/app/services/backlog.service';
import { FonctionnaliteService } from 'src/app/services/fonctionnalite.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjetService } from 'src/app/services/projet.service';
import { ResponsableProjetService } from 'src/app/services/responsable-projet.service';
import { UserService } from 'src/app/services/user.service';
import { Chart, registerables } from 'chart.js';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Fichier } from 'src/app/models/fichier';
import { FichierService } from 'src/app/services/fichier.service';
import { ResponsableProjet } from 'src/app/models/responsable-projet';
import { Tache } from 'src/app/models/tache';
import { TacheService } from 'src/app/services/tache.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  
  totalLength:any;
  page:number = 1;
  page2:number = 1;
  page3:number = 1;
  page4:number = 1;
  projets: Projet[];
  backlogSelected:Backlog;
  projetSelected:Projet;
  backlogs:Backlog[] = [];
  fonctionnalites:Fonctionnalite[];
  taches:Tache[];
  projectsSM:Projet[] = [];
  backlogsSM:Backlog[] = [];
  fonctionnalitesSM:Fonctionnalite[] = [];
  tachesSM:Tache[] = [];
  projectsDev:Projet[] = [];
  backlogsDev:Backlog[] = [];
  fonctionnalitesDev:Fonctionnalite[] = [];
  tachesDev:Tache[] = [];
  projectsResp:Projet[] = [];
  backlogsResp:Backlog[] = [];
  fonctionnalitesResp:Fonctionnalite[] = [];
  tachesResp:Tache[] = [];
  userId:string;
  user:User;
  backlogsProjet:Backlog[];
  fonctionnalitesBacklog:Fonctionnalite[];
  actualUser:User;
  photo:Fichier[];
  responsableProjetSM:ResponsableProjet[];
  responsabilite:ResponsableProjet[] = [];
  projetSM:Projet[];
  backlogSM:Backlog[];
  fonctionnaliteSM:Fonctionnalite[];
  tacheSM:Tache[];

  constructor(private loginService:LoginService,private router:Router,private responsableService: ResponsableProjetService,private userService:UserService,
    private projetService:ProjetService,private modalService:NgbModal,private backlogService:BacklogService,
    private fonctionnaliteService:FonctionnaliteService,private sessionStorage:LocalStorageService,private fichierService:FichierService,private tacheService:TacheService) {
      Chart.register(...registerables);
  }

  ngOnInit(): void {
    if(this.loginService.getIsLogged() == false) {
      this.router.navigate(['/Acceuil']);
    } else {
      this.getPdp();
      this.userId = this.loginService.getId();
      this.userService.userWithRole(this.userId).subscribe(data => {
        this.actualUser = data;
      });
      this.getprojet();
      this.getSMAssigned();
      this.getAll();
    }
  }

  private getprojet() {
    this.responsableService.getProjetAssignedByUserID(this.userId).subscribe( data => {
      this.projets = data;
    },
    err => console.log(err));
  }

  getSMAssigned() {
    this.responsableService.getBacklogAssignedByUserID2(this.userId).subscribe( data => {
      this.responsableProjetSM = data;
      for(let rpsm of this.responsableProjetSM.filter(resp => resp.idScrumMaster != null && resp.idProductOwner == null && resp.idResponsable == null && resp.idDevellopers == null)) {
        if(rpsm.projet && rpsm.backlog == null && rpsm.fonctionnalite == null && rpsm.tache == null) {
          this.projectsSM.push(rpsm.projet);
        }
        else if(rpsm.backlog && rpsm.fonctionnalite == null && rpsm.tache == null) {this.backlogsSM.push(rpsm.backlog);}
        else if(rpsm.fonctionnalite && rpsm.backlog == null && rpsm.tache == null) {this.fonctionnalitesSM.push(rpsm.fonctionnalite);}
        else if(rpsm.tache && rpsm.fonctionnalite == null && rpsm.backlog == null) {this.tachesSM.push(rpsm.tache);}
      }
      for(let rpsm of this.responsableProjetSM.filter(resp => resp.idScrumMaster == null && resp.idProductOwner == null && resp.idResponsable == null && resp.idDevellopers != null)) {
        if(rpsm.projet && rpsm.backlog == null && rpsm.fonctionnalite == null && rpsm.tache == null) {this.projectsDev.push(rpsm.projet)}
        else if(rpsm.backlog && rpsm.fonctionnalite == null && rpsm.tache == null) {this.backlogsDev.push(rpsm.backlog);}
        else if(rpsm.fonctionnalite && rpsm.backlog == null && rpsm.tache == null) {this.fonctionnalitesDev.push(rpsm.fonctionnalite);}
        else if(rpsm.tache && rpsm.fonctionnalite == null && rpsm.backlog == null) {this.tachesDev.push(rpsm.tache);}
      }
      for(let rpsm of this.responsableProjetSM.filter(resp => resp.idScrumMaster == null && resp.idProductOwner == null && resp.idResponsable != null && resp.idDevellopers == null)) {
        if(rpsm.projet && rpsm.backlog == null && rpsm.fonctionnalite == null && rpsm.tache == null) {this.projectsResp.push(rpsm.projet)}
        else if(rpsm.backlog && rpsm.fonctionnalite == null && rpsm.tache == null) {this.backlogsResp.push(rpsm.backlog);}
        else if(rpsm.fonctionnalite && rpsm.backlog == null && rpsm.tache == null) {this.fonctionnalitesResp.push(rpsm.fonctionnalite);}
        else if(rpsm.tache && rpsm.fonctionnalite == null && rpsm.backlog == null) {this.tachesResp.push(rpsm.tache);}
      }
      for(let rpsm of this.responsableProjetSM) {
        if(rpsm.projet && !rpsm.backlog && !rpsm.fonctionnalite && !rpsm.tache && rpsm.projet.etat != 'Terminé') {
          if(rpsm.projet.dateFin) {
            rpsm.dateFin = new Date(rpsm.projet.dateFin);
            rpsm.dateFinString = new Date(rpsm.projet.dateFin).toLocaleDateString();
          } else {
            rpsm.dateFinString = 'Date limite non défini';
          }
          this.responsabilite.push(rpsm);
        }
        else if(rpsm.backlog && !rpsm.fonctionnalite && !rpsm.tache && rpsm.backlog.etat != 'Terminé') {
          if(rpsm.backlog.dateFin) {
            rpsm.dateFin = new Date(rpsm.backlog.dateFin);
            rpsm.dateFinString = new Date(rpsm.backlog.dateFin).toLocaleDateString();
          } else {
            rpsm.dateFinString = 'Date limite non défini';
          }
          this.responsabilite.push(rpsm);
        }
        else if(!rpsm.backlog && rpsm.fonctionnalite && !rpsm.tache && rpsm.fonctionnalite.etat != 'Terminé') {
          if(rpsm.fonctionnalite.dateFin) {
            rpsm.dateFin = new Date(rpsm.fonctionnalite.dateFin);
            rpsm.dateFinString = new Date(rpsm.fonctionnalite.dateFin).toLocaleDateString();
          } else {
            rpsm.dateFinString = 'Date limite non défini';
          }
          this.responsabilite.push(rpsm);
        }
        else if(!rpsm.backlog && !rpsm.fonctionnalite && rpsm.tache && rpsm.tache.etat != 'Terminé') {
          if(rpsm.tache.dateFin) {
            rpsm.dateFin = new Date(rpsm.tache.dateFin);
            rpsm.dateFinString = new Date(rpsm.tache.dateFin).toLocaleDateString();
          } else {
            rpsm.dateFinString = 'Date limite non défini';
          }
          this.responsabilite.push(rpsm);
        }
      }
      this.responsabilite = this.responsabilite.sort((a, b) => a.dateFin && b.dateFin && b.dateFin.getTime() - a.dateFin.getTime());
    });
  }

  getAll() {
    this.backlogService.list().subscribe( data => {
      this.backlogs = data;
    });
    this.fonctionnaliteService.list().subscribe( data => {
      this.fonctionnalites = data;
    });
    this.tacheService.list().subscribe(data => {
      this.taches = data;
    });
  }

  getAvance(responsable:ResponsableProjet):string {
    let ans = 0;
    if(this.backlogs && this.fonctionnalites && this.taches) {
      if(responsable.projet && !responsable.backlog && !responsable.fonctionnalite && !responsable.tache) {
        const all:number = this.backlogs.filter(resp => resp.projet && resp.projet.idProjet == responsable.projet.idProjet).length;
        const notFinished = this.backlogs.filter(resp => resp.projet && resp.projet.idProjet == responsable.projet.idProjet && resp.etat != 'Terminé').length;
        ans = (notFinished * 100) / all;
      } else if(responsable.projet && responsable.backlog && !responsable.fonctionnalite && !responsable.tache) {
        const all:number = this.fonctionnalites.filter(resp => resp.backlog && resp.backlog.id == responsable.backlog.id).length;
        const notFinished = this.fonctionnalites.filter(resp => resp.backlog && resp.backlog.id == responsable.backlog.id && resp.etat != 'Terminé').length;
        ans = (notFinished * 100) / all;
      } else if(responsable.projet && !responsable.backlog && responsable.fonctionnalite && !responsable.tache) {
        const all:number = this.taches.filter(resp => resp.fonctionnalite && resp.fonctionnalite.id == responsable.fonctionnalite.id).length;
        const notFinished = this.taches.filter(resp => resp.fonctionnalite && resp.fonctionnalite.id == responsable.fonctionnalite.id && resp.etat != 'Terminé').length;
        ans = (notFinished * 100) / all;
      } else if(responsable.projet && !responsable.backlog && !responsable.fonctionnalite && responsable.tache) {
        ans = responsable.tache.avance;
      }
    }
    return ans.toFixed(1);
  }

  openFonctionnalite(fonctionnalite:Fonctionnalite) {
    this.router.navigate(['/Backlog2'], { queryParams: { fonctionnalite: fonctionnalite.id, projet: fonctionnalite.backlog.projet.idProjet } });
  }

  openTache(tache:Tache) {
    this.router.navigate(['/Backlog2'], { queryParams: { tache: tache.idTache, projet: tache.fonctionnalite.backlog.projet.idProjet } });
  }

  openBacklog(backlog:Backlog) {
    this.router.navigate(['/Backlog2'], { queryParams: { backlog: backlog.id ,projet: backlog.projet.idProjet } });
  }

  getProjet(projet:Projet,content:any) {
    this.open(content);
    this.projetService.getProjetById(projet.idProjet).subscribe(data => {
      this.projetSelected = data;
      const date = new Date(data.dateCreation);
      this.projetSelected.dateCreation = date.toLocaleDateString() + " " + date.toLocaleTimeString();
      for(let image of this.photo) {
        if(data.idCreateur && data.idCreateur.id == image.user.id) this.projetSelected.idCreateur.photo = image.nom;
        if(data.idResponsable && data.idResponsable.id == image.user.id) this.projetSelected.idResponsable.photo = image.nom;
      }
      this.showChart(projet.idProjet);
    });
  }

  getPdp() {
    this.fichierService.getUsersPhoto().subscribe( data => {
      this.photo = data;
    },
    err => console.log(err));
  }

  open(content:any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static' });
  }

  openProjet(projet:Projet,content:any) {
    this.getProjet(projet,content);
  }

  showChart(idProjet:number) {
    let pasvalable = 0,valable = 0, enAttente = 0, termine = 0;
    this.backlogService.getBacklogByIdProjet(idProjet).subscribe( backlogs => {
      this.fonctionnaliteService.list().subscribe( fonctionnalites => {
        this.fonctionnalitesBacklog = fonctionnalites;
      });
      this.backlogsProjet = backlogs;
      for(let backlog of backlogs) {
        if(backlog.etat == 'en attente') enAttente++;
        else if(backlog.etat == 'Pas valable') pasvalable++;
        else if(backlog.etat == 'Valable') valable++;
        else if(backlog.etat == 'Terminé') termine++;
      }
      var myChart = new Chart("myChart2", {
        type: 'pie',
        data: {
          labels: ['Pas valable', 'Valable', 'En attente', 'Terminé'],
          datasets: [{
            label: ' ',
            data: [pasvalable, valable, enAttente, termine],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        }
      });
    });
  }

  getFonctionnaliteAFaire(backlog:Backlog):number {
    let i:number = 0;
    let j = 0;
    for(let fonctionnalite of this.fonctionnalitesBacklog) {
      if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'à faire') i++ ;
      else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'En progrès') j++ ;
      else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'Terminé') j++ ;
    }
    i = (i*100)/(i+j);
    return i;
  }

  getFonctionnaliteEnProgres(backlog:Backlog):number {
    let i:number = 0;
    let j = 0;
    for(let fonctionnalite of this.fonctionnalitesBacklog) {
      if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'En progrès') i++ ;
      else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'à faire') j++ ;
      else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'Terminé') j++ ;
    }
    i = (i*100)/(i+j);
    return i;
  }

  getFonctionnaliteTermine(backlog:Backlog):number {
    let i:number = 0;
    let j = 0;
    for(let fonctionnalite of this.fonctionnalitesBacklog) {
      if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'Terminé') i++ ;
      else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'à faire') j++ ;
      else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'En progrès') j++ ;
    }
    i = (i*100)/(i+j);
    return i;
  }

  workIn(idProjet:number) {
    if(this.sessionStorage.getDataFromSessionStorage('projetWorking') == null) {
      this.sessionStorage.saveDataToSessionStorage('projetWorking',idProjet);
    } else {
      this.sessionStorage.removeDataFromSessionStorage('projetWorking');
      this.sessionStorage.saveDataToSessionStorage('projetWorking',idProjet);
    }
    this.router.navigate(['Backlog2']);
  }
  
  voirProjetDetail(idProjet:number) {
    this.router.navigate(['/ProjetProfile/'+idProjet]);
  }

  
}
