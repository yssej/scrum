import { formatDate } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Backlog } from 'src/app/models/backlog';
import { Commentaire } from 'src/app/models/commentaire';
import { Fichier } from 'src/app/models/fichier';
import { Projet } from 'src/app/models/projet';
import { ResponsableProjet } from 'src/app/models/responsable-projet';
import { Sprint } from 'src/app/models/sprint';
import { User } from 'src/app/models/user';
import { BacklogService } from 'src/app/services/backlog.service';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { FichierService } from 'src/app/services/fichier.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjetService } from 'src/app/services/projet.service';
import { ResponsableProjetService } from 'src/app/services/responsable-projet.service';
import { SprintService } from 'src/app/services/sprint.service';
import { saveAs } from 'file-saver';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';
import { Tache } from 'src/app/models/tache';
import { TacheService } from 'src/app/services/tache.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Fonctionnalite } from 'src/app/models/fonctionnalite';
import { FonctionnaliteService } from 'src/app/services/fonctionnalite.service';
import { SprintBacklog } from 'src/app/models/sprint-backlog';
import { SprintBacklogService } from 'src/app/services/sprint-backlog.service';

@Component({
  selector: 'app-recap-sprint',
  templateUrl: './recap-sprint.component.html',
  styleUrls: ['./recap-sprint.component.css']
})
export class RecapSprintComponent implements OnInit {

  /*--------------------------------- Autres --------------------------------------*/
  
  addDebutTache = false;
  addFinTache = false;
  dateDebut = new Date();
  dateFin = new Date();
  fileStatus = { status: '', requestType: '', percent: 0 };
  filenames: string[] = [];
  myGroup: FormGroup;
  nomRecherche:string;

  /*--------------------------------- Backlog --------------------------------------*/

  backlogsAtSprint:Backlog[];
  backlogsFilteredBySprint:Backlog[] = [];
  backlogsProjet:Backlog[];
  backlogSelected:Backlog;
  backlogUpdate:Backlog;
  fileNameBacklog:string;
  newResponsableBacklog:ResponsableProjet;
  
  /*--------------------------------- Commentaire --------------------------------------*/

  commentairesBacklog:Commentaire[];
  newCommentaireBacklog:Commentaire = new Commentaire();

  /*--------------------------------- Choix projet --------------------------------------*/

  @ViewChild('myModal',{ static:true }) myModalRef: ElementRef;
  idProjet:number;
  projetInWork:Projet;
  allProjects:Projet[];
  page:number = 1;
  totalLength:any;
  photos:Fichier[];
  
  /*--------------------------------- Fonctionnalites --------------------------------------*/

  fonctionnalitesBacklog:Fonctionnalite[];

  /*--------------------------------- Fichier --------------------------------------*/

  fichiersBacklog:File[];
  fichiersCommentairesBacklog:Fichier[];

  /*--------------------------------- Responsable Projet --------------------------------------*/

  responsablesBacklog:ResponsableProjet[];
  responsableBacklogSelected:ResponsableProjet[];
  scrumMastersBacklog:ResponsableProjet[];
  scrumMastersBacklogSelected:ResponsableProjet[];
  developersBacklog:ResponsableProjet[];
  developersBacklogSelected:ResponsableProjet[];
  
  /*--------------------------------- Sprint --------------------------------------*/

  sprintsProjet:Sprint[];
  sprintSelected:Sprint;
  
  /*--------------------------------- Sprint --------------------------------------*/

  sprintBacklogs:SprintBacklog[];

  /*--------------------------------- Tache --------------------------------------*/

  tachesProjet:Tache[];

  /*--------------------------------- User --------------------------------------*/

  responsableBacklogFiltered:User[];
  responsablesToAssign:User[];
  scrumMastersBacklogFiltered:User[];
  scrumMastersToAssign:User[];
  developersBacklogFiltered:User[];
  developersToAssign:User[];

  constructor(private sessionStorage:LocalStorageService,private projetService:ProjetService,private modalService:NgbModal,private router:Router,
    private fichierService:FichierService,private backlogService:BacklogService,private sprintService:SprintService,private login:LoginService,
    private responsableService:ResponsableProjetService,private commentaireService:CommentaireService,private userService:UserService,
    private tacheService:TacheService,private fonctionnaliteService:FonctionnaliteService,private sprintBacklogService:SprintBacklogService) {
      this.myGroup = new FormGroup({
        nom: new FormControl()
      })
    }

