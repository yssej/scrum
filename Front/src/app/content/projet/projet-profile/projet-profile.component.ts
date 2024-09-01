import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentaire } from 'src/app/models/commentaire';
import { Fichier } from 'src/app/models/fichier';
import { Projet } from 'src/app/models/projet';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { FichierService } from 'src/app/services/fichier.service';
import { ProjetService } from 'src/app/services/projet.service';
import { saveAs } from 'file-saver';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { HistoriqueService } from 'src/app/services/historique.service';
import { Historique } from 'src/app/models/historique';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { ResponsableProjetService } from 'src/app/services/responsable-projet.service';
import { ResponsableProjet } from 'src/app/models/responsable-projet';
import { Chart, registerables } from 'chart.js';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { BacklogService } from 'src/app/services/backlog.service';
import { SprintService } from 'src/app/services/sprint.service';
import { TacheService } from 'src/app/services/tache.service';
import { FonctionnaliteService } from 'src/app/services/fonctionnalite.service';

@Component({
  selector: 'app-projet-profile',
  templateUrl: './projet-profile.component.html',
  styleUrls: ['./projet-profile.component.css']
})
export class ProjetProfileComponent implements OnInit{

  totalLength:any;
  page:number = 1;
  page2:number = 1;
  projet:Projet;
  updatedProjet:Projet;
  commentairesProjet:Commentaire[];
  fichiersProjet:Fichier[];
  fichiersCommentaires:Fichier[];
  photos:Fichier[];
  fileStatus = { status: '', requestType: '', percent: 0 };
  filenames: string[] = [];
  myGroup: FormGroup;
  nom:File[];
  fileName:string;
  comm:Commentaire = new Commentaire();
  moi:User = new User();
  activity = 'historique';
  historiqueProjet:Historique[];
  nomRecherche:string;
  usersWithRole:User[];
  dateDebut:string;
  dateFin:string;
  closeResult = '';
  chartName:string;
  responsablesToAssign:User[];
  scrumMasterToAssign:User[];
  productOwnerToAssign:User[];
  devellopersToAssign:User[];
  responsableFiltered:User[];
  scrumMasterFiltered:User[];
  productOwnerFiltered:User[];
  devellopersFiltered:User[];
  responsablesProjet:ResponsableProjet[];
  newResponsable:ResponsableProjet;
  @ViewChild('fileInput') fileInput: ElementRef;
  isLogged = false;
  isFiltered: boolean;
  private serverUrl = 'http://localhost:8081/socket'
  private stompClient;
  pdfSrc: string = 'C:\Users\Test\Desktop\Jessy\VScode - workspace\projet_SCRUM(2)\src\assets\Rapport_L3_ETU1113.pdf';

  constructor(private route:ActivatedRoute,private projetService:ProjetService,private commentaireService:CommentaireService,private sprintService:SprintService,
    private sessionStorage:LocalStorageService,private router:Router,private modalService:NgbModal,private responsableService:ResponsableProjetService,
    private fichierService:FichierService,private userService:UserService,private login:LoginService,private historiqueService:HistoriqueService,
    private backlogService:BacklogService,private tacheService:TacheService,private fonctionnaliteService:FonctionnaliteService) {
      
      Chart.register(...registerables);
      this.myGroup = new FormGroup({
        nom: new FormControl()
      });
      this.initializeWebSocketConnection();
    }

