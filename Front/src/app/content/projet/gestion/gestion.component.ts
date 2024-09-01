import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import * as html2pdf from 'html2pdf.js';
import { EvenementProjet } from 'src/app/models/evenement-projet';
import { Fichier } from 'src/app/models/fichier';
import { Projet } from 'src/app/models/projet';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { BacklogService } from 'src/app/services/backlog.service';
import { EvenementProjetService } from 'src/app/services/evenement-projet.service';
import { FichierService } from 'src/app/services/fichier.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjetService } from 'src/app/services/projet.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { Chart, registerables } from 'chart.js';
import { Backlog } from 'src/app/models/backlog';
import { Fonctionnalite } from 'src/app/models/fonctionnalite';
import { FonctionnaliteService } from 'src/app/services/fonctionnalite.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {

  @ViewChild('collapse') collapse!: MdbCollapseDirective;

  totalLength:any;
  page:number = 1;
  closeResult = '';
  projets: Projet[];
  projetCreate: Projet;
  updateProjet: Projet;
  userId: string;
  currentDateTime = new Date().toLocaleString();
  idUpdate: number;
  currentDate = new Date();
  projet:Projet;
  usersWithRole:User[];
  actualUser:User;
  userResp:User;
  resp:string;
  photo:Fichier[];
  userPhoto:Fichier;
  userProfil:User;
  roles:Role[];
  nomRecherche:string;
  imageSrc:string;
  dateDebut:Date;
  dateFin:Date;
  evenementsProjet:EvenementProjet[];
  newEvent:EvenementProjet;
  idProjet:number;
  backlogsProjet:Backlog[];
  fonctionnalitesBacklog:Fonctionnalite[];
  nomsProjet:string[] = [];

  cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');

  constructor(private projetService: ProjetService,private modalService: NgbModal,private userService:UserService,private sessionStorage:LocalStorageService,
    private loginService: LoginService, private router: Router,private fichierService:FichierService,private roleService:RoleService,
    private evenementService:EvenementProjetService, private backlogService:BacklogService, private fonctionnaliteService:FonctionnaliteService) {
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
        console.log(this.actualUser.realmRoles);
      }, error => console.log(error));
      this.projetCreate = new Projet(this.actualUser);
      this.getprojet();
      this.getUsersByRole("SCRUM_master");
    }
  }

  showChart(idProjet:number) {
    let pasvalable = 0,valable = 0, enAttente = 0, termine = 0;
    this.backlogService.getBacklogByIdProjet(idProjet).subscribe( backlogs => {
      this.fonctionnaliteService.list().subscribe( fonctionnnalites => {
        this.fonctionnalitesBacklog = fonctionnnalites;
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

  open(content: any) {
		this.modalService.open(content, { size: 'lg', backdrop: 'static' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
  
  openEvenement(content: any,idProjet:number) {
    this.idProjet = idProjet;
    this.newEvent = new EvenementProjet();
    this.evenementService.getEvenementProjetByIdProjet(idProjet).subscribe( data => {
      for(let event of data) {
        if(event.moment) {event.moment = formatDate(event.moment, 'dd-MM-yyyy hh:mm', 'en-US');}
        if(event.moment == null) {event.moment = '';}
      }
      this.evenementsProjet = data;
      this.modalService.open(content, { size: 'xl', backdrop: 'static' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    });
	}

  newEvenementMethod() {
    this.newEvent.projet = new Projet(this.actualUser);
    this.newEvent.projet.idProjet = this.idProjet;
    this.evenementService.create(this.newEvent,this.loginService.getId()).subscribe( data => {
      data.moment = this.dateDebut;
      this.evenementService.update(data.id,data,this.loginService.getId()).subscribe( evenement => {
        console.log(evenement);
        this.idProjet = 0;
        this.dateDebut = new Date();
        this.newEvent = new EvenementProjet();
        this.modalService.dismissAll();
      });
    });
  }

  updateEvent(evenement:EvenementProjet) {
    if(!evenement.update) {
      this.evenementService.getEvenementProjetById(evenement.id).subscribe( data => {
        evenement.update = true; evenement.moment = formatDate(data.moment, 'yyyy-MM-dd hh:mm', 'en-US');console.log(evenement);
      });
    }
    else {
      this.evenementService.getEvenementProjetById(evenement.id).subscribe( data => {
        data.moment = this.dateDebut;
        data.evenement = evenement.evenement;
        this.evenementService.update(data.id,data,this.loginService.getId()).subscribe( data => {
          this.dateDebut = new Date();
          evenement.update = false;
        });
      });
    }
  }

  getRoles() {
    this.roleService.list().subscribe( data => {
      this.roles = data;
      console.log(this.roles);
    },
    err => console.log(err));
  }

  open2(content: any, id: number) {
		this.modalService.open(content, { size: 'lg', backdrop: 'static' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
    this.idUpdate = id;
    this.projetService.getProjetById(this.idUpdate).subscribe(data => {
      this.updateProjet = data;
      const date = new Date(data.dateCreation);
      this.updateProjet.dateCreation = date.toLocaleDateString() + " " + date.toLocaleTimeString();
      for(let image of this.photo) {
        if(data.idCreateur && data.idCreateur.id == image.user.id) this.updateProjet.idCreateur.photo = image.nom;
        if(data.idResponsable && data.idResponsable.id == image.user.id) this.updateProjet.idResponsable.photo = image.nom;
      }
      this.showChart(id);
    });
	}
  
  getUserPhoto(idUser:string) {
    try {
      this.fichierService.getFichierByUserId(idUser).subscribe( data => {
        this.userPhoto = data;
      },
      error => {
        console.log("No photo");
        this.userPhoto = new Fichier();
      });
    } catch(error) {
      console.log("No photo");
      this.userPhoto = new Fichier();
    }
  }

  getUserId(id:string,content:any) {
    this.userService.userWithRole(id).subscribe( data => {
      this.userProfil = data;
      console.log(data);
      this.getRoles();
      this.open(content)
    },
    err => console.log(err));
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
      this.userPhoto = new Fichier();
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.userPhoto = new Fichier();
			return 'by clicking on a backdrop';
		} else {
      this.userPhoto = new Fichier();
			return `with: ${reason}`;
		}
	}

  private getprojet() {
    const nowa = new Date();
    const yesterday = new Date(nowa);
    yesterday.setDate(nowa.getDate() - 1);
    this.projetService.findAllOrderByDatecreationDesc().subscribe( dataProjet => {
      for(let projet of dataProjet) {
        if(projet.dateDebut && projet.dateFin) {
          const startDateStr = projet.dateDebut;
          const endDateStr = projet.dateFin;

          const now = new Date(formatDate(yesterday, 'yyyy-MM-dd', 'en-US'));
          const startDate = new Date(startDateStr);
          const endDate = new Date(endDateStr);

          const diffInMs = endDate.getTime() - now.getTime();
          const init = endDate.getTime() - startDate.getTime();
          const daysLeft = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
          const initDays = Math.floor(init / (1000 * 60 * 60 * 24)) + 1;
          projet.daysLeft = daysLeft;
          projet.avancementJ = parseFloat(((((daysLeft * 100)/initDays)-100)*-1).toFixed(2));
          if(projet.avancementJ > 100) projet.avancementJ = 100;
          // projet.avancementJ = 100 - (daysLeft / initDays)
          // if(projet.nom == 'ykjhkj') console.log(projet.avancementJ);
          // if(projet.avancementJ > 100) console.log(projet.avancementJ);
          
          let finished:number = 0, notFinished = 0;
          this.backlogService.getBacklogByIdProjet(projet.idProjet).subscribe( backlogs => {
            for(let backlog of backlogs) {
              if(backlog.etat == 'Terminé' || backlog.etat == 'Pas valable') finished++;
              else notFinished++;
            }
            projet.avancementP = (finished*100)/(finished+notFinished);
            if(!projet.avancementP) projet.avancementP = 0.0000009;
          });
        }
        if(projet.dateDebut) {projet.dateDebut = formatDate(projet.dateDebut, 'dd-MM-yyyy', 'en-US');}
        if(projet.dateDebut == null) {projet.dateDebut = '';}
        if(projet.dateFin) {projet.dateFin = formatDate(projet.dateFin, 'dd-MM-yyyy', 'en-US');}
        if(projet.dateFin == null) {projet.dateFin = '';}
      }
      this.projets = dataProjet;
      this.getAllNomProjet();
      console.log(this.photo);
      this.fichierService.getUsersPhoto().subscribe( data => {
        this.photo = data;
        for(let projet of dataProjet) {
          for(let image of this.photo) {
            if(projet.idCreateur && projet.idCreateur.id == image.user.id) { projet.idCreateur.photo = image.nom; }
            if(projet.idResponsable && projet.idResponsable.id == image.user.id) { projet.idResponsable.photo = image.nom; }
          }
        }
      },
      err => console.log(err));
    },
    err => console.log(err));
  }

  private getprojetById(id:number) {
    this.projetService.getProjetById(id).subscribe( data => {
      this.projet = data;
      console.log(this.projet.idCreateur.id);
    },
    err => console.log(err));
  }

  exportToPDF() {
    const element = document.getElementById('project-profile');
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: this.updateProjet.nom+'.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    html2pdf()
      .from(element)
      .set(opt)
      .save();
  
      console.log("conversion en pdf");
  }

  getAllNomProjet() {
    for(let projet of this.projets) {
      this.nomsProjet.push(projet.nom);
    }
  }

  isNameExist() : boolean {
    if(this.nomsProjet.includes(this.projetCreate.nom)) return false;
    else return true;
  }

  onSubmit(){
    this.projetCreate.idCreateur = this.actualUser;
    this.projetCreate.etat = 'à faire';
    this.projetService.create(this.projetCreate).subscribe(data => {
      console.log(data);
      this.projetCreate = new Projet();
      this.getprojet();
      this.modalService.dismissAll();
    });
  }

  goProjetList() {
    this.router.navigate(['/GestionProjet']);
  }

  update(){
    this.projetService.update(this.idUpdate, this.updateProjet,this.loginService.getId()).subscribe( data =>{
      console.log(data);
      alert('successfully');
      this.getprojet();
    }
    , error => console.log(error));
  }

  delete(){
    if (window.confirm('ëtes vous sûr de supprimer ce projet ?')) {
      this.projetService.delete(this.idUpdate,this.loginService.getId()).subscribe( data =>{
        alert('successfully');
        this.getprojet();
        this.modalService.dismissAll();
      });
    }
  }

  getUsersByRole(role:string) {
    this.userService.getUsersByRole(role).subscribe( data =>{
      this.usersWithRole = data;
      this.getPdp();
      if(this.photo) {
        for(let user of data) {
          for(let image of this.photo) {
            if(user.id == image.user.id) { user.photo = image.nom;console.log(image.nom); }
          }
        }
      }
    },
    error => console.log(error));
  }

  getUserByUsername(username:string) {
    this.userService.getUserByUsername(username).subscribe( data =>{
      this.userResp = data;
       console.log(data);
    },
    error => console.log(error));
  }

  getPdp() {
    this.fichierService.getUsersPhoto().subscribe( data => {
      this.photo = data;
    },
    err => console.log(err));
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      this.imageSrc = base64Image;
      console.log(this.imageSrc);
    };
  }

  assignResponsable(user:User,projet:Projet) {
    projet.idResponsable = user;
    this.projetService.update(projet.idProjet,projet,this.loginService.getId()).subscribe( data => {
      console.log(data);
    },
    err => console.log(err));
  }

  getUsersByUsername() {
    if(this.nomRecherche == '') {
      this.getUsersByRole("SCRUM_master");
    } else {
      let i = 0;
      for(let user of this.usersWithRole) {
        if(user.username.startsWith(this.nomRecherche)) {
          if(i == 0) {
            this.usersWithRole = [];
            i = 1;
          }
          this.usersWithRole.push(user);
        } else {
          let index = this.usersWithRole.indexOf(user);
          if(index > -1) {
            this.usersWithRole.splice(index,1);
          }
        }
      }
    }
  }

  voirProjetDetail(idProjet:number) {
    this.router.navigate(['/ProjetProfile/'+idProjet]);
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

  isAdministrateur():boolean {
    let ans = false;
    if(this.actualUser && this.actualUser.realmRoles && this.userService.isAdministrateur(this.actualUser)) {ans = true;}
    return ans;
  }
}