  ngOnInit(): void {
    if(this.login.getIsLogged() == false) {
      this.router.navigate(['/Acceuil']);
    } else {
      this.checkSession();
    }
  }

  /*--------------------------------- Backlog --------------------------------------*/

  addDateDebutToBacklog(idBacklog:number) {
    this.addDebutTache = false;
    this.backlogService.getBacklogById(idBacklog).subscribe( dataBacklog => {
      dataBacklog.dateDebut = this.dateDebut;
      this.backlogService.update(idBacklog,dataBacklog,this.login.getId()).subscribe( data => {
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
        this.getBacklogById(idBacklog);
        this.dateFin = new Date();
      });
    });
  }

  checkBacklogResp(backlog:Backlog):boolean {
    let resp = true;
    if(this.responsablesBacklog) {
      if(this.responsablesBacklog.filter( resp => resp.backlog.id == backlog.id)) resp = false;
    }
    return resp;
  }

  countBacklog(sprint:Sprint):number {
    if(this.sprintBacklogs) {
      const spb:SprintBacklog[] = this.sprintBacklogs.filter(resp => resp.sprint.idSprint == sprint.idSprint);
      return spb.length;
    } else return 0;
  }

  deleteBacklog(backlog:Backlog) {
    if (window.confirm('Are sure you want to delete this '),backlog.nom,' ?') {
      this.backlogService.delete(backlog.id,this.login.getId()).subscribe(data => {
        this.getBacklogs();
        this.modalService.dismissAll();
      });
    }
  }