  ngOnInit(): void {
    if(this.login.getIsLogged()) {
      this.isLogged = true;
      this.getFichiersCommentaires(this.route.snapshot.params['id']);
      this.getUserLogged();
      this.getProjet();
      this.getPdp();
      this.getUsersByRole("SCRUM_master");
    }
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      
    });
  }

  sendMessage(message:string){
    this.stompClient.send("/app/send/message" , {}, message);
  }

  getUserLogged() {
    this.userService.getUserById(this.login.getId()).subscribe( data => {
      this.moi = data;
    });
  }

  convertDateFormat(inputDate: string): string {
    // Parse the input date in dd/MM/yyyy format
    let dateParts,day,month,year,parsedDate;
    if(inputDate && (inputDate.includes('/') || inputDate.includes('-'))) {
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
  
  getMondaysBetweenDates(startDate: Date, endDate: Date): string[] {
    const result: string[] = [];
    const currentDate = new Date(startDate);
    const strtDt = `${startDate.getDate().toString().padStart(2, '0')}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getFullYear()}`;
    if(new Date(startDate).getDay() !== 1) result.push(strtDt);
  
    // Iterate through each day starting from the start date until the end date
    while (currentDate <= endDate) {
      // Check if the current day is Monday (day of the week is 1)
      if (currentDate.getDay() === 1) {
        // Format the current date as 'dd-MM-yyyy' and push it to the result array
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
        result.push(formattedDate);
      }
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return result;
  }

  getDatesBetween(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = new Date(startDate);
    const strtDt = `${startDate.getDate().toString().padStart(2, '0')}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getFullYear()}`;
  
    while (currentDate <= endDate) {
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
      dates.push((formattedDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  }

  ngAfterViewIniter(isClicked?:boolean) {
    let weeks:string[] = [];
    let dateFin:string;
    if(this.projet.etat == 'Terminé') {
      if(this.projet.dateTermine) dateFin = this.projet.dateTermine;
      else if(this.projet.dateFin) dateFin = this.projet.dateFin;
      else dateFin = new Date().toLocaleDateString();
    } else {
      if(new Date(this.convertDateFormat(this.projet.dateFin)) > new Date()) dateFin = this.projet.dateFin;
      else dateFin = new Date().toLocaleDateString();
    }

    // if(new Date(this.convertDateFormat(dateFin)) > new Date()) dateFin = new Date().toLocaleDateString();
    // else dateFin = this.projet.dateFin;
    const dateCreation = new Date(this.projet.dateCreation).toLocaleDateString();
    console.log(new Date(this.convertDateFormat(this.projet.dateCreation)));
    weeks = this.getDatesBetween(new Date(this.convertDateFormat(this.projet.dateCreation)), new Date(this.convertDateFormat(dateFin)));

    let sprintsLeft:number[] = [];
    let sprintsPreview:number[] = [];
    this.sprintService.getSprintByIdProjet(this.route.snapshot.params['id']).subscribe( sprints => {
      let count:number = 0;
      let count2:number = 0;
      for(let h = 0; h < weeks.length; h++) {
        for(let i = 0; i < sprints.length; i++) {
          if(this.convertDateFormat(weeks[h]) == formatDate(sprints[i].dateCreation, 'yyyy-MM-dd','en-CA')) count++;
          if(sprints[i].termine && (this.convertDateFormat(weeks[h]) == formatDate(sprints[i].termine, 'yyyy-MM-dd','en-CA'))) count--;
        }
        sprintsLeft.push(count);
        // count = sprints.length;
        if(this.convertDateFormat(weeks[h]) == this.convertDateFormat(new Date().toLocaleDateString())) break;

        for(let h = 0; h < weeks.length; h++) {
          for(let i = 0; i < sprints.length; i++) {
            if(sprints[i].date_debut && this.convertDateFormat(weeks[h]) == formatDate(sprints[i].date_debut, 'yyyy-MM-dd','en-CA')) count2++;
            if(sprints[i].date_fin && (this.convertDateFormat(weeks[h]) == formatDate(sprints[i].date_fin, 'yyyy-MM-dd','en-CA'))) count2--;
          }
          sprintsPreview.push(count2);
        }
      }
    });

    let backlogsLeft:number[] = [];
    let backlogPreview:number[] = [];
    this.backlogService.getBacklogByIdProjet(this.route.snapshot.params['id']).subscribe( backlogs => {
      backlogs = backlogs.filter(resp => resp.etat != 'Pas valable');
      let count:number = 0;
      let count2:number = 0;
      for(let h = 0; h < weeks.length; h++) {
        for(let i = 0; i < backlogs.length; i++) {
          if(this.convertDateFormat(weeks[h]) == formatDate(backlogs[i].dateCreation, 'yyyy-MM-dd','en-CA')) count++;
          if(backlogs[i].termine && (this.convertDateFormat(weeks[h]) == formatDate(backlogs[i].termine, 'yyyy-MM-dd','en-CA'))) count--;
        }
        backlogsLeft.push(count);
        if(this.convertDateFormat(weeks[h]) == this.convertDateFormat(new Date().toLocaleDateString())) break
      }

      for(let h = 0; h < weeks.length; h++) {
        for(let i = 0; i < backlogs.length; i++) {
          if(backlogs[i].dateDebut && this.convertDateFormat(weeks[h]) == formatDate(backlogs[i].dateDebut, 'yyyy-MM-dd','en-CA')) count2++;
          if(backlogs[i].dateFin && (this.convertDateFormat(weeks[h]) == formatDate(backlogs[i].dateFin, 'yyyy-MM-dd','en-CA'))) count2--;
        }
        backlogPreview.push(count2);
      }
    });

    let fonctionnalitesLeft:number[] = [];
    let fonctionnalitesPreview:number[] = [];
    this.fonctionnaliteService.getFonctionnaliteByIdProjet(this.route.snapshot.params['id']).subscribe( fonctionnalites => {
      fonctionnalites = fonctionnalites.filter(resp => resp.backlog.etat != 'Pas valable');
      let count:number = 0;
      let count2:number = 0;
      for(let h = 0; h < weeks.length; h++) {
        for(let i = 0; i < fonctionnalites.length; i++) {
          if(this.convertDateFormat(weeks[h]) == formatDate(fonctionnalites[i].dateDebut, 'yyyy-MM-dd','en-CA')) count++;
          if(fonctionnalites[i].termine && (this.convertDateFormat(weeks[h]) == formatDate(fonctionnalites[i].dateFin, 'yyyy-MM-dd','en-CA'))) count--;
        }
        fonctionnalitesLeft.push(count);
        if(this.convertDateFormat(weeks[h]) == this.convertDateFormat(new Date().toLocaleDateString())) break
      }

      for(let h = 0; h < weeks.length; h++) {
        for(let i = 0; i < fonctionnalites.length; i++) {
          if(fonctionnalites[i].dateDebut && this.convertDateFormat(weeks[h]) == formatDate(fonctionnalites[i].dateDebut, 'yyyy-MM-dd','en-CA')) count2++;
          if(fonctionnalites[i].dateFin && (this.convertDateFormat(weeks[h]) == formatDate(fonctionnalites[i].dateFin, 'yyyy-MM-dd','en-CA'))) count2--;
        }
        fonctionnalitesPreview.push(count2);
      }
    });

    let tasksLeft:number[] = [];
    let tasksPreview:number[] = [];
    this.tacheService.getTacheByIdProjet(this.route.snapshot.params['id']).subscribe( tasks => {
      tasks = tasks.filter(resp => resp.fonctionnalite.backlog.etat != 'Pas valable');
      let count:number = 0;
      let count2:number = 0;
      for(let h = 0; h < weeks.length; h++) {
        for(let i = 0; i < tasks.length; i++) {
          if(this.convertDateFormat(weeks[h]) == formatDate(tasks[i].dateCreation, 'yyyy-MM-dd','en-CA')) count++;
          if(tasks[i].termine && (this.convertDateFormat(weeks[h]) == formatDate(tasks[i].termine, 'yyyy-MM-dd','en-CA'))) count--;
        }
        tasksLeft.push(count);
        if(this.convertDateFormat(weeks[h]) == this.convertDateFormat(new Date().toLocaleDateString())) break;

        for(let h = 0; h < weeks.length; h++) {
          for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].dateDebut && this.convertDateFormat(weeks[h]) == formatDate(tasks[i].dateDebut, 'yyyy-MM-dd','en-CA')) count2++;
            if(tasks[i].dateFin && (this.convertDateFormat(weeks[h]) == formatDate(tasks[i].dateFin, 'yyyy-MM-dd','en-CA'))) count2--;
          }
          tasksPreview.push(count2);
        }
      }
      const chartData = {
        labels: weeks,
        datasets: [
          {
            label: 'Backlog',
            data: backlogsLeft,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'B Prévision',
            data: backlogPreview,
            fill: false,
            borderColor: 'rgb(0, 128, 0)',
            tension: 0.1
          },
          {
            label: 'Sprint',
            data: sprintsLeft,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          },
          {
            label: 'S prévision',
            data: sprintsPreview,
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            tension: 0.1
          },
          {
            label: 'Module',
            data: fonctionnalitesLeft,
            fill: false,
            borderColor: 'rgb(0, 128, 255)',
            tension: 0.1
          },
          {
            label: 'M Prévision',
            data: fonctionnalitesPreview,
            fill: false,
            borderColor: 'rgb(128, 255, 255)',
            tension: 0.1
          },
          {
            label: 'Tache',
            data: tasksLeft,
            fill: false,
            borderColor: 'skyblue',
            tension: 0.1
          },
          {
            label: 'T prévision',
            data: tasksPreview,
            fill: false,
            borderColor: 'blue',
            tension: 0.1
          }
        ]
      };
      
      const lineChart = new Chart('myChart', {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
   
  }

  getProjet() {
    this.projetService.getProjetById(this.route.snapshot.params['id']).subscribe( data => {
      const date = new Date(data.dateCreation);
      data.dateCreation = date.toLocaleDateString() + " " + date.toLocaleTimeString();
      if(data.dateDebut) {
        const dateDebut = new Date(data.dateDebut);
        data.dateDebut = dateDebut.toLocaleDateString();
      }
      if(data.dateFin) {
        const dateFin = new Date(data.dateFin);
        data.dateFin = dateFin.toLocaleDateString();
      }
      if(data.dateTermine) {
        const dateTermine = new Date(data.dateTermine);
        data.dateTermine = dateTermine.toLocaleDateString();
      }
      this.projet = data;
      this.getCommentaireProjet(data.idProjet);
      this.getFichierByIdProjet(data.idProjet);
      this.getPdp();
      this.getHistoriqueProjet();
      this.ngAfterViewIniter();
    });
  }

  getCommentaireProjet(idProjet:number) {
    this.commentaireService.getProjetByIdProjet(idProjet).subscribe( data => {
      // console.log(data)
      this.commentairesProjet = data;
      for(let comm of data) {
        comm.updating = false;
        const date = new Date(comm.temp);
        comm.temp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        for(let image of this.photos) {
          if(comm.createur.id == image.user.id) { comm.createur.photo = image.nom; }
        }
      }
    });
  }

  getFichiersCommentaires(idProjet:number) {
    this.fichierService.getCommentairesFichiers().subscribe( data => {
      this.fichiersCommentaires = data;
      // console.log(this.fichiersCommentaires);
    });
  }

  getFichierByIdProjet(idProjet:number) {
    this.fichierService.getFichierByIdProjet(idProjet).subscribe( data => {
      this.fichiersProjet = data;
    });
  }

  getCommentaireFile(commentaire:Commentaire):string | undefined {
    return this.fichiersCommentaires.find(resp => resp.commentaire.idCommentaire == commentaire.idCommentaire)?.nom;
  }

  getPdp() {
    this.fichierService.getUsersPhoto().subscribe( data => {
      this.photos = data;
      for(let image of this.photos) {
        if(this.projet && this.projet.idCreateur) {         
          if(this.projet.idCreateur.id == image.user.id) { this.projet.idCreateur.photo = image.nom; }
        }
        if(this.projet && this.projet.idResponsable) {
          if(this.projet.idResponsable.id == image.user.id) { this.projet.idResponsable.photo = image.nom; }
        }
      };
      this.getProductOwnerToAssign();
      this.getResponsablesProjet(this.route.snapshot.params['id']);
    },
    err => console.log(err));
  }

  // onSelect(event) {
  //   console.log(event);
  // }

  // onRemove(event) {
  //   console.log(event);
  // }

  onDownloadFile(filename: string): void {
    this.fichierService.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onDownloadFileCommentaire(commentaire: Commentaire): void {
    let resp = '';
    for(let file of this.fichiersCommentaires) {
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

  uploadFileComment(event:any,submitForm: FormGroup) {
    this.nom = event.target.files;
    this.fileName = this.nom[0].name;
    // this.saveCommentFile(submitForm);
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const fileContents = e.target.result;
      // Vous pouvez utiliser fileContents ici, par exemple pour l'afficher dans une balise <pre> :
      console.log(fileContents);
    };
    reader.readAsText(file);
  }

  uploadFile(event:any,submitForm: FormGroup) {
    this.nom = event.target.files;
    // const selectedFile = event.target.files[0];
    // if(selectedFile) this.readFile(selectedFile);
    this.onSubmit(submitForm);
  }

  onSubmit(submitForm: FormGroup) {
    this.save(submitForm);
  }

  save(submitForm: FormGroup) {
    if(submitForm.valid){
      const losika=submitForm.value;
      const formData  = new FormData ();
      formData.append('projet',JSON.stringify(losika)); 
      for (const file of this.nom) { 
    
        formData.append('tdrName',file,file.name);
        console.log(file.name);
      }
      this.fichierService.saveProjectFile(this.route.snapshot.params['id'],this.login.getId(),formData).subscribe(
        event => {
          console.log(event);
          this.getFichierByIdProjet(this.projet.idProjet);
          this.getHistoriqueProjet();
        },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
    } else {
      console.log(submitForm);
    }
  }

  onItemClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('active')) {
      target.classList.remove('active');
    } else {
      target.classList.add('active');
    }
  }

  saveCommentFile(submitForm: FormGroup) {
    if(submitForm.valid){
      const losika=submitForm.value;
      const formData  = new FormData ();
      formData.append('projet',JSON.stringify(losika)); 
      for (const file of this.nom) { 
    
        formData.append('tdrName',file,file.name);
        console.log(file.name);
      }
      this.fichierService.saveCommentFile(this.route.snapshot.params['id'],formData,this.login.getId(),this.comm.commentaire).subscribe(
        event => {
          console.log(event);
          this.comm = new Commentaire;
          this.fileName = '';
          this.getFichiersCommentaires(this.route.snapshot.params['id']);
          this.getCommentaireProjet(this.route.snapshot.params['id']);
          this.getHistoriqueProjet();
        },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
    } else {
      console.log(submitForm);
    }
  }

  commentaireWithFile(submitForm: FormGroup) {
    this.saveCommentFile(submitForm);
    // console.log(submitForm);
  }

  commenterProjet() {
    this.projetService.getProjetById(this.route.snapshot.params['id']).subscribe( data => {
      this.comm.projetID = data;
      this.comm.projet = data;
      this.comm.createur = this.moi;
      // console.log(this.comm);
      this.commentaireService.create(this.comm,this.login.getId()).subscribe(data => {
        // console.log(data);
        // alert('successfully');
        this.comm = new Commentaire();
        this.getCommentaireProjet(this.route.snapshot.params['id']);
        this.getHistoriqueProjet();
      },
      error => console.log(error));
    });
  }

  deleteCommentaire(idComm:number) {
    if (window.confirm('ëtes vous sûr de supprimer ce commentaire  ?')) {
      this.commentaireService.delete(idComm,this.login.getId()).subscribe( data => {
        this.getProjet();
      });
    }
    
  }

  updateCommentaire(idCommentaire:number,commentaire:Commentaire) {
    if(commentaire.updating == false) commentaire.updating = true;
    else {
      commentaire.temp = '';
      this.commentaireService.update(idCommentaire,commentaire,this.login.getId()).subscribe( data => {
        commentaire.updating = false;
        this.getProjet();
      });
    }
  }

  setActivity() {
    if(this.activity == 'historique') this.activity = 'commentaire';
    else this.activity = 'historique';
  }

  setProjectToAfaire(idProjet:number,projet:Projet) {
    this.projetService.getProjetById(idProjet).subscribe( project => {
      project.etat = 'à faire';
      this.projetService.update(idProjet,project,this.login.getId()).subscribe( data => {
        this.getProjet();
      });
    });
  }

  setProjectToInProgress(idProjet:number,projet:Projet) {
    this.projetService.getProjetById(idProjet).subscribe( project => {
      project.etat = 'En progrès';
      this.projetService.update(idProjet,project,this.login.getId()).subscribe( data => {
        this.getProjet();
      });
    });
  }

  setProjectToTermine(idProjet:number,projet:Projet) {
    this.projetService.getProjetById(idProjet).subscribe( project => {
      project.etat = 'Terminé';
      this.projetService.update(idProjet,project,this.login.getId()).subscribe( data => {
        this.getProjet();
      });
    });
  }

  openFileInput() {
    // console.log(this.fileInput);
    this.fileInput.nativeElement.click();
  }

  afficherProjet(idProjet:number | null) {
    this.isFiltered = true;
    if(idProjet) this.historiqueProjet = this.historiqueProjet.filter(resp => resp.projet.idProjet == idProjet);
    else this.historiqueProjet = this.historiqueProjet.filter(resp => resp.historique.includes("projet"));
    // console.log(this.historiqueProjet);
  }

  afficherBacklog(idProjet:number | null) {
    this.isFiltered = true;
    if(idProjet) this.historiqueProjet = this.historiqueProjet.filter(resp => resp.projet.idProjet == idProjet);
    else this.historiqueProjet = this.historiqueProjet.filter(resp => resp.historique.includes("backlog"));
    // console.log(this.historiqueProjet);
  }

  afficherFonctionnalite(idProjet:number | null) {
    this.isFiltered = true;
    if(idProjet) this.historiqueProjet = this.historiqueProjet.filter(resp => resp.projet.idProjet == idProjet);
    else this.historiqueProjet = this.historiqueProjet.filter(resp => resp.historique.includes("fonctionnalite"));
    // console.log(this.historiqueProjet);
  }

  afficherTache(idProjet:number | null) {
    this.isFiltered = true;
    if(idProjet) this.historiqueProjet = this.historiqueProjet.filter(resp => resp.projet.idProjet == idProjet);
    else this.historiqueProjet = this.historiqueProjet.filter(resp => resp.historique.includes("tache"));
    // console.log(this.historiqueProjet);
  }

  afficherFichier(idProjet:number | null) {
    this.isFiltered = true;
    if(idProjet) this.historiqueProjet = this.historiqueProjet.filter(resp => resp.projet.idProjet == idProjet);
    else this.historiqueProjet = this.historiqueProjet.filter(resp => resp.historique.includes("ajouté pièce jointe"));
    // console.log(this.historiqueProjet);
  }

  avecFichier() {
    this.isFiltered = true;
    this.commentairesProjet = this.commentairesProjet.filter(resp => resp.file == true);
    // console.log(this.historiqueProjet);
  }

  sansFichier() {
    this.isFiltered = true;
    this.commentairesProjet = this.commentairesProjet.filter(resp => resp.file == false);
    // console.log(this.historiqueProjet);
  }

  deleteFilter() {
    this.isFiltered = false;
    this.getHistoriqueProjet();
  }

  deleteFilterFile(){
    this.getFichiersCommentaires(this.route.snapshot.params['id']);
    this.getCommentaireProjet(this.route.snapshot.params['id']);
    this.isFiltered = false;
  }

  getHistoriqueProjet() {
    this.getPdp();
    this.historiqueService.getHistoriqueByIdProjet(this.projet.idProjet).subscribe( data => {
      this.historiqueProjet = data;
      this.historiqueProjet.sort((a, b) => new Date(a.dateCreation).getTime() - new Date(b.dateCreation).getTime());
      for(let historique of data) {
        const date = new Date(historique.dateCreation);
        historique.dateCreation = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        for(let image of this.photos) {
          if(historique.idCreateur && historique.idCreateur.id == image.user.id) { historique.idCreateur.photo = image.nom; }
        }
      }
    });
  }

  getUsersByRole(role:string) {
    if(this.photos) {
      this.userService.getUsersByRole(role).subscribe( data =>{
        this.usersWithRole = data;
        this.getPdp();
        for(let user of data) {
          for(let image of this.photos) {
            if(user.id == image.user.id) { user.photo = image.nom; }
            // else user.photo = 'imageDefaultjpg.jpg';
          }
        }
      },
      error => console.log(error));
    }
  }

  getResponsableFiltered() {
    this.responsableFiltered = this.responsablesToAssign;
    this.responsableFiltered = this.responsablesToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  getScrumMasterFiltered() {
    this.scrumMasterFiltered = this.scrumMasterToAssign;
    this.scrumMasterFiltered = this.scrumMasterToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  getProductOwnerFiltered() {
    this.productOwnerFiltered = this.productOwnerToAssign;
    this.productOwnerFiltered = this.productOwnerToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
  }

  getDevellopersFiltered() {
    this.devellopersFiltered = this.devellopersToAssign;
    this.devellopersFiltered = this.devellopersToAssign.filter( resp => resp.username.startsWith(this.nomRecherche));
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

  assignResponsable(user:User) {
    this.newResponsable = new ResponsableProjet();
    if(!user.isResponsable) {
      user.isResponsable = true;
      this.newResponsable.idResponsable = user;
      this.newResponsable.projet = new Projet();
      this.newResponsable.projet.idProjet = this.projet.idProjet;
      this.newResponsable.projet.nom = this.projet.nom;
      this.responsableService.create(this.newResponsable,this.login.getId()).subscribe( data => {
        this.getResponsablesProjet(this.projet.idProjet);
        this.sendMessage(user.id);
        this.getResponsablesToAssign();
      });
    } else {
      user.isResponsable = false;
      const responsable:ResponsableProjet[] = this.responsablesProjet.filter(resp => resp.idResponsable && resp.idResponsable.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getResponsablesToAssign();
        this.getResponsablesProjet(this.projet.idProjet);
      });
    }
  }

  assignScrumMaster(user:User) {
    this.newResponsable = new ResponsableProjet();
    if(!user.isResponsable) {
      user.isResponsable = true;
      this.newResponsable.idScrumMaster = user;
      this.newResponsable.projet = new Projet();
      this.newResponsable.projet.idProjet = this.projet.idProjet;
      this.newResponsable.projet.nom = this.projet.nom;
      this.responsableService.create(this.newResponsable,this.login.getId()).subscribe( data => {
        this.getResponsablesProjet(this.projet.idProjet);
        this.sendMessage(user.id);
        this.getScrumMasterToAssign();
      });
    } else {
      user.isResponsable = false;
      const responsable:ResponsableProjet[] = this.responsablesProjet.filter(resp => resp.idScrumMaster && resp.idScrumMaster.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getScrumMasterToAssign();
        this.getResponsablesProjet(this.projet.idProjet);
      });
    }
  }

  assignProductOwner(user:User) {
    this.newResponsable = new ResponsableProjet();
    if(!user.isResponsable) {
      user.isResponsable = true;
      this.newResponsable.idProductOwner = user;
      this.newResponsable.projet = new Projet();
      this.newResponsable.projet.idProjet = this.projet.idProjet;
      this.newResponsable.projet.nom = this.projet.nom;
      this.responsableService.create(this.newResponsable,this.login.getId()).subscribe( data => {
        this.getResponsablesProjet(this.projet.idProjet);
        this.sendMessage(user.id);
        this.getProductOwnerToAssign();
      });
    } else {
      user.isResponsable = false;
      const responsable:ResponsableProjet[] = this.responsablesProjet.filter(resp => resp.idProductOwner && resp.idProductOwner.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getProductOwnerToAssign();
        this.getResponsablesProjet(this.projet.idProjet);
      });
    }
  }

  assignDevelloper(user:User) {
    this.newResponsable = new ResponsableProjet();
    if(!user.isResponsable) {
      user.isResponsable = true;
      this.newResponsable.idDevellopers = user;
      this.newResponsable.projet = new Projet();
      this.newResponsable.projet.idProjet = this.projet.idProjet;
      this.newResponsable.projet.nom = this.projet.nom;
      this.responsableService.create(this.newResponsable,this.login.getId()).subscribe( data => {
        this.getResponsablesProjet(this.projet.idProjet);
        this.sendMessage(user.id);
        this.getDevellopersToAssign();
      });
    } else {
      user.isResponsable = false;
      const responsable:ResponsableProjet[] = this.responsablesProjet.filter(resp => resp.idDevellopers && resp.idDevellopers.id == user.id);
      this.responsableService.delete(responsable[0].id,this.login.getId()).subscribe( data => {
        this.getProductOwnerToAssign();
        this.getResponsablesProjet(this.projet.idProjet);
      });
    }
  }

  workIn() {
    if(this.sessionStorage.getDataFromSessionStorage('projetWorking') == null) {
      this.sessionStorage.saveDataToSessionStorage('projetWorking',this.route.snapshot.params['id']);
    } else {
      this.sessionStorage.removeDataFromSessionStorage('projetWorking');
      this.sessionStorage.saveDataToSessionStorage('projetWorking',this.route.snapshot.params['id']);
    }
    this.router.navigate(['Backlog2']);
  }

  updateProjet(projetUpdate:Projet) {
    this.projetService.update(projetUpdate.idProjet,projetUpdate,this.login.getId()).subscribe( data => {
      data.idCreateur.photo = this.photos.filter(resp => resp.user.id == data.idCreateur.id)[0].nom;
      this.projet = data;
      this.modalService.dismissAll();
      // console.log(this.projet);
    });
    // this.projetService.getProjetById(idProjet).subscribe( data => {
    //   this.projet = data;
    // });
  }
  
  setDateProjet(projet:Projet) {
    this.projetService.getProjetById(projet.idProjet).subscribe( data => {
      if(this.dateDebut) { 
        data.dateDebut = this.dateDebut;
        const dateDebut = new Date(data.dateDebut);
        this.projet.dateDebut = dateDebut.toLocaleDateString();
      }
      if(this.dateFin) { 
        data.dateFin = this.dateFin;
        const dateFin = new Date(data.dateFin);
        this.projet.dateFin = dateFin.toLocaleDateString();
      }
      this.projetService.update(data.idProjet,data,this.login.getId()).subscribe( data => {
        this.dateDebut = '';this.dateFin = '';
        // console.log(data);
      });
    });
  }

  getResponsablesToAssign() {
    this.userService.usersWithTheirRoles().subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
          // else user.photo = 'imageDefaultjpg.jpg';
        }
      }
      for(let assigned of data) {
        if(this.responsablesProjet.find(resp => resp.idResponsable && resp.idResponsable.id == assigned.id)) {
          assigned.isResponsable = true;
        }
      }
      this.responsablesToAssign = data;
      this.responsableFiltered = this.responsablesToAssign;
    });
  }

  getScrumMasterToAssign() {
    this.userService.getUsersByRole('SCRUM_master').subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
          // else user.photo = 'imageDefaultjpg.jpg';
        }
      }
      for(let assigned of data) {
        if(this.responsablesProjet.find(resp => resp.idScrumMaster && resp.idScrumMaster.id == assigned.id)) {
          assigned.isResponsable = true;
        }
      }
      this.scrumMasterToAssign = data;
      this.scrumMasterFiltered = this.scrumMasterToAssign;
    });
  }

  getProductOwnerToAssign() {
    this.userService.getUsersByRole('Product_owner').subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
          // else user.photo = 'imageDefaultjpg.jpg';
        }
      }
      for(let assigned of data) {
        if(this.responsablesProjet.find(resp => resp.idProductOwner && resp.idProductOwner.id == assigned.id)) {
          assigned.isResponsable = true;
        }
      }
      this.productOwnerToAssign = data;
      this.productOwnerFiltered = this.productOwnerToAssign;
    });
  }

  getDevellopersToAssign() {
    this.userService.getUsersByRole('Développeur').subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {
          if(user.id == image.user.id) { user.photo = image.nom; }
          // else user.photo = 'imageDefaultjpg.jpg';
        }
      }
      for(let assigned of data) {
        if(this.responsablesProjet.find(resp => resp.idDevellopers && resp.idDevellopers.id == assigned.id)) {
          assigned.isResponsable = true;
        }
      }
      this.devellopersToAssign = data;
      this.devellopersFiltered = this.devellopersToAssign;
    });
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  open(content:any) {
    this.getResponsablesToAssign();
    this.getScrumMasterToAssign();
    this.getProductOwnerToAssign();
    this.getDevellopersToAssign();
    this.projetService.getProjetById(this.projet.idProjet).subscribe( data => {
      if(data.dateDebut) data.dateDebut = formatDate(data.dateDebut, 'yyyy-MM-dd', 'en-US');
      if(data.dateFin) data.dateFin = formatDate(data.dateFin, 'yyyy-MM-dd', 'en-US');
      if(data.dateTermine) data.dateFin = formatDate(data.dateTermine, 'yyyy-MM-dd', 'en-US');
      data.idCreateur.photo = this.photos.filter(resp => resp.user.id == data.idCreateur.id)[0].nom;
      this.updatedProjet = data;
    })
    this.modalService.open(content, { size: 'lg', backdrop: 'static' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
    // this.ngAfterViewIniter();
  }
  
  getResponsablesProjet(idProjet:number) {
    this.responsableService.getResponsableProjetByIdProjet(idProjet).subscribe( data => {
      for(let user of data) {
        for(let image of this.photos) {          
          if(user.idResponsable && image.user && user.idResponsable.id == image.user.id) { user.idResponsable.photo = image.nom; }
          if(user.idProductOwner && image.user && user.idProductOwner.id == image.user.id) { user.idProductOwner.photo = image.nom; }
          if(user.idScrumMaster && image.user && user.idScrumMaster.id == image.user.id) { user.idScrumMaster.photo = image.nom; }
          if(user.idDevellopers && image.user && user.idDevellopers.id == image.user.id) { user.idDevellopers.photo = image.nom; }
        }
      }
      this.responsablesProjet = data;
    });
  }
}
