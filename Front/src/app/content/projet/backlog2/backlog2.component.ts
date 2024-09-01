import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Backlog } from 'src/app/models/backlog';
import { Commentaire } from 'src/app/models/commentaire';
import { Fichier } from 'src/app/models/fichier';
import { Projet } from 'src/app/models/projet';
import { BacklogService } from 'src/app/services/backlog.service';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { FichierService } from 'src/app/services/fichier.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjetService } from 'src/app/services/projet.service';
import { saveAs } from 'file-saver';
import { User } from 'src/app/models/user';
import { Fonctionnalite } from 'src/app/models/fonctionnalite';
import { FonctionnaliteService } from 'src/app/services/fonctionnalite.service';
import { Tache } from 'src/app/models/tache';
import { TacheService } from 'src/app/services/tache.service';
import { UserService } from 'src/app/services/user.service';
import { formatDate } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint.service';
import { ResponsableProjetService } from 'src/app/services/responsable-projet.service';
import { ResponsableProjet } from 'src/app/models/responsable-projet';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { SprintBacklog } from 'src/app/models/sprint-backlog';
import { SprintBacklogService } from 'src/app/services/sprint-backlog.service';

@Component({
  selector: 'app-backlog2',
  templateUrl: './backlog2.component.html',
  styleUrls: ['./backlog2.component.css']
})
export class Backlog2Component {

  /*--------------------------------- Projet --------------------------------------*/
  idProjet:number;
  projetInWork:Projet;
  allProjects:Projet[];
  page:number = 1;
  totalLength:any;
  photos:Fichier[];

  /*--------------------------------- Autre -------------------------------------*/
  
  @ViewChild('myModal',{ static:true }) myModalRef: ElementRef;
  @ViewChild('BacklogDetail',{ static:true }) backlogDetail: ElementRef;
  @ViewChild('FonctionnaliteDetail',{ static:true }) fonctionnaliteDetail: ElementRef;
  @ViewChild('TacheDetail',{ static:true }) tacheDetail: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInput') myDropDown: ElementRef;
  sprintsBacklog:SprintBacklog[] = [];
  myGroup: FormGroup;
  fileStatus = { status: '', requestType: '', percent: 0 };
  filenames: string[] = [];
  addDebutTache = false;
  addFinTache = false;
  dateDebut = new Date();
  dateFin = new Date();
  nomRecherche:string;
  user:User;
  isLogged = false;
  isDisabled = true;
  isDropdownOpen = false;

  private serverUrl = 'http://localhost:8081/socket'
  title = 'WebSockets chat';
  private stompClient;
  value:string;
  tri = 'trier'
  startDate:Date;
  endDate:Date;

  /*--------------------------------- Backlog -------------------------------------*/

  newBacklogBool:boolean;
  backlogName = '';
  backlogAbbr = '';
  backlogsProjet:Backlog[];
  backl:Backlog[];
  backDateDebut = '';
  backDateFin = '';
  newBacklog:Backlog;
  backlogSelected:Backlog;
  backlogUpdate:Backlog;
  priority:number = 0;
  responsablesBacklog:ResponsableProjet[];
  responsableBacklogSelected:ResponsableProjet[];
  scrumMastersBacklog:ResponsableProjet[];
  scrumMastersBacklogSelected:ResponsableProjet[];
  developersBacklog:ResponsableProjet[];
  developersBacklogSelected:ResponsableProjet[];
  newResponsableBacklog:ResponsableProjet;

  /*--------------------------------- Commentaire -------------------------------------*/

  fileNameBacklog:string;
  commentairesBacklog:Commentaire[];
  newCommentaireBacklog:Commentaire = new Commentaire();
  fichiersCommentairesBacklog:Fichier[];
  fichiersBacklog:File[];

  fileNameFonctionnalite:string;
  commentairesFonctionnalite:Commentaire[];
  newCommentaireFonctionnalite:Commentaire = new Commentaire();
  fichiersCommentairesFonctionnalite:Fichier[];
  fichiersFonctionnalite:File[];

  fileNameTache:string;
  commentairesTache:Commentaire[];
  newCommentaireTache:Commentaire = new Commentaire();
  fichiersCommentairesTache:Fichier[];
  fichiersTache:File[];

  /*--------------------------------- Fonctionnalite -------------------------------------*/

  newFonctionnaliteBool:boolean;
  fonctionnaliteName = '';
  fonctionnalitesBacklog:Fonctionnalite[];
  newFonctionnalite:Fonctionnalite;
  fonctionnaliteSelected:Fonctionnalite;
  fonctionnaliteUpdate:Fonctionnalite;
  
  scrumMastersFonctionnalite:ResponsableProjet[];
  scrumMastersFonctionnaliteSelected:ResponsableProjet[];
  developersFonctionnalite:ResponsableProjet[];
  developersFonctionnaliteSelected:ResponsableProjet[];
  responsablesFonctionnalite:ResponsableProjet[];
  responsableFonctionnaliteSelected:ResponsableProjet[];
  newResponsableFonctionnalite:ResponsableProjet;

  /*--------------------------------- Tache -------------------------------------*/

  tachesFonctionnalite:Tache[];
  tachesFonctionnalite2:Tache[];
  tacheSelected:Tache;
  newTache:Tache;
  newTacheName:string;
  creatingTache:boolean;
  tacheUpdate:Tache;
  tachesProjet:Tache[];
  selectedValue:number;

  /*--------------------------------- Sprint -------------------------------------*/

  sprintsProjet:Sprint[];
  sprintSelected:Sprint;
  newSprint:Sprint;
  newSprintName:string;
  creatingSprint:boolean;
  sprintUpdate:Sprint;

  /*--------------------------------- User -------------------------------------*/
  
  responsablesToAssign:User[];
  scrumMastersToAssign:User[];
  developersToAssign:User[];
  responsableBacklogFiltered:User[];
  scrumMastersBacklogFiltered:User[];
  developersBacklogFiltered:User[];
  responsableFonctionnaliteFiltered:User[];
  scrumMastersFonctionnaliteFiltered:User[];
  developersFonctionnaliteFiltered:User[];
  

  constructor(private sessionStorage:LocalStorageService,private projetService:ProjetService,private modalService:NgbModal,private router:Router,
    private fichierService:FichierService,private backlogService:BacklogService,private login:LoginService,private commentaireService:CommentaireService,
    private fonctionnaliteService:FonctionnaliteService,private tacheService:TacheService,private userService:UserService,private sprintService:SprintService,
    private responsableService:ResponsableProjetService,private route: ActivatedRoute,private sprintBacklogService:SprintBacklogService ) {
      this.myGroup = new FormGroup({
        nom: new FormControl()
      });
      this.initializeWebSocketConnection();
    }