  getBacklogById(idBacklog:number) {
    this.responsableBacklogFiltered = [];
    this.scrumMastersBacklogFiltered = [];
    this.developersBacklogFiltered = [];
    this.backlogService.getBacklogById(idBacklog).subscribe( data => {
      if(data.dateDebut) {
        const dateDebut = new Date(data.dateDebut);
        data.dateDebut = dateDebut.toLocaleDateString();
      }
      if(data.dateFin) {
        const dateFin = new Date(data.dateFin);
        data.dateFin = dateFin.toLocaleDateString();
      }
      if(data.idCreateur) {
        this.fichierService.getFichierByUserId(data.idCreateur.id).subscribe( photo => {
          data.idCreateur.photo = photo.nom;
        });
      }
      if(this.responsablesBacklog.filter(resp => resp.backlog.id == data.id)) {
        this.responsableBacklogSelected = this.responsablesBacklog.filter(resp => resp.backlog.id == data.id);
        if(this.responsableBacklogSelected) {
          for(let user of this.responsableBacklogSelected) {
            if(user.idResponsable && this.photos.find( resp => resp.user.id == user.idResponsable.id)) {
              user.idResponsable.photo = this.photos.find( resp => resp.user.id == user.idResponsable.id)!.nom;
            }
          }
        }
      }
      if(this.scrumMastersBacklog.filter(resp => resp.backlog.id == data.id)) {
        this.scrumMastersBacklogSelected = this.scrumMastersBacklog.filter(resp => resp.backlog.id == data.id);
        if(this.scrumMastersBacklogSelected) {
          for(let user of this.scrumMastersBacklogSelected) {
            if(user.idScrumMaster && this.photos.find( resp => resp.user.id == user.idScrumMaster.id)) {
              user.idScrumMaster.photo = this.photos.find( resp => resp.user.id == user.idScrumMaster.id)!.nom;
            }
          }
        }
      }
      if(this.developersBacklog.filter(resp => resp.backlog.id == data.id)) {
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
      this.getResponsablesToAssign();
      this.getScrumMastersToAssign();
      this.getDevelopersToAssign();
    });
  }

  

  getBacklogs() {
    this.backlogService.getBacklogByIdProjet(this.sessionStorage.getDataFromSessionStorage('projetWorking')).subscribe( data => {
      // for(let backlog of data) {
      //   if(backlog.dateDebut) {
      //     const date = new Date(backlog.dateDebut);
      //     backlog.dateDebut = date.toLocaleDateString();
      //   }
      //   if(backlog.dateFin) {        
      //     const date2 = new Date(backlog.dateFin);
      //     backlog.dateFin = date2.toLocaleDateString();
      //   }
      // }
      this.backlogsProjet = data;
      this.getSprintBacklogs();
      console.log(this.backlogsProjet);
    });
  }

  onDropBacklog(event: CdkDragDrop<Backlog[]>,arrayId:number) {
    if(event.previousContainer === event.container) {
      // let ans = 0;
      // for(let backlog of this.backlogsProjet) {
      //   if(backlog.sprint?.idSprint == arrayId) {
      //     break;
      //   } else { ans++; }
      // }
      moveItemInArray(this.backlogsProjet, event.previousIndex, event.currentIndex);
      for(let subtask of this.backlogsProjet) {
        if(subtask.sprint?.idSprint == arrayId) this.backlogsFilteredBySprint.push(subtask);
      }
      this.backlogService.savePosition(this.backlogsFilteredBySprint).subscribe( dataProjets => {
        this.getBacklogs();
      });
      this.backlogsFilteredBySprint = [];
    } else {
      const backlogDragged:Backlog = event.item.data;
      backlogDragged.sprint = new Sprint();
      backlogDragged.sprint.idSprint = arrayId;
      if (event.previousContainer.data && event.container.data) {
        transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      }
      this.backlogService.update(backlogDragged.id,backlogDragged,this.login.getId()).subscribe( backlog => {
        for(let subtask of this.backlogsProjet) {
          if(subtask.sprint?.idSprint == arrayId) this.backlogsFilteredBySprint.push(subtask);
        }
        this.backlogService.savePosition(this.backlogsFilteredBySprint).subscribe( dataProjets => {
          this.getBacklogs();
        });
        this.backlogsFilteredBySprint = [];
      });
    }
  }

  openBacklogModal(content:any,idBacklog:number) {
    this.getBacklogById(idBacklog);
    this.getCommentairesBacklog(idBacklog);
    this.modalService.open(content, { size: 'xl', backdrop: 'static' });
  }

  openBacklogUpdate(content:any,backlog:Backlog) {
    this.backlogService.getBacklogById(backlog.id).subscribe( data => {
      if(data.dateCreation) data.dateCreation = formatDate(data.dateCreation, 'yyyy-MM-dd', 'en-US');
      else data.dateCreation = null;
      if(data.dateDebut) data.dateDebut = formatDate(data.dateDebut, 'yyyy-MM-dd', 'en-US');
      if(data.dateFin) data.dateFin = formatDate(data.dateFin, 'yyyy-MM-dd', 'en-US');
      data.idCreateur.photo = this.photos.filter(resp => resp.user.id == data.idCreateur.id)[0].nom;
      this.backlogUpdate = data;
    });
    this.open(content);
  }

  setBacklogToPasValable(backlog:Backlog) {
    backlog.etat = 'Pas valable';
    this.backlogService.update(backlog.id,backlog,this.login.getId()).subscribe( data => {
      this.getBacklogById(backlog.id);
      for(let i = 0; i < this.backlogsProjet.length; i++) {
        if(this.backlogsProjet[i].id == backlog.id) {
          this.backlogsProjet[i] = data;
          break;
        }
      }
    });
  }

  setBacklogToEnAttente(backlog:Backlog) {
    backlog.etat = 'en attente';
    this.backlogService.update(backlog.id,backlog,this.login.getId()).subscribe( data => {
      console.log('updated successfully');
      this.getBacklogById(backlog.id);
      for(let i = 0; i < this.backlogsProjet.length; i++) {
        if(this.backlogsProjet[i].id == backlog.id) {
          this.backlogsProjet[i] = data;
          break;
        }
      }
    });
  }

  setBacklogToValable(backlog:Backlog) {
    backlog.etat = 'Valable';
    this.backlogService.update(backlog.id,backlog,this.login.getId()).subscribe( data => {
      console.log(data);
      this.getBacklogById(backlog.id);
      for(let i = 0; i < this.backlogsProjet.length; i++) {
        if(this.backlogsProjet[i].id == backlog.id) {
          console.log('updated really');
          this.backlogsProjet[i] = data;
          break;
        }
      }
    });
  }

  setBacklogToTermine(backlog:Backlog) {
    backlog.etat = 'Terminé';
    this.backlogService.update(backlog.id,backlog,this.login.getId()).subscribe( data => {
      this.getBacklogById(backlog.id);
      for(let i = 0; i < this.backlogsProjet.length; i++) {
        if(this.backlogsProjet[i].id == backlog.id) {
          this.backlogsProjet[i] = data;
          break;
        }
      }
    });
  }

  updateBacklogSelected(backlog:Backlog) {
    this.backlogService.update(backlog.id,backlog,this.login.getId()).subscribe( data => {
      alert('Backlog mis à jour avec succès');
      this.getBacklogById(backlog.id);
    });
  }

  /*--------------------------------- Commentaire --------------------------------------*/

  commentaireWithFileBacklog(submitForm: FormGroup) {
    this.saveCommentFileBacklog(submitForm);
  }

  commenterBacklog(backlog:Backlog) {
    this.backlogService.getBacklogById(backlog.id).subscribe( data => {
      this.newCommentaireBacklog.backlog = data;
      this.newCommentaireBacklog.createur = new User();
      this.newCommentaireBacklog.createur.id = this.login.getId();
      this.commentaireService.create(this.newCommentaireBacklog,this.login.getId()).subscribe(data => {
        this.newCommentaireBacklog = new Commentaire();
        this.getCommentairesBacklog(backlog.id);
        this.getFichiersCommentaires();
      },
      error => console.log(error));
    });
  }  

  deleteCommentaireBacklog(idComm:number,backlog:Backlog) {
    this.commentaireService.delete(idComm,this.login.getId()).subscribe( data => {
      this.getCommentairesBacklog(backlog.id);
    });
  }

  getCommentaireFile(commentaire:Commentaire):string | undefined {
    return this.fichiersCommentairesBacklog.find(resp => resp.commentaire.idCommentaire == commentaire.idCommentaire)?.nom;
  }

  getFichiersCommentaires() {
    this.fichierService.getCommentairesFichiers().subscribe( data => {
      this.fichiersCommentairesBacklog = data;
    });
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
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
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

  uploadFileCommentBacklog(event:any,submitForm: FormGroup) {
    this.fichiersBacklog = event.target.files;
    this.fileNameBacklog = this.fichiersBacklog[0].name;
  }

  /*--------------------------------- Choix projet --------------------------------------*/

  checkSession() {
    if(this.sessionStorage.getDataFromSessionStorage('projetWorking') == null) {
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
    } else {
      this.idProjet = this.sessionStorage.getDataFromSessionStorage('projetWorking');
      this.projetService.getProjetById(this.idProjet).subscribe( data => {
        this.projetInWork = data;
        this.getSprints(this.projetInWork);
        this.fichierService.getUsersPhoto().subscribe( data => {
          this.photos = data;
        });
        this.fichierService.getUsersPhoto().subscribe( data => {
          this.photos = data;
          this.getBacklogResponsables(this.projetInWork);
          this.getBacklogScrumMasters(this.projetInWork);
          this.getBacklogDeveloppers(this.projetInWork);
          this.getTachesProjet(this.projetInWork);
        });
        this.getBacklogs();
        this.getFichiersCommentaires();
        this.getFonctionnalitesProjet();
      });
    }
  }

  voirProjetDetail(idProjet:number) {
    this.modalService.dismissAll();
    this.router.navigate(['/ProjetProfile/'+idProjet]);
  }

  open(content:any) {
    this.modalService.open(content, { size: 'xl', backdrop: 'static' });
  }

  choixProjet(idProjet:number) {
    this.modalService.dismissAll();
    this.sessionStorage.saveDataToSessionStorage('projetWorking',idProjet);
    this.idProjet = this.sessionStorage.getDataFromSessionStorage('projetWorking');
    this.projetService.getProjetById(this.idProjet).subscribe( dataProjets => {
      this.projetInWork = dataProjets;
      this.ngOnInit();
    });
  }
  
  /*--------------------------------- Fonctionnalite --------------------------------------*/

  getFonctionnalitesProjet() {
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
        if(fonctionnalite.idCreateur) {
          this.fichierService.getFichierByUserId(fonctionnalite.idCreateur.id).subscribe( photo => {
            fonctionnalite.idCreateur.photo = photo.nom;
          });
        }
      }  
      this.fonctionnalitesBacklog = data;
    });
  }
  
  /*--------------------------------- Responsable --------------------------------------*/

  assignDevellopers(user:User) {
    this.newResponsableBacklog = new ResponsableProjet();
    if(!user.isDevelopper) {
      user.isDevelopper = true;
      this.newResponsableBacklog.idDevellopers = user;
      this.newResponsableBacklog.projet = this.projetInWork;
      this.newResponsableBacklog.backlog = new Backlog();
      this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
      this.responsableService.create(this.newResponsableBacklog,this.login.getId()).subscribe( data => {
        this.getBacklogDeveloppers(this.projetInWork);
        this.getBacklogById(this.backlogSelected.id);
        this.getDevelopersToAssign();
        alert('user inserted successfully');
      });
    } else {
      user.isDevelopper = false;
      const responsable:ResponsableProjet[] = this.responsablesBacklog.filter(resp => resp.idResponsable && resp.idResponsable.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getDevelopersToAssign();
        this.getBacklogDeveloppers(this.projetInWork);
        this.getBacklogById(this.backlogSelected.id);
        alert('user deleted successfully');
      });
    }
  }

  assignScrumMasterB(user:User, backlog:Backlog | null | undefined) {
    this.newResponsableBacklog = new ResponsableProjet();
    if(!user.isResponsable) {
      user.isResponsable = true;
      this.newResponsableBacklog.idScrumMaster = user;
      this.newResponsableBacklog.projet = this.projetInWork;
      this.newResponsableBacklog.backlog = new Backlog();
      if(backlog) {
        this.newResponsableBacklog.backlog.id = backlog.id;
      } else {
        this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
      }
      this.responsableService.create(this.newResponsableBacklog,this.login.getId()).subscribe( data => {
        this.getBacklogResponsables(this.projetInWork);
        this.getResponsablesToAssign();
        if(backlog) {
          this.newResponsableBacklog.backlog.id = backlog.id;
        } else {
          this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
        }
        alert('user inserted successfully');
      });
    } else {
      user.isResponsable = false;
      const responsable:ResponsableProjet[] = this.responsablesBacklog.filter(resp => resp.idScrumMaster && resp.idScrumMaster.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getResponsablesToAssign();
        this.getBacklogResponsables(this.projetInWork);
        if(backlog) {
          this.newResponsableBacklog.backlog.id = backlog.id;
        } else {
          this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
        }
        alert('user deleted successfully');
      });
    }
  }

  assignResponsable(user:User, backlog:Backlog | null | undefined) {
    this.newResponsableBacklog = new ResponsableProjet();
    if(!user.isResponsable) {
      user.isResponsable = true;
      this.newResponsableBacklog.idResponsable = user;
      this.newResponsableBacklog.projet = this.projetInWork;
      this.newResponsableBacklog.backlog = new Backlog();
      if(backlog) {
        this.newResponsableBacklog.backlog.id = backlog.id;
      } else {
        this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
      }
      this.responsableService.create(this.newResponsableBacklog,this.login.getId()).subscribe( data => {
        this.getBacklogResponsables(this.projetInWork);
        this.getResponsablesToAssign();
        if(backlog) {
          this.newResponsableBacklog.backlog.id = backlog.id;
        } else {
          this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
        }
        alert('user inserted successfully');
      });
    } else {
      user.isResponsable = false;
      const responsable:ResponsableProjet[] = this.responsablesBacklog.filter(resp => resp.idResponsable && resp.idResponsable.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getResponsablesToAssign();
        this.getBacklogResponsables(this.projetInWork);
        if(backlog) {
          this.newResponsableBacklog.backlog.id = backlog.id;
        } else {
          this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
        }
        alert('user deleted successfully');
      });
    }
  }

  assignBacklogResponsable(user:User,backlog:Backlog) {
    this.newResponsableBacklog = new ResponsableProjet;
    this.newResponsableBacklog.idResponsable = user;
    this.newResponsableBacklog.projet = this.projetInWork;
    this.newResponsableBacklog.backlog = backlog;
    this.responsableService.create(this.newResponsableBacklog,this.login.getId()).subscribe( data => {
      this.getBacklogs();
      alert('user inserted successfully');
    });
  }

  assignScrumMaster(user:User) {
    this.newResponsableBacklog = new ResponsableProjet();
    if(!user.isScrumMaster) {
      user.isScrumMaster = true;
      this.newResponsableBacklog.idScrumMaster = user;
      this.newResponsableBacklog.projet = this.projetInWork;
      this.newResponsableBacklog.backlog = new Backlog();
      this.newResponsableBacklog.backlog.id = this.backlogSelected.id;
      this.responsableService.create(this.newResponsableBacklog,this.login.getId()).subscribe( data => {
        this.getBacklogScrumMasters(this.projetInWork);
        this.getBacklogById(this.backlogSelected.id);
        this.getScrumMastersToAssign();
        alert('user inserted successfully');
      });
    } else {
      user.isScrumMaster = false;
      const responsable:ResponsableProjet[] = this.responsablesBacklog.filter(resp => resp.idResponsable && resp.idResponsable.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getScrumMastersToAssign();
        this.getBacklogScrumMasters(this.projetInWork);
        this.getBacklogById(this.backlogSelected.id);
        alert('user deleted successfully');
      });
    }
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
        if(scrumMaster.idResponsable && this.photos.find( resp => resp.user.id == scrumMaster.idResponsable.id)) {
          scrumMaster.idResponsable.photo = this.photos.find(resp => resp.user.id == scrumMaster.idResponsable.id)!.nom;
        }
      }
      this.scrumMastersBacklog = data;
    });
  }

  getDevellopersFiltered() {
    this.developersBacklogFiltered = this.developersToAssign;
    this.developersBacklogFiltered = this.developersToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  getDevelopersToAssign() {
    this.userService.getUsersByRole('Développeur') .subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
        }
      }
      for(let assigned of data) {
        if(this.developersBacklog.find(resp => resp.idDevellopers && resp.idDevellopers.id == assigned.id && resp.backlog.id == this.backlogSelected.id)) {
          // assigned.isResponsable = true;
          assigned.isDevelopper = true;
        }
      }
      this.developersToAssign = data;
      this.developersBacklogFiltered = this.developersToAssign;
    });
  }

  getResponsableFiltered() {
    this.responsableBacklogFiltered = this.responsablesToAssign;
    this.responsableBacklogFiltered = this.responsablesToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }
  
  getResponsablesToAssign() {
    this.userService.usersWithTheirRoles().subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
        }
      }
      for(let assigned of data) {
        if(this.responsablesBacklog.find(resp => resp.idResponsable && resp.idResponsable.id == assigned.id && resp.backlog.id == this.backlogSelected.id)) {
          assigned.isResponsable = true;
        }
      }
      // console.log(data);
      this.responsablesToAssign = data;
      this.responsableBacklogFiltered = this.responsablesToAssign;
    });
  }

  getResponsable(backlog:Backlog) {
    this.userService.getUsersByRole('SCRUM_master').subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
        }
      }
      for(let assigned of data) {
        if(this.responsablesBacklog.find(resp => resp.idScrumMaster && resp.idScrumMaster.id == assigned.id && resp.backlog.id == backlog.id)) {
          assigned.isScrumMaster = true;
        }
      }
      this.scrumMastersToAssign = data;
      this.scrumMastersBacklogFiltered = this.scrumMastersToAssign;
    });
  }

  getScrumMastersToAssign() {
    this.userService.getUsersByRole('SCRUM_master').subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
        }
      }
      for(let assigned of data) {
        if(this.responsablesBacklog.find(resp => resp.idScrumMaster && resp.idScrumMaster.id == assigned.id && resp.backlog.id == this.backlogSelected.id)) {
          // assigned.isResponsable = true;
          assigned.isScrumMaster = true;
        }
      }
      this.scrumMastersToAssign = data;
      this.scrumMastersBacklogFiltered = this.scrumMastersToAssign;
      console.log(this.scrumMastersBacklogFiltered);
    });
  }

  getScrumMastersFiltered() {
    this.scrumMastersBacklogFiltered = this.scrumMastersToAssign;
    this.scrumMastersBacklogFiltered = this.responsablesToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  onItemClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('active')) {
      target.classList.remove('active');
    } else {
      target.classList.add('active');
    }
  }
  
  /*--------------------------------- Sprint --------------------------------------*/

  openSprintModal(content:any,idSprint:number) {
    this.getSprintById(idSprint);
    this.backlogsAtSprint = [];
    for(let backlog of this.backlogsProjet) {
      if(backlog.sprint?.idSprint == idSprint) {
        this.backlogsAtSprint.push(backlog);
      }
    }
    this.modalService.open(content, { size: 'xl', backdrop: 'static' });
  }

  deleteSprint(sprint: Sprint) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      const backlogsToDelete = this.backlogsProjet.filter(resp => resp.sprint?.idSprint == sprint.idSprint);
      const updateObservables = backlogsToDelete.map(backlog => {
        backlog.sprint = null;
        return this.backlogService.update(backlog.id, backlog, this.login.getId());
      });
      forkJoin(updateObservables).subscribe(() => {
          this.sprintService.delete(sprint.idSprint,this.login.getId()).subscribe( data => {
          this.getBacklogs();
          this.getSprintsProjet(this.idProjet);
          this.modalService.dismissAll();
        });
      });
    }
  }

  getSprintById(idSprint:number) {
    this.sprintService.getSprintById(idSprint).subscribe( sprint => {
      if(sprint.date_debut) sprint.date_debut = formatDate(sprint.date_debut, 'yyyy-MM-dd hh:mm', 'en-US');
      if(sprint.date_fin) sprint.date_fin = formatDate(sprint.date_fin, 'yyyy-MM-dd hh:mm', 'en-US');
      this.sprintSelected = sprint;
    })
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
      }
      this.sprintsProjet = data;
    });
  }

  getSprintsProjet(idProjet:number) {
    this.sprintService.getSprintByIdProjet(idProjet).subscribe( sprints => {
      this.sprintsProjet = sprints;
    });
  }

  isSprintEmpty(sprint:Sprint):boolean {
    let resp;
    try {
      for(let spb of this.sprintBacklogs) {
        if(spb.sprint && spb.sprint.idSprint == sprint.idSprint) {
          resp = true;
          break;
        } else resp = false;
      }
    } catch(error) {}
    return resp;
  }

  setSprint(sprint:Sprint) {
    this.sprintService.getSprintById(sprint.idSprint).subscribe( sprintDetail => {
      // sprintDetail.date_debut = sprint.date_debut;
      // sprintDetail.date_fin = sprint.date_fin;
      sprintDetail.nom = sprint.nom;
      sprintDetail.objectif = sprint.objectif;      
      sprintDetail.etat = 'en progrès';
      this.sprintService.update(sprintDetail.idSprint,sprintDetail,this.login.getId()).subscribe( data => {
        this.getSprintById(sprint.idSprint);
        this.getSprintsProjet(this.idProjet);
        this.dateDebut = new Date();
        this.dateFin = new Date();
        this.modalService.dismissAll();
      });
    });
  }

  startSprint(sprint:Sprint) {
    sprint.etat = "en progrès";
    this.updateSprint(sprint);
  }

  finishSprint(sprint:Sprint) {
    sprint.etat = "Terminé";
    this.updateSprint(sprint);
  }

  updateSprint(sprint:Sprint) {
    this.sprintService.getSprintById(sprint.idSprint).subscribe( sprintDetail => {
      sprintDetail.date_debut = new Date();
      sprintDetail.date_fin = new Date();
      if(sprint.termine) sprintDetail.termine = new Date();
      sprintDetail.etat = sprint.etat;
      this.sprintService.update(sprintDetail.idSprint,sprintDetail,this.login.getId()).subscribe( data => {
        this.getSprintById(sprint.idSprint);
        this.getSprintsProjet(this.idProjet);
        this.dateDebut = new Date();
        this.dateFin = new Date();
        this.modalService.dismissAll();
      });
    });
  }
  
  /*--------------------------------- SprintBacklog --------------------------------------*/

  getSprintBacklogs() {
    this.sprintBacklogService.getSprintBacklogByIdProjet(this.projetInWork.idProjet).subscribe( sprintBacklogs => {
      this.sprintBacklogs = sprintBacklogs;
      console.log(this.sprintBacklogs);
    })
  }
  
  /*--------------------------------- Tache ----------------------------------------------*/
  
  getTachesProjet(projet:Projet) {
    this.tacheService.getTacheByIdProjet(projet.idProjet).subscribe( data => {
      this.tachesProjet = data;
    });
  }
}