  ngOnInit(): void {
    if(this.login.getIsLogged()) {
      this.isLogged = true;
      this.userService.userWithRole(this.login.getId()).subscribe( data => {
        this.user = data;
        if(this.user && this.user.realmRoles.find(resp => resp == 'Administrateur')) {
          this.isDisabled = false;
        } else {
          this.responsableService.getResponsableProjetByIdProjet(this.sessionStorage.getDataFromSessionStorage('projetWorking')).subscribe( data => {
            console.log(data);
            if(this.user && data.find(resp => resp.idProductOwner && resp.idProductOwner.id == this.user.id)) {
              this.isDisabled = false;
            }
          });
        }
      });
      this.checkSession();
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.myMethod();
        }
      });
    }
  }

  myMethod() {
    if(this.router.url.startsWith('/Backlog2')) this.checkSession();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (messageons) => {
        if(messageons.body == 'backlog') {
          that.getBacklogs();
          if(that.backlogSelected) that.getBacklogById(that.backlogSelected.id);
          if(that.tacheSelected) { that.getTacheById(that.tacheSelected) };
        }
        if(messageons.body == 'fonctionnalite') {
          that.getFonctionnalitesProjet();that.getBacklogs();
          if(that.backlogSelected) that.getBacklogById(that.backlogSelected.id);
          if(that.fonctionnaliteSelected) {
            that.getFonctionnaliteById(that.fonctionnaliteSelected);
            that.tacheService.getTacheByBacklog(that.fonctionnaliteSelected.backlog.id).subscribe( taches => {
              that.tachesFonctionnalite2 = taches;that.getBacklogs();
            });
          }
        }
        if(messageons.body == 'tache') {
          that.getBacklogs();
          if(that.backlogSelected) {
            that.tacheService.getTacheByBacklog(that.backlogSelected.id).subscribe( taches => {
              that.tachesFonctionnalite2 = taches;that.getBacklogs();
              that.getBacklogById(that.backlogSelected.id);
              if(that.fonctionnaliteSelected) {that.getTacheFonctionnalite(that.fonctionnaliteSelected); that.getFonctionnaliteById(that.fonctionnaliteSelected)}
              if(that.tacheSelected) { that.getTacheById(that.tacheSelected) };
            });
          }
        }
        if(messageons.body == 'sprint') that.getSprints(that.projetInWork);
      });
    });
  }

  deleteSprintBacklog(theBacklog:Backlog,sprintToDelete:Sprint) {
    const spbToDelete:SprintBacklog | undefined = this.sprintsBacklog.find(resp => resp.backlog.id == theBacklog.id && resp.sprint && resp.sprint.idSprint == sprintToDelete.idSprint);
    if(spbToDelete){
      this.sprintBacklogService.delete(spbToDelete.id).subscribe( spb => {
        this.getBacklogs();
      });
    } else console.log('tsy misy e')
  }
  
  openDropdown(): void {
    this.isDropdownOpen = true;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  toggleDropdown(open: boolean): void {
    this.isDropdownOpen = open;
  }

  over(drop:NgbDropdown){
    drop.open()
  }
  out(drop:NgbDropdown){
    drop.close()
  }

  /*--------------------------------- Projet -------------------------------------*/

  checkSession() {
    if(this.sessionStorage.getDataFromSessionStorage('projetWorking') == null && !this.route.snapshot.queryParamMap.get('projet')) {
      this.projetService.list().subscribe( dataProjets => {
        this.allProjects = dataProjets;
        this.fichierService.getUsersPhoto().subscribe( dataPhotos => {
          this.photos = dataPhotos;
          for(let projet of dataProjets) {
            for(let image of dataPhotos) {
              if(projet.idCreateur && projet.idCreateur.id == image.user.id) { projet.idCreateur.photo = image.nom; }
              if(projet.idResponsable && projet.idResponsable.id == image.user.id) { projet.idResponsable.photo = image.nom; }
            }
          }
        });
      });
      this.open(this.myModalRef)
    } else if(this.route.snapshot.queryParamMap.get('backlog') && !this.sessionStorage.getDataFromSessionStorage('projetWorking') ||
      this.route.snapshot.queryParamMap.get('backlog') && 
      this.sessionStorage.getDataFromSessionStorage('projetWorking') != parseInt(this.route.snapshot.queryParamMap.get('projet') as string)) {
      const backlog:number = parseInt(this.route.snapshot.queryParamMap.get('backlog') as string);
      this.backlogService.getBacklogById(backlog).subscribe( data => {
        const project:Projet = data.projet;
        this.sessionStorage.saveDataToSessionStorage('projetWorking',project.idProjet);
        this.checkSession();
      });
    } else if(this.route.snapshot.queryParamMap.get('fonctionnalite') && !this.sessionStorage.getDataFromSessionStorage('projetWorking') ||
      this.route.snapshot.queryParamMap.get('fonctionnalite') && 
      this.sessionStorage.getDataFromSessionStorage('projetWorking') != parseInt(this.route.snapshot.queryParamMap.get('projet') as string)) {
      const idFonctionnalite:number = parseInt(this.route.snapshot.queryParamMap.get('fonctionnalite') as string);
      this.fonctionnaliteService.getFonctionnaliteById(idFonctionnalite).subscribe( data => {
        const project:Projet = data.backlog.projet;
        this.sessionStorage.saveDataToSessionStorage('projetWorking',project.idProjet);
        this.checkSession();
      });
    } else if(this.route.snapshot.queryParamMap.get('tache') && !this.sessionStorage.getDataFromSessionStorage('projetWorking') ||
      this.route.snapshot.queryParamMap.get('tache') && 
      this.sessionStorage.getDataFromSessionStorage('projetWorking') != parseInt(this.route.snapshot.queryParamMap.get('projet') as string)) {
        const idProjet:number = parseInt(this.route.snapshot.queryParamMap.get('projet') as string);
        this.projetService.getProjetById(idProjet).subscribe( projet => {
          const project:Projet = projet;
          this.sessionStorage.saveDataToSessionStorage('projetWorking',project.idProjet);
          this.checkSession();
        })
    } else {
      this.getFonctionnalitesProjet();
      this.idProjet = this.sessionStorage.getDataFromSessionStorage('projetWorking');
      this.projetService.getProjetById(this.idProjet).subscribe( data => {
        this.projetInWork = data;
        console.log(this.projetInWork);
        this.getSprints(this.projetInWork);
        this.fichierService.getUsersPhoto().subscribe( data => {
          this.photos = data;
          this.getBacklogResponsables(this.projetInWork);
          this.getBacklogScrumMasters(this.projetInWork);
          this.getBacklogDeveloppers(this.projetInWork);
          this.getFonctionnaliteResponsables(this.projetInWork.idProjet);
          this.getFonctionnaliteScrumMasters(this.projetInWork.idProjet);
          this.getFonctionnaliteDeveloppers(this.projetInWork.idProjet);
          this.getTachesProjet(this.projetInWork);
          if(this.sessionStorage.getDataFromSessionStorage('projetWorking')) this.getBacklogs(true);
        });
        this.getFichiersCommentaires();
      });
    }
  }

  voirProjetDetail(idProjet:number) {
    this.modalService.dismissAll();
    this.router.navigate(['/ProjetProfile/'+idProjet]);
  }

  open(content:any) {
    this.projetService.list().subscribe( dataProjets => {
      for(let projet of dataProjets) {
        if(projet.dateDebut && projet.dateFin) {
          const startDateStr = projet.dateDebut;
          const endDateStr = projet.dateFin;

          const now = new Date();
          const startDate = new Date(startDateStr);
          const endDate = new Date(endDateStr);

          const diffInMs = endDate.getTime() - now.getTime();
          const init = endDate.getTime() - startDate.getTime();
          const daysLeft = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
          const initDays = Math.floor(init / (1000 * 60 * 60 * 24));
          projet.daysLeft = daysLeft;
          projet.avancementJ = parseFloat(((((daysLeft * 100)/initDays)-100)*-1).toFixed(2));
          
          let finished:number = 0, notFinished = 0;
          this.backlogService.getBacklogByIdProjet(projet.idProjet).subscribe( backlogs => {
            for(let backlog of backlogs) {
              if(backlog.etat == 'Terminé') finished++;
              else notFinished++;
            }
            projet.avancementP = (finished*100)/(finished+notFinished);
          });
        }
        if(projet.dateDebut) {projet.dateDebut = formatDate(projet.dateDebut, 'dd-MM-yyyy', 'en-US');}
        if(projet.dateDebut == null) {projet.dateDebut = '';}
        if(projet.dateFin) {projet.dateFin = formatDate(projet.dateFin, 'dd-MM-yyyy', 'en-US');}
        if(projet.dateFin == null) {projet.dateFin = '';}
      }
      this.allProjects = dataProjets;
    });
    this.modalService.open(content, { size: 'xl', backdrop: 'static' });
  }

  choixProjet(idProjet:number) {
    this.modalService.dismissAll();
    this.sessionStorage.saveDataToSessionStorage('projetWorking',idProjet);
    this.idProjet = this.sessionStorage.getDataFromSessionStorage('projetWorking');
    this.projetService.getProjetById(this.idProjet).subscribe( dataProjets => {
      this.projetInWork = dataProjets;
      this.checkSession();
    });
  }

  /*--------------------------------- Backlog -------------------------------------*/ 

  openFileInput() {
    console.log(this.fileInput);
    this.fileInput.nativeElement.click();
  }

  openBacklogModal(content:any,idBacklog:number) {
    this.tacheService.getTacheByBacklog(idBacklog).subscribe( taches => {
      this.tachesFonctionnalite2 = taches;
    });
    this.getBacklogById(idBacklog);
    this.getCommentairesBacklog(idBacklog);
    this.modalService.open(content, { size: 'xl', backdrop: 'static' });
  }

  openBacklogUpdate(content:any,backlog:Backlog) {
    this.backlogService.getBacklogById(backlog.id).subscribe( data => {
      if(data.termine) data.termine = formatDate(data.termine, 'yyyy-MM-dd hh:mm', 'en-US');
      if(data.dateDebut) data.dateDebut = formatDate(data.dateDebut, 'yyyy-MM-dd', 'en-US');
      if(data.dateFin) data.dateFin = formatDate(data.dateFin, 'yyyy-MM-dd', 'en-US');
      this.backlogUpdate = data;
      console.log(this.backlogUpdate);
    });
    this.open(content);
  }

  createBacklog() {
    this.newBacklog = new Backlog();
    this.newBacklog.etat = 'en attente';
    this.newBacklog.priorite = 1;
    this.newBacklog.storyPoint = 1;
    this.newBacklog.nom = this.backlogName;
    this.newBacklog.abbreviate = this.backlogAbbr;
    this.newBacklog.projet = new Projet(this.user);
    this.newBacklog.projet.idProjet = this.projetInWork.idProjet;
    this.newBacklog.projet.nom = this.projetInWork.nom;
    this.newBacklog.idCreateur = new User();
    this.newBacklog.idCreateur.id = this.login.getId();
    this.newBacklog.position = this.backlogsProjet.length + 1;
    this.backlogService.create(this.newBacklog,this.login.getId()).subscribe( data => {
      this.getBacklogs();
      this.newBacklogBool = false;
      this.backlogName = '';
      this.backlogAbbr = '';
    });
    if(this.projetInWork.etat != 'En progrès') {
      this.projetInWork.etat = 'En progrès';
      this.projetInWork.dateTermine = null;
      this.projetService.update(this.projetInWork.idProjet,this.projetInWork,this.login.getId()).subscribe( project => {
        this.projetInWork = project;
      });
    }
  }

  extractNumberStart(input: string): number | null {
    const regex = /^\d+/;
    const match = input.match(regex);
    if (match) {
      return parseInt(match[0], 10);
    }
    return null;
  }

  extractNumberEnds(input: string): number | null {
    const pattern = /(\d+)$/; 
    const match = input.match(pattern);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return null;
  }

  getAbbreviation() {
    if(this.backlogName) {
      this.backlogAbbr = '';
      let ans:string[] = this.backlogName.split(' ');
      for(let i = 0; i < ans.length; i++) {
        if(this.extractNumberStart(ans[i])) {
          this.backlogAbbr = this.backlogAbbr + this.extractNumberStart(ans[i]);
          ans[i] = '';
        }
        this.backlogAbbr = this.backlogAbbr + ans[i].charAt(0).toUpperCase();
        if(this.extractNumberEnds(ans[i])) this.backlogAbbr = this.backlogAbbr + this.extractNumberEnds(ans[i]);
      }
      if(this.backlogsProjet) {
        if(this.backlogsProjet.find(resp => resp.abbreviate == this.backlogAbbr)) {
          let backlogAbbreviate:Backlog[] = this.backlogsProjet.filter(resp => resp.abbreviate == this.backlogAbbr)
          this.backlogAbbr = this.backlogAbbr + ' (' +(backlogAbbreviate.length + 1) + ')';
        }
      }
    } else this.backlogAbbr = '';
  }

  getBacklogs(isInit?:boolean) {
    this.backlogService.getBacklogByIdProjet(this.sessionStorage.getDataFromSessionStorage('projetWorking')).subscribe( data => {
      this.backlogsProjet = data;
      this.sprintBacklogService.getSprintBacklogByIdProjet(this.idProjet).subscribe( spb => {
        this.sprintsBacklog = spb;
        for(let i = 0; i < this.backlogsProjet.length; i++) {
          const spbAtBacklog:SprintBacklog[] = this.sprintsBacklog.filter(resp => resp.backlog.id == this.backlogsProjet[i].id);
          if(spbAtBacklog) {
            this.backlogsProjet[i].sprints = [];
            for(let spb of spbAtBacklog) {
              this.backlogsProjet[i].sprints.push(spb.sprint);
            }
          }
        }
      });
      if(isInit == true) {
        if(this.route.snapshot.queryParamMap.get('backlog')) {
          const backlog:number = parseInt(this.route.snapshot.queryParamMap.get('backlog') as string);
          const backlogToOpen = this.backlogsProjet.find(resp => resp.id == backlog);
          if(backlogToOpen) this.openBacklogModal(this.backlogDetail,backlogToOpen.id);
        }
        if(this.route.snapshot.queryParamMap.get('fonctionnalite')) {
          const idFonctionnalite:number = parseInt(this.route.snapshot.queryParamMap.get('fonctionnalite') as string);
          const fonctionnaliteToOpen = this.fonctionnalitesBacklog.find(resp => resp.id == idFonctionnalite);
          const backlogToOpen = this.backlogsProjet.find(resp => resp.id == fonctionnaliteToOpen?.backlog.id);
          if(backlogToOpen) {
            this.openBacklogModal(this.backlogDetail,backlogToOpen.id);
            if(fonctionnaliteToOpen) this.openFonctionnaliteModal(this.fonctionnaliteDetail,fonctionnaliteToOpen);
          }
        }
        if(this.route.snapshot.queryParamMap.get('tache')) {
          const idTache:number = parseInt(this.route.snapshot.queryParamMap.get('tache') as string);
          const tacheToOpen = this.tachesFonctionnalite.find(resp => resp.idTache == idTache);
          const fonctionnaliteToOpen = this.fonctionnalitesBacklog.find(resp => resp.id == tacheToOpen?.fonctionnalite.id);
          const backlogToOpen = this.backlogsProjet.find(resp => resp.id == fonctionnaliteToOpen?.backlog.id);
          if(backlogToOpen) {
            this.openBacklogModal(this.backlogDetail,backlogToOpen.id);
            if(fonctionnaliteToOpen) {
              this.openFonctionnaliteModal(this.fonctionnaliteDetail,fonctionnaliteToOpen);
              if(tacheToOpen) this.openTacheModal(this.tacheDetail,tacheToOpen);
            }
          }
        }
      }
      console.log(this.backlogsProjet);
    });
  }

  getBacklogById(idBacklog:number) {
    this.responsableBacklogFiltered = [];
    this.scrumMastersBacklogFiltered = [];
    this.developersBacklogFiltered = [];
    this.backlogService.getBacklogById(idBacklog).subscribe( data => {
      this.priority = data.priorite;
      if(data.dateDebut) {
        const dateDebut = new Date(data.dateDebut);
        data.dateMin = data.dateDebut
        data.dateDebut = dateDebut.toLocaleDateString();
      }
      if(data.dateFin) {
        const dateFin = new Date(data.dateFin);
        data.dateMax = data.dateFin
        data.dateFin = dateFin.toLocaleDateString();
      }
      if(data.termine) {
        data.termine = formatDate(data.termine, 'dd-MM-yyyy HH:mm', 'en-US');
      }
      if(data.idCreateur) {
        this.fichierService.getFichierByUserId(data.idCreateur.id).subscribe( photo => {
          data.idCreateur.photo = photo.nom;
        });
      }
      if(this.responsablesBacklog && this.responsablesBacklog.filter(resp => resp.backlog.id == data.id)) {
        this.responsableBacklogSelected = this.responsablesBacklog.filter(resp => resp.backlog.id == data.id);
        if(this.responsableBacklogSelected) {
          for(let user of this.responsableBacklogSelected) {
            if(user.idResponsable && this.photos.find( resp => resp.user.id == user.idResponsable.id)) {
              user.idResponsable.photo = this.photos.find( resp => resp.user.id == user.idResponsable.id)!.nom;
            }
          }
        }
      }
      if(this.scrumMastersBacklog && this.scrumMastersBacklog.filter(resp => resp.backlog.id == data.id)) {
        this.scrumMastersBacklogSelected = this.scrumMastersBacklog.filter(resp => resp.backlog.id == data.id);
        if(this.scrumMastersBacklogSelected) {
          for(let user of this.scrumMastersBacklogSelected) {
            if(user.idScrumMaster && this.photos.find( resp => resp.user.id == user.idScrumMaster.id)) {
              user.idScrumMaster.photo = this.photos.find( resp => resp.user.id == user.idScrumMaster.id)!.nom;
            }
          }
        }
      }
      if(this.developersBacklog && this.developersBacklog.filter(resp => resp.backlog.id == data.id)) {
        this.developersBacklogSelected = this.developersBacklog.filter(resp => resp.backlog.id == data.id);
        if(this.developersBacklogSelected) {
          for(let user of this.developersBacklogSelected) {
            if(user.idDevellopers && this.photos.find( resp => resp.user.id == user.idDevellopers.id)) {
              user.idDevellopers.photo = this.photos.find( resp => resp.user.id == user.idDevellopers.id)!.nom;
            }
          }
        }
      }
      this.backlogSelected = data;
      this.getBacklogResponsablesToAssign();
      this.getBacklogScrumMastersToAssign();
      this.getBacklogDevelopersToAssign();
    });
  }

  setBacklogToPasValable(backlog:Backlog) {
    backlog.etat = 'Pas valable';
    this.updateBacklogSelected(backlog,true);
  }

  setBacklogToEnAttente(backlog:Backlog) {
    backlog.etat = 'en attente';
    this.updateBacklogSelected(backlog);
  }

  setBacklogToValable(backlog:Backlog) {
    backlog.etat = 'Valable';
    this.updateBacklogSelected(backlog);
  }

  setBacklogToTermine(backlog:Backlog) {
    backlog.etat = 'Terminé';
    this.updateBacklogSelected(backlog,true);
  }

  setPriority() {
    this.backlogSelected.priorite = this.priority;
    this.updateBacklogSelected(this.backlogSelected);
  }

  setStoryPoint(content:any) {
    if(this.projetInWork.dateDebut) {
      let backlogs:Backlog[] = this.backlogsProjet.sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime());
      backlogs = backlogs.filter(resp => resp.etat != 'Pas valable' && resp.dateFin);
      this.backl = backlogs;
      if(backlogs.length < 1) {
        this.backDateDebut = this.projetInWork.dateDebut;
        let enddd:number = new Date(this.projetInWork.dateDebut).getDate() + (this.backlogSelected.storyPoint*2) - 1;
        let endmm:number = new Date(this.projetInWork.dateDebut).getMonth() + 1;
        let endyy:number = new Date(this.projetInWork.dateDebut).getFullYear();

        if((endmm == 1 || endmm == 3 || endmm == 5 || endmm == 7 || endmm == 8 || endmm == 10 || endmm == 12) && enddd > 30) {
          enddd = 1;
          if(endmm < 12) endmm++;
          else endyy++; endmm = 1;
        } else if((endmm == 2 || endmm == 4 || endmm == 6 || endmm == 9 || endmm == 11) && enddd > 29) {
          enddd = 1
          if(endmm < 12) endmm++;
          else endyy++; endmm = 1;
        }
        this.backDateFin = endyy+'-'+endmm+'-'+enddd;
        console.log(this.backDateDebut +'-'+ this.backDateFin);
      } else {
        backlogs = backlogs.sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());
        console.log(backlogs);
        if(!backlogs.filter(resp => resp.dateDebut != this.projetInWork.dateDebut)) {
          let enddd:number = new Date(this.projetInWork.dateDebut).getDate() + (this.backlogSelected.storyPoint*2) - 1;
          let endmm:number = new Date(this.projetInWork.dateDebut).getMonth() + 1;
          let endyy:number = new Date(this.projetInWork.dateDebut).getFullYear();

          if((endmm == 1 || endmm == 3 || endmm == 5 || endmm == 7 || endmm == 8 || endmm == 10 || endmm == 12) && enddd > 31) {
            enddd = enddd - 31;
            if(endmm == 12) {endyy++; endmm = 1;}
            else endmm++;
          } else if((endmm == 4 || endmm == 6 || endmm == 9 || endmm == 11) && enddd > 30) {
            enddd = enddd - 30;
            endmm++;
          } else if(endmm == 2 && enddd > 29) {
            enddd = enddd - 29;
            endmm++;
          }

          if(!backlogs.filter(resp => new Date(resp.dateDebut) < new Date(endyy+'-'+endmm+'-'+enddd))) {
            this.backDateDebut = this.projetInWork.dateDebut;
            this.backDateFin = endyy+'-'+endmm+'-'+enddd;
          }
        } else {
          let enddd:number = new Date(backlogs[backlogs.length - 1].dateFin).getDate() + 1;
          let endmm:number = new Date(backlogs[backlogs.length - 1].dateFin).getMonth() + 1;
          let endyy:number = new Date(backlogs[backlogs.length - 1].dateFin).getFullYear();

          if((endmm == 1 || endmm == 3 || endmm == 5 || endmm == 7 || endmm == 8 || endmm == 10 || endmm == 12) && enddd > 31) {
            enddd = enddd - 31;
            if(endmm == 12) {endyy++; endmm = 1;}
            else endmm++;
          } else if((endmm == 4 || endmm == 6 || endmm == 9 || endmm == 11) && enddd > 30) {
            enddd = enddd - 30;
            endmm++;
          } else if(endmm == 2 && enddd > 29) {
            enddd = enddd - 29;
            endmm++;
          }
          this.backDateDebut = endyy+'-'+endmm+'-'+enddd;
          enddd = new Date(backlogs[backlogs.length - 1].dateFin).getDate() + (this.backlogSelected.storyPoint*2);
          endmm = new Date(backlogs[backlogs.length - 1].dateFin).getMonth() + 1;
          endyy = new Date(backlogs[backlogs.length - 1].dateFin).getFullYear();
          if((endmm == 1 || endmm == 3 || endmm == 5 || endmm == 7 || endmm == 8 || endmm == 10 || endmm == 12) && enddd > 31) {
            enddd = enddd - 31;
            if(endmm == 12) {endyy++; endmm = 1;}
            else endmm++;
          } else if(( endmm == 4 || endmm == 6 || endmm == 9 || endmm == 11) && enddd > 30) {
            enddd = enddd - 30;
            endmm++;
          } else if(endmm == 2 && enddd > 29) {
            enddd = enddd - 29;
            endmm++;
          }
          this.backDateFin = endyy+'-'+endmm+'-'+enddd;
          console.log(backlogs[backlogs.length - 1].dateFin);
        }
      }
      console.log(this.backDateDebut +'-'+ this.backDateFin);
      this.modalService.open(content, { size: 'md', backdrop: 'static' });
    }
  }

  proposition(ans:boolean) {
    if(ans == true) {
      let debut = new Date(this.backDateDebut);
      let fin = new Date(this.backDateFin);
      // if(this.backl.length > 0) debut.setDate(debut.getDate() + 1);
      // fin.setDate(fin.getDate() + 1);
      this.backlogSelected.dateDebut = this.backDateDebut;
      this.backlogSelected.dateFin = this.backDateFin;
      console.log(debut.toString());
    }
    this.updateBacklogSelected(this.backlogSelected);
    console.log(this.backlogSelected);
    this.modalService.dismissAll();
  }

  sortByPriority() {
    this.backlogsProjet.sort((a, b) => b.priorite - a.priorite);
    this.tri = 'priorité';
  }

  sortByDateFin() {
    this.backlogsProjet.sort((a, b) => new Date(a.dateFin).getTime() - new Date(b.dateFin).getTime());
    this.tri = 'date d echeance';
  }

  sortByDateDebut() {
    this.backlogsProjet.sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime())
    this.tri = 'date de debut';
  }

  addDateDebutToBacklog(idBacklog:number) {
    this.addDebutTache = false;
    this.backlogService.getBacklogById(idBacklog).subscribe( dataBacklog => {
      dataBacklog.dateDebut = this.dateDebut;
      this.backlogService.update(idBacklog,dataBacklog,this.login.getId()).subscribe( data => {
        this.getBacklogs();
        this.getBacklogById(idBacklog);
        this.dateDebut = new Date();
      });
    });
  }

  addDateFinToBacklog(idBacklog:number) {
    this.addFinTache = false;
    this.backlogService.getBacklogById(idBacklog).subscribe( dataBacklog => {
      dataBacklog.dateFin = this.dateFin;
      this.backlogService.update(idBacklog,dataBacklog,this.login.getId()).subscribe( data => {
        this.getBacklogs();
        this.getBacklogById(idBacklog);
        this.dateFin = new Date();
      });
    });
  }

  convertDateFormat(inputDate: string): string {
    // Parse the input date in dd/MM/yyyy format
    let dateParts,day,month,year,parsedDate;
    if(inputDate.includes('/') || inputDate.includes('-')) {
      if(inputDate.includes('/')) dateParts = inputDate.split('/');
      else if(inputDate.includes('-')) dateParts = inputDate.split('-');
      day = parseInt(dateParts[0]);
      month = parseInt(dateParts[1]) - 1; // JavaScript months are 0-based
      year = parseInt(dateParts[2]);
    }
    parsedDate = new Date(year, month, day);
  
    // Format the date in yyyy-MM-dd format
    const formattedDate = parsedDate.toLocaleDateString('en-CA'); // 'en-CA' sets the format to yyyy-MM-dd
    return formattedDate;
  }

  updateBacklogSelected(backlog:Backlog,update?:boolean) {
    if(this.sprintsBacklog.filter(resp => resp.backlog.id == backlog.id)) {
      let spbkg:SprintBacklog[] = this.sprintsBacklog.filter(resp => resp.backlog.id == backlog.id);
      let sprints:Sprint[] = [];
      for(let sprt of spbkg) {
        if(sprt.sprint) sprints.push(sprt.sprint)
      }
      for(let sprint of sprints) {
        this.sprintService.getSprintById(sprint.idSprint).subscribe( sprt => {
          if(!sprt.date_debut || sprt.date_debut && backlog.dateDebut && new Date(this.convertDateFormat(backlog.dateDebut)) < new Date(sprt.date_debut)) {
            sprt.date_debut = new Date(this.convertDateFormat(backlog.dateDebut));
            console.log('date-debut');
          }
          if(!sprt.date_fin || sprt.date_fin && backlog.dateFin && new Date(this.convertDateFormat(backlog.dateFin)) > new Date(sprt.date_fin)) {
            sprt.date_fin = new Date(this.convertDateFormat(backlog.dateFin));
            console.log('date-fin');
          }
          console.log(sprt);
          this.sprintService.update(sprt.idSprint, sprt, this.login.getId()).subscribe( sprint => {
            this.getSprints(this.projetInWork);
          });
        });
      }
    }
    this.backlogService.getBacklogById(backlog.id).subscribe( finalBacklog => {
      console.log(backlog);
      if(backlog.dateDebut) {
        if(backlog.dateDebut.includes('/')) backlog.dateDebut = this.convertDateFormat(backlog.dateDebut);
        finalBacklog.dateDebut = new Date(formatDate(backlog.dateDebut, 'yyyy-MM-dd', 'en-US'));
      }
      else finalBacklog.dateDebut = null;
      if(backlog.dateFin) {
        if(backlog.dateFin.includes('/')) backlog.dateFin = this.convertDateFormat(backlog.dateFin);
        finalBacklog.dateFin = new Date(formatDate(backlog.dateFin, 'yyyy-MM-dd', 'en-US'));
      }
      else finalBacklog.dateFin = null;
      finalBacklog.nom = backlog.nom;
      finalBacklog.description = backlog.description;
      finalBacklog.priorite = backlog.priorite;
      finalBacklog.position = backlog.position;
      finalBacklog.etat = backlog.etat;
      finalBacklog.abbreviate = backlog.abbreviate;
      finalBacklog.storyPoint = backlog.storyPoint;
      console.log(finalBacklog);
      this.backlogService.update(finalBacklog.id,finalBacklog,this.login.getId()).subscribe( backlogUpdated => {
        console.log(backlogUpdated);
        this.getBacklogs();
        alert('Backlog mis à jour avec succès');
        this.getBacklogById(backlog.id);
        if(update) {
          this.backlogService.getBacklogByIdProjet(this.idProjet).subscribe( projetbacklog => {
            this.backlogsProjet = projetbacklog;console.log(this.backlogsProjet);
            if(this.backlogsProjet.filter(resp => resp.etat != 'Terminé' && resp.etat != 'Pas valable').length > 0) {console.log('misy tsy vita');}
            else {
              this.projetService.getProjetById(this.projetInWork.idProjet).subscribe( project => {
                project.etat = 'Terminé';
                project.dateTermine = new Date();
                this.projetService.update(project.idProjet,project,this.login.getId()).subscribe( data => {
                  this.projetInWork = data;
                  console.log(this.projetInWork);
                })
              });
            }
            this.sprintBacklogService.getSprintBacklogByIdProjet(this.idProjet).subscribe( spbcklgGotten => {
              const spbcklg1:SprintBacklog[] = this.sprintsBacklog.filter(resp => resp.backlog.id == backlog.id);
              let sprintsBacklogID:number[] = [];
              for(let spb of spbcklg1) sprintsBacklogID.push(spb.sprint.idSprint)
              for(let i of sprintsBacklogID) {
                const spbcklg2:SprintBacklog[] = this.sprintsBacklog.filter(resp => resp.sprint.idSprint == i);
                let counter = 0;
                for(let spb of spbcklg2) {
                  if(spb.backlog.etat == 'Terminé' || spb.backlog.etat == 'Pas valable') counter++;
                  else break;
                }
                if(counter == spbcklg2.length) {
                  const sprintToFinish:Sprint | undefined = this.sprintsProjet.find(resp => resp.idSprint == i);
                  this.sprintService.getSprintById(sprintToFinish!.idSprint).subscribe(sprintSelected => {
                    sprintSelected.etat = 'Terminé';
                    console.log(sprintSelected);
                    this.sprintService.update(sprintSelected.idSprint,sprintSelected,this.login.getId()).subscribe(sprintUpdated => {
                      this.getSprintById(sprintSelected);
                      this.getSprints(this.projetInWork);
                    });
                  });
                } else console.log('misy backlog mbola tsy vita ny sprint id ='+i+' ctr = '+counter+' < '+spbcklg2.length);
              }
            });
            this.getBacklogs();
          })
        }
      });
    });
  }

  onDropBacklog(event: CdkDragDrop<Backlog[]>) {
    moveItemInArray(this.backlogsProjet, event.previousIndex, event.currentIndex);
    this.backlogService.savePosition(this.backlogsProjet).subscribe( data => {
      this.getBacklogs();
    });
  }

  onDropBacklogToSprint(event: CdkDragDrop<Backlog[]>,sprint:Sprint) {
    if(this.backlogsProjet.find(resp => resp == event.item.data)) {
      const backlogDragged:Backlog = this.backlogsProjet.find(resp => resp == event.item.data)!;
      if(this.sprintsBacklog.find(resp => resp.backlog && resp.backlog.id == backlogDragged.id && resp.sprint && resp.sprint.idSprint == sprint.idSprint)) {
        console.log('sprint already exist in backlog');
      } else {
        let newSprintBacklog:SprintBacklog = new SprintBacklog();
        newSprintBacklog.backlog = new Backlog();
        newSprintBacklog.backlog.id = backlogDragged.id;
        newSprintBacklog.sprint = new Sprint();
        newSprintBacklog.sprint.idSprint = sprint.idSprint;
        newSprintBacklog.projet = new Projet();
        newSprintBacklog.projet.idProjet = this.projetInWork.idProjet;
        this.sprintBacklogService.create(newSprintBacklog).subscribe( data => {
          this.getBacklogs();
        });
        if(backlogDragged.dateDebut && sprint || backlogDragged.dateFin && sprint) {
          console.log(backlogDragged);
          let isUpdated = false;
          if(!sprint.date_debut || new Date(this.convertDateFormat(sprint.date_debut)) > new Date(backlogDragged.dateDebut)) {
            sprint.date_debut = backlogDragged.dateDebut; isUpdated= true;
          }
          if(!sprint.date_fin || new Date(this.convertDateFormat(sprint.date_fin)) < new Date(backlogDragged.dateFin)) {
            sprint.date_fin = backlogDragged.dateFin; isUpdated= true;
          }
          if(isUpdated) {
            if(sprint.date_debut.includes('/')) sprint.date_debut = this.convertDateFormat(sprint.date_debut);
            if(sprint.date_fin.includes('/')) sprint.date_fin = this.convertDateFormat(sprint.date_fin);
            console.log(sprint);
            this.sprintService.getSprintById(sprint.idSprint).subscribe(sprintGotten => {
              if(sprint.date_debut) sprintGotten.date_debut = new Date(sprint.date_debut);
              if(sprint.date_fin) sprintGotten.date_fin = new Date(sprint.date_fin);
              console.log(sprintGotten)
              this.sprintService.update(sprintGotten.idSprint,sprintGotten,this.login.getId()).subscribe( sprints => {
                console.log(sprints);
                this.getSprints(this.projetInWork);
              })
            });
          } else console.log('tsy nihetsika')
        }
      }
    }
  }

  insertResponsableToBacklog(backlog:Backlog,responsable:User) {
    this.newResponsableBacklog.idResponsable = responsable;
    this.newResponsableBacklog.backlog = backlog;
    this.newResponsableBacklog.projet = this.projetInWork;
    this.newResponsableBacklog.idCreateur = new User();
    this.newResponsableBacklog.idCreateur.id = this.login.getId();
    // this.responsableService.create(this.newResponsableBacklog)
  }

  getBacklogResponsables(projet:Projet) {
    this.responsableService.getResponsableBacklogInProject(projet.idProjet).subscribe( data => {
      for(let responsable of data) {
        if(responsable.idResponsable && this.photos.find( resp => resp.user.id == responsable.idResponsable.id)) {
          responsable.idResponsable.photo = this.photos.find(resp => resp.user.id == responsable.idResponsable.id)!.nom;
        }
      }
      this.responsablesBacklog = data;
    });
  }

  getBacklogScrumMasters(projet:Projet) {
    this.responsableService.getResponsableBacklogInProject(projet.idProjet).subscribe( data => {
      for(let scrumMaster of data) {
        if(scrumMaster.idScrumMaster && this.photos.find( resp => resp.user.id == scrumMaster.idScrumMaster.id)) {
          scrumMaster.idScrumMaster.photo = this.photos.find(resp => resp.user.id == scrumMaster.idScrumMaster.id)!.nom;
        }
      }
      this.scrumMastersBacklog = data;
    });
  }

  getBacklogDeveloppers(projet:Projet) {
    this.responsableService.getResponsableBacklogInProject(projet.idProjet).subscribe( data => {
      for(let develloper of data) {
        if(develloper.idDevellopers && this.photos.find( resp => resp.user.id == develloper.idDevellopers.id)) {
          develloper.idDevellopers.photo = this.photos.find(resp => resp.user.id == develloper.idDevellopers.id)!.nom;
        }
      }
      this.developersBacklog = data;
    });
  }

  onDropBacklogInSprint(event:CdkDragDrop<Backlog[]>,sprint:Sprint) {
    moveItemInArray(this.backlogsProjet.filter(resp => resp.sprint!.idSprint == sprint.idSprint), event.previousIndex, event.currentIndex);
  }

  /*--------------------------------- Commentaire -------------------------------------*/

  getFichiersCommentaires() {
    this.fichierService.getCommentairesFichiers().subscribe( data => {
      this.fichiersCommentairesBacklog = data;
    });
  }

  getCommentaireFile(commentaire:Commentaire):string | undefined {
    return this.fichiersCommentairesBacklog.find(resp => resp.commentaire.idCommentaire == commentaire.idCommentaire)?.nom;
  }

  uploadFileCommentBacklog(event:any,submitForm: FormGroup) {
    this.fichiersBacklog = event.target.files;
    this.fileNameBacklog = this.fichiersBacklog[0].name;
  }

  commentaireWithFileBacklog(submitForm: FormGroup) {
    this.saveCommentFileBacklog(submitForm);
  }

  saveCommentFileBacklog(submitForm: FormGroup) {
    if(submitForm.valid){
      const losika=submitForm.value;
      const formData  = new FormData ();
      formData.append('projet',JSON.stringify(losika)); 
      for (const file of this.fichiersBacklog) { 
    
        formData.append('tdrName',file,file.name);
        console.log(file.name);
      }
      this.fichierService.saveCommentFileBacklog(this.backlogSelected.id,this.projetInWork.idProjet,formData,this.login.getId(),this.newCommentaireBacklog.commentaire).subscribe(
        event => {
          console.log(event);
          this.newCommentaireBacklog = new Commentaire;
          this.fileNameBacklog = '';
          this.getCommentairesBacklog(this.backlogSelected.id);
          this.getFichiersCommentaires();
        },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
    } else {
      console.log(submitForm);
    }
  }

  onDownloadFileCommentaire(commentaire: Commentaire): void {
    let resp = '';
    for(let file of this.fichiersCommentairesBacklog) {
      if(file.commentaire.idCommentaire == commentaire.idCommentaire) {
        this.fichierService.download(file.nom).subscribe(
          event => {
            console.log(event);
            this.resportProgress(event);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
        break;
      }
    }
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  getCommentairesBacklog(idBacklog:number) {
    this.commentaireService.getCommentaireByIdBacklog(idBacklog).subscribe( data => {
      for(let comm of data) {
        comm.updating = false;
        const date = new Date(comm.temp);
        comm.temp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        for(let image of this.photos) {
          if(comm.createur.id == image.user.id) { comm.createur.photo = image.nom; }
        }
      }
      this.commentairesBacklog = data;
    });
  }

  commenterBacklog(backlog:Backlog) {
    this.backlogService.getBacklogById(backlog.id).subscribe( data => {
      this.newCommentaireBacklog.backlog = data;
      this.newCommentaireBacklog.createur = new User();
      this.newCommentaireBacklog.createur.id = this.login.getId();
      this.commentaireService.create(this.newCommentaireBacklog,this.login.getId()).subscribe(data => {
        console.log(data);
        alert('successfully');
        this.newCommentaireBacklog = new Commentaire();
        this.getCommentairesBacklog(backlog.id);
        this.getFichiersCommentaires();
      },
      error => console.log(error));
    });
  }

  deleteBacklog(backlog:Backlog) {
    if (window.confirm('Are sure you want to delete this '),backlog.nom,' ?') {
      this.backlogService.delete(backlog.id,this.login.getId()).subscribe(data => {
        this.getBacklogs();
        this.modalService.dismissAll();
      });
    }
  }

  updateCommentaireBacklog(idCommentaire:number,commentaire:Commentaire,backlog:Backlog) {
    if(commentaire.updating == false) commentaire.updating = true;
    else {
      commentaire.temp = '';
      this.commentaireService.update(idCommentaire,commentaire,this.login.getId()).subscribe( data => {
        commentaire.updating = false;
        this.getCommentairesBacklog(backlog.id);
      });
    }
  }  

  deleteCommentaireBacklog(idComm:number,backlog:Backlog) {
    this.commentaireService.delete(idComm,this.login.getId()).subscribe( data => {
      this.getCommentairesBacklog(backlog.id);
    });
  }

  /*--------------------------------- Fonctionnalite -------------------------------------*/

  getAvanceFonctionnalite(fonctionnalite:Fonctionnalite):number {
    // this.getTacheFonctionnalite(fonctionnalite);
    let avance:number = 0;
    if(this.tachesFonctionnalite2) {
      const tacheFonction:Tache[] = this.tachesFonctionnalite2.filter(resp => resp.fonctionnalite.id == fonctionnalite.id);
      for(let tache of tacheFonction) {
        avance = avance + tache.avance;
      }
      avance = avance / tacheFonction.length;
    } else avance = 0;
    if(!avance) avance = 0;
    return avance;
  }
  
  getFonctionnalitesProjet(update?:boolean) {
    this.fonctionnaliteService.list().subscribe( data => {
      for(let fonctionnalite of data) {
        if(fonctionnalite.dateDebut) {
          const dateDebut = new Date(fonctionnalite.dateDebut);
          fonctionnalite.dateDebut = dateDebut.toLocaleDateString();
        }
        if(fonctionnalite.dateFin) {
          const dateFin = new Date(fonctionnalite.dateFin);
          fonctionnalite.dateFin = dateFin.toLocaleDateString();
        }
        if(fonctionnalite.termine) {
          fonctionnalite.termine = formatDate(fonctionnalite.termine, 'dd-MM-yyyy HH:mm', 'en-US');
        }
        if(fonctionnalite.idCreateur) {
          this.fichierService.getFichierByUserId(fonctionnalite.idCreateur.id).subscribe( photo => {
            fonctionnalite.idCreateur.photo = photo.nom;
          });
        }
      }  
      this.fonctionnalitesBacklog = data;
      if(update == true) {
        if(this.selectedValue == 100) {
          let count = 0;
          const functionnality:Fonctionnalite[] = this.fonctionnalitesBacklog.filter(resp => resp.backlog.id == this.backlogSelected.id);
          console.log(functionnality);
          for(let fonction of functionnality) {
            if(fonction.etat == 'Terminé') count++;
            else break;
          }
          if(count == functionnality.length) {
            this.backlogSelected.etat = 'Terminé';
            this.updateBacklogSelected(this.backlogSelected,true);
          }
        } else if(this.selectedValue > 0 && this.selectedValue < 100) {
          console.log('backlog >0 <100');
          if(this.backlogSelected.etat != 'Valable') {
            this.backlogSelected.etat = 'Valable';
            this.updateBacklogSelected(this.backlogSelected,true);
          }
        }
      }
    });
  }

  getFonctionnaliteResponsables(idProjet:number) {
    this.responsableService.getResponsableFonctionnaliteInBacklog(idProjet).subscribe( data => {
      for(let responsable of data) {
        if(responsable.idResponsable && this.photos.find( resp => resp.user.id == responsable.idResponsable.id)) {
          responsable.idResponsable.photo = this.photos.find(resp => resp.user.id == responsable.idResponsable.id)!.nom;
        }
      }
      this.responsablesFonctionnalite = data;
    });
  }

  getFonctionnaliteScrumMasters(idProjet:number) {
    this.responsableService.getResponsableFonctionnaliteInBacklog(idProjet).subscribe( data => {
      for(let scrumMaster of data) {
        if(scrumMaster.idResponsable && this.photos.find( resp => resp.user.id == scrumMaster.idResponsable.id)) {
          scrumMaster.idResponsable.photo = this.photos.find(resp => resp.user.id == scrumMaster.idResponsable.id)!.nom;
        }
      }
      this.scrumMastersFonctionnalite = data;
    });
  }

  getFonctionnaliteDeveloppers(idProjet:number) {
    this.responsableService.getResponsableFonctionnaliteInBacklog(idProjet).subscribe( data => {
      for(let develloper of data) {
        if(develloper.idDevellopers && this.photos.find( resp => resp.user.id == develloper.idDevellopers.id)) {
          develloper.idDevellopers.photo = this.photos.find(resp => resp.user.id == develloper.idDevellopers.id)!.nom;
        }
      }
      this.developersFonctionnalite = data;
      console.log(this.developersFonctionnalite);
    });
  }

  getFonctionnaliteById(fonctionnalite:Fonctionnalite) {
    this.responsableFonctionnaliteFiltered = [];
    this.scrumMastersFonctionnaliteFiltered = [];
    this.developersFonctionnaliteFiltered = [];
    this.fonctionnaliteService.getFonctionnaliteById(fonctionnalite.id).subscribe( data => {
      if(data.dateDebut) {
        const dateDebut = new Date(data.dateDebut);
        data.dateMin = data.dateDebut
        data.dateDebut = dateDebut.toLocaleDateString();
      }
      if(data.dateFin) {
        const dateFin = new Date(data.dateFin);
        data.dateMax = data.dateFin
        data.dateFin = dateFin.toLocaleDateString();
      }
      if(data.termine) {
        data.termine = formatDate(data.termine, 'dd-MM-yyyy HH:mm', 'en-US');
      }
      if(data.idCreateur) {
        this.fichierService.getFichierByUserId(data.idCreateur.id).subscribe( photo => {
          data.idCreateur.photo = photo.nom;
        });
      }
      if(this.responsablesFonctionnalite && this.responsablesFonctionnalite.filter(resp => resp.fonctionnalite.id == data.id)) {
        this.responsableFonctionnaliteSelected = this.responsablesFonctionnalite.filter(resp => resp.fonctionnalite.id == data.id);
        if(this.responsableFonctionnaliteSelected) {
          for(let user of this.responsableFonctionnaliteSelected) {
            if(user.idResponsable && this.photos.find( resp => resp.user.id == user.idResponsable.id)) {
              user.idResponsable.photo = this.photos.find( resp => resp.user.id == user.idResponsable.id)!.nom;
            }
          }
        }
      }
      if(this.scrumMastersFonctionnalite && this.scrumMastersFonctionnalite.filter(resp => resp.fonctionnalite.id == data.id)) {
        this.scrumMastersFonctionnaliteSelected = this.scrumMastersFonctionnalite.filter(resp => resp.fonctionnalite.id == data.id);
        if(this.scrumMastersFonctionnaliteSelected) {
          for(let user of this.scrumMastersFonctionnaliteSelected) {
            if(user.idScrumMaster && this.photos.find( resp => resp.user.id == user.idScrumMaster.id)) {
              user.idScrumMaster.photo = this.photos.find( resp => resp.user.id == user.idScrumMaster.id)!.nom;
            }
          }
        }
      }
      if(this.developersFonctionnalite && this.developersFonctionnalite.filter(resp => resp.fonctionnalite.id == data.id)) {
        this.developersFonctionnaliteSelected = this.developersFonctionnalite.filter(resp => resp.fonctionnalite.id == data.id);
        if(this.developersFonctionnaliteSelected) {
          for(let user of this.developersFonctionnaliteSelected) {
            if(user.idDevellopers && this.photos.find( resp => resp.user.id == user.idDevellopers.id)) {
              user.idDevellopers.photo = this.photos.find( resp => resp.user.id == user.idDevellopers.id)!.nom;
            }
          }
        }
      }
      this.fonctionnaliteSelected = data;
      console.log(this.fonctionnaliteSelected);
      this.getFonctionnaliteResponsablesToAssign();
      this.getFonctionnaliteScrumMastersToAssign();
      this.getFonctionnaliteDevelopersToAssign();
    });
  }

  getCommentairesFonctionnalite(fonctionnalite:Fonctionnalite) {
    this.commentaireService.getCommentaireByIdFonctionnalite(fonctionnalite.id).subscribe( data => {
      for(let comm of data) {
        comm.updating = false;
        const date = new Date(comm.temp);
        comm.temp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        for(let image of this.photos) {
          if(comm.createur.id == image.user.id) { comm.createur.photo = image.nom; }
        }
      }
      this.commentairesFonctionnalite = data;
    });
  }

  createFonctionnalite(backlog:Backlog) {
    backlog.createFonction = false;
    this.newFonctionnalite = new Fonctionnalite();
    this.newFonctionnalite.etat = 'à faire';
    this.newFonctionnalite.nom = this.fonctionnaliteName;
    this.newFonctionnalite.backlog = new Backlog();
    this.newFonctionnalite.backlog.id = backlog.id;
    this.newFonctionnalite.idCreateur = new User();
    this.newFonctionnalite.idCreateur.id = this.login.getId();
    this.newFonctionnalite.projet = this.projetInWork;
    this.fonctionnaliteService.create(this.newFonctionnalite,this.login.getId()).subscribe( data => {
      this.getFonctionnalitesProjet();
      this.getBacklogs();
      this.getBacklogById(backlog.id);
      this.fonctionnaliteName = '';
      this.creatingTache = false;
    });
    if(backlog.etat == 'Terminé') {
      backlog.etat = 'Valable';
      this.updateBacklogSelected(backlog);
    }
    if(this.projetInWork.etat != 'En progrès') {
      this.projetInWork.etat = 'En progrès';
      this.projetInWork.dateTermine = null;
      this.projetService.update(this.projetInWork.idProjet,this.projetInWork,this.login.getId()).subscribe( project => {
        this.projetInWork = project;
      });
    }
  }

  uploadFileCommentFonctionnalite(event:any,submitForm: FormGroup) {
    this.fichiersFonctionnalite = event.target.files;
    this.fileNameFonctionnalite = this.fichiersFonctionnalite[0].name;
  }

  commentaireWithFileFonctionnalite(submitForm: FormGroup) {
    this.saveCommentFileFonctionnalite(submitForm);
  }

  saveCommentFileFonctionnalite(submitForm: FormGroup) {
    if(submitForm.valid){
      const losika=submitForm.value;
      const formData  = new FormData ();
      formData.append('projet',JSON.stringify(losika)); 
      for (const file of this.fichiersFonctionnalite) { 
    
        formData.append('tdrName',file,file.name);
        console.log(file.name);
      }
      this.fichierService.saveCommentFileFonctionnalite(this.fonctionnaliteSelected.id,this.projetInWork.idProjet,formData,this.login.getId(),this.newCommentaireBacklog.commentaire).subscribe(
        event => {
          console.log(event);
          this.newCommentaireFonctionnalite = new Commentaire;
          this.fileNameFonctionnalite = '';
          this.getCommentairesFonctionnalite(this.fonctionnaliteSelected);
          this.getFichiersCommentaires();
        },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
    } else {
      console.log(submitForm);
    }
  }

  commenterFonctionnalite(fonctionnalite:Fonctionnalite) {
    this.fonctionnaliteService.getFonctionnaliteById(fonctionnalite.id).subscribe( data => {
      this.newCommentaireFonctionnalite.fonctionnalite = data;
      this.newCommentaireFonctionnalite.createur = new User();
      this.newCommentaireFonctionnalite.createur.id = this.login.getId();
      this.commentaireService.create(this.newCommentaireFonctionnalite,this.login.getId()).subscribe(data => {
        console.log(data);
        alert('successfully');
        this.newCommentaireFonctionnalite = new Commentaire();
        this.getCommentairesFonctionnalite(fonctionnalite);
        this.getFichiersCommentaires();
      },
      error => console.log(error));
    });
  }
  
  openFonctionnaliteModal(content:any,fonctionnalite:Fonctionnalite) {
    console.log(this.backlogSelected);
    this.getTacheFonctionnalite(fonctionnalite);
    this.getFonctionnaliteById(fonctionnalite);
    this.getCommentairesFonctionnalite(fonctionnalite);
    this.modalService.open(content, { size: 'xl', backdrop: 'static' });
  }

  openFonctionnaliteUpdate(content:any,fonctionnalite:Fonctionnalite) {
    this.fonctionnaliteService.getFonctionnaliteById(fonctionnalite.id).subscribe( data => {
      // if(data.dateCreation) data.dateCreation = formatDate(data.dateCreation, 'dd-MM-yyyy HH:mm', 'en-US');
      if(data.dateDebut) data.dateDebut = formatDate(data.dateDebut, 'yyyy-MM-dd', 'en-US');
      if(data.dateFin) data.dateFin = formatDate(data.dateFin, 'yyyy-MM-dd', 'en-US');
      // if(data.termine) data.termine = formatDate(data.termine, 'dd-MM-yyyy HH:mm', 'en-US');
      data.idCreateur.photo = this.photos.filter(resp => resp.user.id == data.idCreateur.id)[0].nom;
      this.fonctionnaliteUpdate = data;
    });
    this.open(content);
  }

  setFonctionnaliteToAFaire(fonctionnalite:Fonctionnalite) {
    this.fonctionnaliteService.getFonctionnaliteById(fonctionnalite.id).subscribe( fonc => {
      fonctionnalite = fonc;
      fonctionnalite.etat = 'à faire';
      this.fonctionnaliteService.update(fonctionnalite.id,fonctionnalite,this.login.getId()).subscribe( data => {
        this.getFonctionnaliteById(fonctionnalite);
        this.getFonctionnalitesProjet();
      });
    });
  }

  setFonctionnaliteToEnProgres(fonctionnalite:Fonctionnalite) {
    this.fonctionnaliteService.getFonctionnaliteById(fonctionnalite.id).subscribe( fonc => {
      fonctionnalite = fonc;
      fonctionnalite.etat = 'En progrès';
      this.fonctionnaliteService.update(fonctionnalite.id,fonctionnalite,this.login.getId()).subscribe( data => {
        this.getFonctionnaliteById(fonctionnalite);
        this.getFonctionnalitesProjet();
      });
    });
  }

  setFonctionnaliteToTermine(fonctionnalite:Fonctionnalite) {
    this.fonctionnaliteService.getFonctionnaliteById(fonctionnalite.id).subscribe( fonc => {
      fonctionnalite = fonc;
      fonctionnalite.etat = 'Terminé';
      this.fonctionnaliteService.update(fonctionnalite.id,fonctionnalite,this.login.getId()).subscribe( data => {
        this.getFonctionnaliteById(fonctionnalite);
        this.getFonctionnalitesProjet();
      });
    });
  }

  addDateDebutToFonctionnalite(fonctionnalite:Fonctionnalite) {
    this.addDebutTache = false;
    this.fonctionnaliteService.getFonctionnaliteById(fonctionnalite.id).subscribe( dataFonctionnalite => {
      dataFonctionnalite.dateDebut = this.dateDebut;
      this.fonctionnaliteService.update(fonctionnalite.id,dataFonctionnalite,this.login.getId()).subscribe( data => {
        this.getFonctionnalitesProjet(true);
        this.getFonctionnaliteById(fonctionnalite);
        this.dateDebut = new Date();
      });
    });
  }

  addDateFinToFonctionnalite(fonctionnalite:Fonctionnalite) {
    this.addFinTache = false;
    this.fonctionnaliteService.getFonctionnaliteById(fonctionnalite.id).subscribe( dataFonctionnalite => {
      dataFonctionnalite.dateFin = this.dateFin;
      this.fonctionnaliteService.update(fonctionnalite.id,dataFonctionnalite,this.login.getId()).subscribe( data => {
        this.getFonctionnalitesProjet(true);
        this.getFonctionnaliteById(fonctionnalite);
        this.dateFin = new Date();
      });
    });
  }

  updateFonctionnaliteSelected(fonctionnalite:Fonctionnalite,update?:boolean) {
    if(fonctionnalite.dateDebut) fonctionnalite.dateDebut = fonctionnalite.dateDebut;
    if(fonctionnalite.dateFin) fonctionnalite.dateFin = fonctionnalite.dateFin;
    this.fonctionnaliteService.update(fonctionnalite.id,fonctionnalite,this.login.getId()).subscribe( data => {
      alert('Fonctionnalite mis à jour avec succès');
      this.getFonctionnaliteById(fonctionnalite);
      this.getFonctionnalitesProjet();
      if(update == true) {
        this.getFonctionnalitesProjet(true);
      }
    });
  }

  updateCommentaireFonctionnalite(idCommentaire:number,commentaire:Commentaire,fonctionnalite:Fonctionnalite) {
    if(commentaire.updating == false) commentaire.updating = true;
    else {
      commentaire.temp = '';
      this.commentaireService.update(idCommentaire,commentaire,this.login.getId()).subscribe( data => {
        commentaire.updating = false;
        this.getCommentairesFonctionnalite(fonctionnalite);
      });
    }
  }  

  deleteCommentaireFonctionnalite(idComm:number,fonctionnalite:Fonctionnalite) {
    this.commentaireService.delete(idComm,this.login.getId()).subscribe( data => {
      this.getCommentairesFonctionnalite(fonctionnalite);
    });
  }
  
  deleteFonctionnalite(fonctionnalite:Fonctionnalite) {
    if (window.confirm('Are sure you want to delete '),fonctionnalite.nom,' ?') {
      this.fonctionnaliteService.delete(fonctionnalite.id,this.login.getId()).subscribe(data => {
        this.getFonctionnalitesProjet();
        this.modalService.dismissAll();
      });
    }
  }

  /*--------------------------------- Tache -------------------------------------*/

  openTacheModal(content:any,tache:Tache) {
    console.log(this.fonctionnaliteSelected);
    this.getTacheById(tache);
    this.getCommentairesTache(tache);
    this.modalService.open(content, { size: 'xl', backdrop: 'static' });
  }

  openTacheUpdate(content:any,tache:Tache) {
    this.tacheService.getTacheById(tache.idTache).subscribe( data => {
      // if(data.dateCreation) data.dateCreation = formatDate(data.dateCreation, 'dd-MM-yyyy HH:mm', 'en-US');
      if(data.dateDebut) data.dateDebut = formatDate(data.dateDebut, 'yyyy-MM-dd', 'en-US');
      if(data.dateFin) data.dateFin = formatDate(data.dateFin, 'yyyy-MM-dd', 'en-US');
      // if(data.termine) data.termine = formatDate(data.termine, 'dd-MM-yyyy HH:mm', 'en-US');
      this.tacheUpdate = data;
    });
    this.open(content);
  }

  getCommentaireTache(commentaire:Commentaire):string | undefined {
    return this.fichiersCommentairesTache.find(resp => resp.commentaire.idCommentaire == commentaire.idCommentaire)?.nom;
  }

  uploadFileCommentTache(event:any,submitForm: FormGroup) {
    this.fichiersTache = event.target.files;
    this.fileNameTache = this.fichiersTache[0].name;
  }

  commentaireWithFileTache(submitForm: FormGroup) {
    this.saveCommentFileTache(submitForm);
  }

  saveCommentFileTache(submitForm: FormGroup) {
    if(submitForm.valid){
      const losika=submitForm.value;
      const formData  = new FormData ();
      formData.append('projet',JSON.stringify(losika)); 
      for (const file of this.fichiersTache) { 
    
        formData.append('tdrName',file,file.name);
        console.log(file.name);
      }
      this.fichierService.saveCommentFileTache(this.tacheSelected.idTache,this.projetInWork.idProjet,formData,this.login.getId(),this.newCommentaireTache.commentaire).subscribe(
        event => {
          console.log(event);
          this.newCommentaireTache = new Commentaire;
          this.fileNameTache = '';
          this.getCommentairesTache(this.tacheSelected);
          this.getFichiersCommentaires();
        },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
    } else {
      console.log(submitForm);
    }
  }

  getCommentairesTache(tache:Tache) {
    this.commentaireService.getCommentairesByIdTache(tache.idTache).subscribe( data => {
      for(let comm of data) {
        comm.updating = false;
        const date = new Date(comm.temp);
        comm.temp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        for(let image of this.photos) {
          if(comm.createur.id == image.user.id) { comm.createur.photo = image.nom; }
        }
      }
      this.commentairesTache = data;
    });
  }

  commenterTache(tache:Tache) {
    this.tacheService.getTacheById(tache.idTache).subscribe( data => {
      this.newCommentaireTache.tache = data;
      this.newCommentaireTache.createur = new User();
      this.newCommentaireTache.createur.id = this.login.getId();
      this.commentaireService.create(this.newCommentaireTache,this.login.getId()).subscribe(data => {
        console.log(data);
        alert('successfully');
        this.newCommentaireTache = new Commentaire();
        this.getCommentairesTache(tache);
        this.getFichiersCommentaires();
      },
      error => console.log(error));
    });
  }

  updateCommentaireTache(idCommentaire:number,commentaire:Commentaire,tache:Tache) {
    if(commentaire.updating == false) commentaire.updating = true;
    else {
      commentaire.temp = '';
      this.commentaireService.update(idCommentaire,commentaire,this.login.getId()).subscribe( data => {
        commentaire.updating = false;
        this.getCommentairesTache(tache);
      });
    }
  }  

  deleteCommentaireTache(idComm:number,tache:Tache) {
    this.commentaireService.delete(idComm,this.login.getId()).subscribe( data => {
      this.getCommentairesTache(tache);
    });
  }

  getTacheFonctionnalite(fonctionnalite:Fonctionnalite,update?:boolean) {
    this.tacheService.getTacheByIdFonctionnalite(fonctionnalite.id).subscribe( data => {
      for(let tache of data) {
        if(tache.dateDebut) {
          const dateDebut = new Date(tache.dateDebut);
          tache.dateDebut = dateDebut.toLocaleDateString();
        }
        if(tache.dateFin) {
          const dateFin = new Date(tache.dateFin);
          tache.dateFin = dateFin.toLocaleDateString();
        }
        if(tache.termine) {
          tache.termine = formatDate(tache.termine, 'dd-MM-yyyy HH:mm', 'en-US');
        }
        if(tache.idRapporteur) {
          this.fichierService.getFichierByUserId(tache.idRapporteur.id).subscribe( photo => {
            tache.idRapporteur.photo = photo.nom;
          });
        }
      }
      this.tachesFonctionnalite = data;
      if(update == true) {
        let count = 0;
        for(let tache of this.tachesFonctionnalite) {
          if(tache.avance == 100) count++;
        }
        if(count == this.tachesFonctionnalite.length && fonctionnalite.etat != 'Terminé') {
          fonctionnalite.etat = 'Terminé';
          this.updateFonctionnaliteSelected(fonctionnalite,true);
        }
        this.tacheService.getTacheByBacklog(this.tacheSelected.fonctionnalite.backlog.id).subscribe( taches => {
          this.tachesFonctionnalite2 = taches;
          console.log(taches);
        });
        // this.getFonctionnalitesProjet();
        this.getBacklogs();
      }
    });
  }

  createTache(fonctionnalite:Fonctionnalite) {
    this.newTache = new Tache(this.user);
    this.newTache.nom = this.newTacheName;
    this.newTache.projet = new Projet();
    this.newTache.projet.idProjet = this.projetInWork.idProjet;
    this.newTache.fonctionnalite = new Fonctionnalite();
    this.newTache.fonctionnalite.id = fonctionnalite.id;
    this.newTache.etat = 'à faire';
    this.newTache.idRapporteur = new User();
    this.newTache.idRapporteur.id = this.login.getId();
    if(fonctionnalite.etat == 'Terminé') {
      this.fonctionnaliteService.getFonctionnaliteById(fonctionnalite.id).subscribe( fonction => {
        // fonction.etat = 'à faire';
        if(this.fonctionnalitesBacklog.find(resp => resp.etat == 'En progrès')) {
          fonction.etat = 'En progrès';
        } else if(this.fonctionnalitesBacklog.find(resp => resp.etat == 'à faire')) {
          fonction.etat = 'à faire';
        }
        this.updateFonctionnaliteSelected(fonction,true);
      });
    }
    if(fonctionnalite.backlog.etat == 'Terminé') {
      fonctionnalite.backlog.etat = 'Valable';
      this.updateBacklogSelected(fonctionnalite.backlog,true);
    }
    this.tacheService.create(this.newTache).subscribe( data => {
      this.newTacheName = '';
      this.creatingTache = false;
      this.getTacheFonctionnalite(fonctionnalite);
    });
    if(this.projetInWork.etat == 'Terminé') {
      this.projetInWork.etat = 'En progrès';
      this.projetInWork.dateTermine = null;
      this.projetService.update(this.projetInWork.idProjet,this.projetInWork,this.login.getId()).subscribe( project => {
        this.projetInWork = project;
      });
    }
  }

  getTacheById(tache:Tache) {
    this.tacheService.getTacheById(tache.idTache).subscribe( data => {
      if(data.dateDebut) data.dateDebut = formatDate(data.dateDebut, 'dd-MM-yyyy', 'en-US');
      if(data.dateFin) data.dateFin = formatDate(data.dateFin, 'dd-MM-yyyy', 'en-US');
      if(data.termine) data.termine = formatDate(data.termine, 'dd-MM-yyyy HH:mm', 'en-US');
      if(data.idRapporteur) {
        this.fichierService.getFichierByUserId(data.idRapporteur.id).subscribe( photo => {
          data.idRapporteur.photo = photo.nom;
        });
      }
      this.selectedValue = data.avance;
      this.tacheSelected = data;
    });
  }

  setTacheToAFaire(tache:Tache) {
    tache.etat = 'à faire';
    this.tacheService.update(tache.idTache,tache,this.login.getId()).subscribe( data => {
      this.getTacheById(tache);
    });
  }

  setTacheToEnProgres(tache:Tache) {
    tache.etat = 'En progrès';
    this.tacheService.update(tache.idTache,tache,this.login.getId()).subscribe( data => {
      this.getTacheById(tache);
    });
  }

  setTacheToTermine(tache:Tache) {
    tache.etat = 'Terminé';
    this.tacheService.update(tache.idTache,tache,this.login.getId()).subscribe( data => {
      this.getTacheById(tache);
    });
  }

  addDateDebutToTache(tache:Tache) {
    this.addDebutTache = false;
    this.tacheService.getTacheById(tache.idTache).subscribe( dataTache => {
      dataTache.dateDebut = this.dateDebut;
      this.tacheService.update(tache.idTache,dataTache,this.login.getId()).subscribe( data => {
        this.getTacheFonctionnalite(this.tacheSelected.fonctionnalite,true);
        this.getTacheById(tache);
        this.dateDebut = new Date();
      });
    });
  }

  addDateFinToTache(tache:Tache) {
    this.addFinTache = false;
    this.tacheService.getTacheById(tache.idTache).subscribe( dataTache => {
      dataTache.dateFin = this.dateFin;
      this.tacheService.update(tache.idTache,dataTache,this.login.getId()).subscribe( data => {
        this.getTacheFonctionnalite(this.tacheSelected.fonctionnalite,true);
        this.getTacheById(tache);
        this.dateFin = new Date();
      });
    });
  }

  updateTacheSelected(tache:Tache,update?:boolean) {
    if(tache.dateDebut) tache.dateDebut = this.convertDateFormat(tache.dateDebut);
    if(tache.dateFin) tache.dateFin = this.convertDateFormat(tache.dateFin);
    this.tacheService.update(tache.idTache,tache,this.login.getId()).subscribe( data => {
      alert('Tache mis à jour avec succès');
      this.getTacheById(tache);
      if(update) {
        for(let i = 0; i < this.tachesFonctionnalite.length ; i++) {
          if(this.tachesFonctionnalite[i].idTache == tache.idTache) {
            this.tachesFonctionnalite[i] = tache;
            break;
          }
        }
        const tasks:Tache[] = this.tachesFonctionnalite.filter(resp => resp.fonctionnalite.id == this.fonctionnaliteSelected.id);
        let count = 0;
        for(let task of tasks) {
          if(task.etat == 'Terminé') count++;
          else break;
        }
        if(count == tasks.length) {
          this.tacheSelected.fonctionnalite.etat = 'Terminé';
          this.updateFonctionnaliteSelected(this.tacheSelected.fonctionnalite,true);
        } else if(count < tasks.length && this.tacheSelected.fonctionnalite.etat != 'En progrès') {
          this.tacheSelected.fonctionnalite.etat = 'En progrès';
          this.updateFonctionnaliteSelected(this.tacheSelected.fonctionnalite,true);
        }
        this.getTacheFonctionnalite(this.tacheSelected.fonctionnalite,true);
      }
    });
  }

  deleteTache(tache:Tache) {
    if (window.confirm('Are sure you want to delete '),tache.nom,' ?') {
      this.tacheService.delete(tache.idTache,this.login.getId()).subscribe(data => {
        this.getBacklogs();
        this.modalService.dismissAll();
      });
    }
  }
  
  getTachesProjet(projet:Projet) {
    this.tacheService.getTacheByIdProjet(projet.idProjet).subscribe( data => {
      this.tachesProjet = data;
      console.log(this.tachesProjet);
    });
  }

  getFonctionnaliteAFaire(backlog:Backlog):number {
    let i:number = 0;
    let j = 0;
    if(this.fonctionnalitesBacklog) {
      for(let fonctionnalite of this.fonctionnalitesBacklog) {
        if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'à faire') i++ ;
        else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'En progrès') j++ ;
        else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'Terminé') j++ ;
      }
      i = (i*100)/(i+j);
    }
    return i;
  }

  getFonctionnaliteEnProgres(backlog:Backlog):number {
    let i:number = 0;
    let j = 0;
    if(this.fonctionnalitesBacklog) {
      for(let fonctionnalite of this.fonctionnalitesBacklog) {
        if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'En progrès') i++ ;
        else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'à faire') j++ ;
        else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'Terminé') j++ ;
      }
      i = (i*100)/(i+j);
    }
    return i;
  }

  getFonctionnaliteTermine(backlog:Backlog):number {
    let i:number = 0;
    let j = 0;
    if(this.fonctionnalitesBacklog) {
      for(let fonctionnalite of this.fonctionnalitesBacklog) {
        if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'Terminé') i++ ;
        else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'à faire') j++ ;
        else if(fonctionnalite.backlog.id == backlog.id && fonctionnalite.etat == 'En progrès') j++ ;
      }
      i = (i*100)/(i+j);
    }
    return i;
  }

  setTacheAvance() {
    this.tacheSelected.avance = this.selectedValue;
    if(this.selectedValue == 100) this.tacheSelected.etat = 'Terminé';
    else if(this.selectedValue < 100 && this.selectedValue > 0) this.tacheSelected.etat = 'En progrès';
    else if(this.selectedValue == 0) this.tacheSelected.etat = 'à faire';
    console.log(this.tacheSelected);
    this.updateTacheSelected(this.tacheSelected,true);
  }

  /*--------------------------------- Socket -------------------------------------*/

  sendMessage(message:string){
    this.stompClient.send("/app/send/message" , {}, message);
  }

  /*--------------------------------- Sprint -------------------------------------*/

  createSprint() {
    this.newSprint = new Sprint();
    this.newSprint.nom = 'Sprint '+(this.sprintsProjet.length +1);
    this.newSprint.projet = this.projetInWork;
    this.newSprint.idCreateur = this.user;
    this.newSprint.etat = 'en attente';
    this.newSprint.couleur = 'gray';
    this.sprintService.create(this.newSprint,this.login.getId()).subscribe( data => {
      this.getSprints(this.projetInWork);
    });
  }

  openSprintModal(content:any,sprint:Sprint) {
    this.sprintSelected = this.sprintsProjet.find( sprint2 => sprint2.idSprint == sprint.idSprint)!;
    this.modalService.open(content, { size: 'lg'});
  }

  getSprints(projet:Projet) {
    this.sprintService.getSprintByIdProjet(projet.idProjet).subscribe( data => {
      for(let sprint of data) {
        if(sprint.date_debut) {
          const date = new Date(sprint.date_debut);
          sprint.date_debut = date.toLocaleDateString();
        }
        if(sprint.date_fin) {        
          const date2 = new Date(sprint.date_fin);
          sprint.date_fin = date2.toLocaleDateString();
        }
        if(sprint.termine) {
          sprint.termine = formatDate(sprint.termine, 'dd-MM-yyyy HH:mm', 'en-US');
        }
      }
      this.sprintsProjet = data;
    });
  }
  
  setSprintColor(color:string,sprint:Sprint) {
    this.sprintService.getSprintById(sprint.idSprint).subscribe( theSprint => {
      theSprint.couleur = color;
      console.log(theSprint);
      this.sprintService.update(theSprint.idSprint,theSprint,this.login.getId()).subscribe( sprnt => {
        this.getSprints(this.projetInWork);
        this.getBacklogs();
      });
    });
  }

  countBacklog(sprint:Sprint):number {
    const spb:SprintBacklog[] = this.sprintsBacklog.filter(resp => resp.sprint.idSprint == sprint.idSprint);
    return spb.length;
  }

  getSprintById(sprint:Sprint) {
    this.sprintService.getSprintById(sprint.idSprint).subscribe( sprint => {
      if(sprint.date_debut) {
        const date = new Date(sprint.date_debut);
        sprint.date_debut = date.toLocaleDateString();
      }
      if(sprint.date_fin) {        
        const date2 = new Date(sprint.date_fin);
        sprint.date_fin = date2.toLocaleDateString();
      }
      if(sprint.termine) {        
        sprint.termine = formatDate(sprint.termine, 'dd-MM-yyyy HH:mm', 'en-US');
      }
      this.sprintSelected = sprint;
    });
  }

  /*--------------------------------- User -------------------------------------*/

  onItemClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('active')) {
      target.classList.remove('active');
    } else {
      target.classList.add('active');
    }
  }
  
  getBacklogResponsablesToAssign() {
    this.userService.usersWithTheirRoles().subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
        }
      }
      for(let assigned of data) {
        if(this.responsablesBacklog && this.responsablesBacklog.find(resp => resp.idResponsable && resp.idResponsable.id == assigned.id && resp.backlog.id == this.backlogSelected.id)) {
          assigned.isResponsable = true;
        }
      }
      this.responsablesToAssign = data;
      this.responsableBacklogFiltered = this.responsablesToAssign;
    });
  }

  getBacklogResponsableFiltered() {
    this.responsableBacklogFiltered = this.responsablesToAssign;
    this.responsableBacklogFiltered = this.responsablesToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  assignBacklogResponsable(user:User) {
    this.newResponsableBacklog = new ResponsableProjet();
    if(!user.isResponsable) {
      user.isResponsable = true;
      this.newResponsableBacklog.idResponsable = user;
      this.newResponsableBacklog.projet = this.projetInWork;
      this.newResponsableBacklog.backlog = new Backlog();
      this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
      this.newResponsableBacklog.backlog.nom = this.backlogSelected.nom;
      this.responsableService.create(this.newResponsableBacklog,this.login.getId()).subscribe( data => {
        this.getBacklogResponsables(this.projetInWork);
        this.getBacklogResponsablesToAssign();
        this.getBacklogById(this.backlogSelected.id);
        this.sendMessage(user.id);
        alert('user inserted successfully');
      });
    } else {
      user.isResponsable = false;
      const responsable:ResponsableProjet[] = this.responsablesBacklog.filter(resp => resp.idResponsable && resp.idResponsable.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getBacklogResponsablesToAssign();
        this.getBacklogResponsables(this.projetInWork);
        this.getBacklogById(this.backlogSelected.id);
        alert('user deleted successfully');
      });
    }
  }

  getBacklogScrumMastersToAssign() {
    this.userService.getUsersByRole('SCRUM_master') .subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
        }
      }
      for(let assigned of data) {
        if(this.scrumMastersBacklog && this.scrumMastersBacklog.find(resp => resp.idScrumMaster && resp.idScrumMaster.id == assigned.id && resp.backlog.id == this.backlogSelected.id)) {
          assigned.isScrumMaster = true;
        }
      }
      this.scrumMastersToAssign = data;
      this.scrumMastersBacklogFiltered = this.scrumMastersToAssign;
      console.log(this.scrumMastersBacklogFiltered);
    });
  }

  getBacklogScrumMastersFiltered() {
    this.scrumMastersBacklogFiltered = this.scrumMastersToAssign;
    this.scrumMastersBacklogFiltered = this.responsablesToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  assignBacklogScrumMaster(user:User) {
    this.newResponsableBacklog = new ResponsableProjet();
    if(!user.isScrumMaster) {
      user.isScrumMaster = true;
      this.newResponsableBacklog.idScrumMaster = user;
      this.newResponsableBacklog.projet = this.projetInWork;
      this.newResponsableBacklog.backlog = new Backlog();
      this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
      this.newResponsableBacklog.backlog.nom = this.backlogSelected.nom;
      this.responsableService.create(this.newResponsableBacklog,this.login.getId()).subscribe( data => {
        this.getBacklogScrumMasters(this.projetInWork);
        this.getBacklogById(this.backlogSelected.id);
        this.getBacklogScrumMastersToAssign();
        this.getBacklogResponsables(this.projetInWork);
        this.sendMessage(user.id);
        alert('user inserted successfully');
      });
    } else {
      user.isScrumMaster = false;
      const responsable:ResponsableProjet[] = this.responsablesBacklog.filter(resp => resp.idScrumMaster && resp.idScrumMaster.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getBacklogScrumMastersToAssign();
        this.getBacklogScrumMasters(this.projetInWork);
        this.getBacklogById(this.backlogSelected.id);
        alert('user deleted successfully');
      });
    }
  }

  getBacklogDevelopersToAssign() {
    this.userService.getUsersByRole('Développeur') .subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
        }
      }
      for(let assigned of data) {
        if(this.developersBacklog && this.developersBacklog.find(resp => resp.idDevellopers && resp.idDevellopers.id == assigned.id && resp.backlog.id == this.backlogSelected.id)) {
          // assigned.isResponsable = true;
          assigned.isDevelopper = true;
        }
      }
      this.developersToAssign = data;
      this.developersBacklogFiltered = this.developersToAssign;
    });
  }

  getBacklogDevellopersFiltered() {
    this.developersBacklogFiltered = this.developersToAssign;
    this.developersBacklogFiltered = this.developersToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  assignBacklogDevellopers(user:User) {
    this.newResponsableBacklog = new ResponsableProjet();
    if(!user.isDevelopper) {
      user.isDevelopper = true;
      this.newResponsableBacklog.idDevellopers = user;
      this.newResponsableBacklog.projet = this.projetInWork;
      this.newResponsableBacklog.backlog = new Backlog();
      this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
      this.newResponsableBacklog.backlog.nom = this.backlogSelected.nom;
      this.responsableService.create(this.newResponsableBacklog,this.login.getId()).subscribe( data => {
        this.getBacklogDeveloppers(this.projetInWork);
        this.getBacklogById(this.backlogSelected.id);
        this.getBacklogDevelopersToAssign();
        this.sendMessage(user.id);
        alert('user inserted successfully');
      });
    } else {
      user.isDevelopper = false;
      const responsable:ResponsableProjet[] = this.responsablesBacklog.filter(resp => resp.idDevellopers && resp.idDevellopers.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getBacklogDevelopersToAssign();
        this.getBacklogDeveloppers(this.projetInWork);
        this.getBacklogById(this.backlogSelected.id);
        alert('user deleted successfully');
      });
    }
  }

  getFonctionnaliteResponsablesToAssign() {
    this.userService.usersWithTheirRoles().subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
        }
      }
      for(let assigned of data) {
        if(this.responsablesFonctionnalite && this.responsablesFonctionnalite.find(resp => resp.idResponsable && resp.idResponsable.id == assigned.id && resp.fonctionnalite.id == this.fonctionnaliteSelected.id)) {
          assigned.isResponsable = true;
        }
      }
      this.responsablesToAssign = data;
      this.responsableFonctionnaliteFiltered = this.responsablesToAssign;
    });
  }

  getFonctionnaliteResponsableFiltered() {
    this.responsableFonctionnaliteFiltered = this.responsablesToAssign;
    this.responsableFonctionnaliteFiltered = this.responsablesToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  assignFonctionnaliteResponsable(user:User) {
    this.newResponsableFonctionnalite = new ResponsableProjet();
    if(!user.isResponsable) {
      user.isResponsable = true;
      this.newResponsableFonctionnalite.idResponsable = user;
      this.newResponsableFonctionnalite.projet = this.projetInWork;
      this.newResponsableFonctionnalite.fonctionnalite = new Fonctionnalite();
      this.newResponsableFonctionnalite.fonctionnalite.id = this.fonctionnaliteSelected.id;
      this.newResponsableFonctionnalite.fonctionnalite.nom = this.fonctionnaliteSelected.nom;
      this.responsableService.create(this.newResponsableFonctionnalite,this.login.getId()).subscribe( data => {
        this.getFonctionnaliteResponsables(this.projetInWork.idProjet);
        this.getFonctionnaliteResponsablesToAssign();
        this.getFonctionnaliteById(this.fonctionnaliteSelected);
        this.sendMessage(user.id);
        alert('user inserted successfully');
      });
    } else {
      user.isResponsable = false;
      const responsable:ResponsableProjet[] = this.responsablesFonctionnalite.filter(resp => resp.idResponsable && resp.idResponsable.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getFonctionnaliteResponsablesToAssign();
        this.getFonctionnaliteResponsables(this.projetInWork.idProjet);
        this.getFonctionnaliteById(this.fonctionnaliteSelected);
        alert('user deleted successfully');
      });
    }
  }

  getFonctionnaliteScrumMastersToAssign() {
    this.userService.getUsersByRole('SCRUM_master') .subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
        }
      }
      for(let assigned of data) {
        if(this.responsablesFonctionnalite && this.responsablesFonctionnalite.find(resp => resp.idScrumMaster && resp.idScrumMaster.id == assigned.id && resp.fonctionnalite.id == this.fonctionnaliteSelected.id)) {
          assigned.isScrumMaster = true;
        }
      }
      this.scrumMastersToAssign = data;
      this.scrumMastersFonctionnaliteFiltered = this.scrumMastersToAssign;
    });
  }

  getFonctionnaliteScrumMastersFiltered() {
    this.scrumMastersFonctionnaliteFiltered = this.scrumMastersToAssign;
    this.scrumMastersFonctionnaliteFiltered = this.responsablesToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  assignFonctionnaliteScrumMaster(user:User) {
    this.newResponsableFonctionnalite = new ResponsableProjet();
    if(!user.isScrumMaster) {
      user.isScrumMaster = true;
      this.newResponsableFonctionnalite.idScrumMaster = user;
      this.newResponsableFonctionnalite.projet = this.projetInWork;
      this.newResponsableFonctionnalite.fonctionnalite = new Fonctionnalite();
      this.newResponsableFonctionnalite.fonctionnalite.id = this.fonctionnaliteSelected.id;
      this.newResponsableFonctionnalite.fonctionnalite.nom = this.fonctionnaliteSelected.nom;
      this.responsableService.create(this.newResponsableFonctionnalite,this.login.getId()).subscribe( data => {
        this.getFonctionnaliteScrumMasters(this.projetInWork.idProjet);
        this.getFonctionnaliteById(this.fonctionnaliteSelected);
        this.getFonctionnaliteScrumMastersToAssign();
        this.sendMessage(user.id);
        alert('user inserted successfully');
      });
    } else {
      user.isScrumMaster = false;
      const responsable:ResponsableProjet[] = this.responsablesFonctionnalite.filter(resp => resp.idScrumMaster && resp.idScrumMaster.id == user.id && resp.fonctionnalite && resp.fonctionnalite.id == this.fonctionnaliteSelected.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getFonctionnaliteScrumMastersToAssign();
        this.getFonctionnaliteScrumMasters(this.projetInWork.idProjet);
        this.getFonctionnaliteById(this.fonctionnaliteSelected);
        alert('user deleted successfully');
      });
    }
  }

  getFonctionnaliteDevelopersToAssign() {
    this.userService.getUsersByRole('Développeur') .subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
        }
      }
      for(let assigned of data) {
        if(this.developersFonctionnalite && this.developersFonctionnalite.find(resp => resp.idDevellopers && resp.idDevellopers.id == assigned.id && resp.fonctionnalite.id == this.fonctionnaliteSelected.id)) {
          assigned.isDevelopper = true;
        }
      }
      this.developersToAssign = data;
      this.developersFonctionnaliteFiltered = this.developersToAssign;
    });
  }

  getFonctionnaliteDevellopersFiltered() {
    this.developersFonctionnaliteFiltered = this.developersToAssign;
    this.developersFonctionnaliteFiltered = this.developersToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  assignFonctionnaliteDevellopers(user:User) {
    this.newResponsableFonctionnalite = new ResponsableProjet();
    if(!user.isDevelopper) {
      user.isDevelopper = true;
      this.newResponsableFonctionnalite.idDevellopers = user;
      this.newResponsableFonctionnalite.projet = this.projetInWork;
      this.newResponsableFonctionnalite.fonctionnalite = new Fonctionnalite();
      this.newResponsableFonctionnalite.fonctionnalite.id = this.fonctionnaliteSelected.id;
      this.newResponsableFonctionnalite.fonctionnalite.nom = this.fonctionnaliteSelected.nom;
      this.responsableService.create(this.newResponsableFonctionnalite,this.login.getId()).subscribe( data => {
        this.getFonctionnaliteDeveloppers(this.projetInWork.idProjet);
        this.getFonctionnaliteById(this.fonctionnaliteSelected);
        this.getFonctionnaliteDevelopersToAssign();
        this.sendMessage(user.id);
        alert('user inserted successfully');
      });
    } else {
      console.log(this.responsablesFonctionnalite);
      const responsable:ResponsableProjet[] = this.responsablesFonctionnalite.filter(resp => resp.idDevellopers && resp.idDevellopers.id == user.id && resp.fonctionnalite && resp.fonctionnalite.id == this.fonctionnaliteSelected.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        user.isDevelopper = false;
        this.getFonctionnaliteResponsables(this.idProjet);
        this.getFonctionnaliteDevelopersToAssign();
        this.getFonctionnaliteDeveloppers(this.projetInWork.idProjet);
        this.getFonctionnaliteById(this.fonctionnaliteSelected);
        alert('user deleted successfully');
      });
    }
  }

  isDeveloppeur():boolean {
    let ans = false;
    if(this.user) ans = this.userService.isDeveloppeur(this.user);
    return ans;
  }

  isProductOwner():boolean {
    let ans = false;
    if(this.user) ans = this.userService.isProductOwner(this.user);
    return ans;
  }

  isScrumMaster():boolean {
    let ans = false;
    if(this.user) ans = this.userService.isScrumMaster(this.user);
    return ans;
  }

  isAdmin():boolean {
    let ans = false;
    if(this.user) ans = this.userService.isAdministrateur(this.user);
    return ans;
  }

  isScrumMasterBacklog(backlog:Backlog):boolean {
    let ans = false;
    if(this.user && this.user.realmRoles && this.user.realmRoles.find(resp => resp == 'Administrateur')) ans = true;
    else if(backlog && this.scrumMastersBacklogSelected && this.scrumMastersBacklogSelected.find(resp => resp.backlog && resp.backlog.id == backlog.id && resp.idScrumMaster && resp.idScrumMaster.id == this.login.getId())) ans = true;
    return ans;
  }

}
