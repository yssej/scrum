import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { navbarData } from './nav-data';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification';
import { FichierService } from 'src/app/services/fichier.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Fonctionnalite } from 'src/app/models/fonctionnalite';
import { Tache } from 'src/app/models/tache';
import { Backlog } from 'src/app/models/backlog';
import { Projet } from 'src/app/models/projet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetService } from 'src/app/services/projet.service';
import { Fichier } from 'src/app/models/fichier';
import { FonctionnaliteService } from 'src/app/services/fonctionnalite.service';
import { BacklogService } from 'src/app/services/backlog.service';
import { Chart, registerables } from 'chart.js';
import * as html2pdf from 'html2pdf.js';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() isLogged: boolean;
  @Input() isAdmin: boolean;
  @Input() username: String;
  @Input() role: string;
  page:number = 1;
  totalLength:any;
  id:string;
  notifications:Notification[];
  actualUser:User;
  isAdmini:boolean;
  isProductOwner:boolean;
  isScrumMaster:boolean;
  isDevelloper:boolean;
  photo:Fichier[];
  fonctionnalitesBacklog:Fonctionnalite[];
  backlogsProjet:Backlog[];
  projetSelected:Projet;
  private serverUrl = 'http://localhost:8081/socket'
  title = 'WebSockets chat';
  private stompClient;

  navData = navbarData;

  constructor(private loginService:LoginService , private router: Router,private sessionStorage:LocalStorageService,private notifService:NotificationService,
    private userService:UserService,private modalService:NgbModal,private projetService:ProjetService,private fichierService:FichierService,
    private backlogService:BacklogService,private fonctionnaliteService:FonctionnaliteService,private route: ActivatedRoute) { 
      Chart.register(...registerables);
      this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
    this.getUserId();
    if(this.loginService.getIsLogged()) {
      this.getUserNotification();
      this.getActualUser();
      this.getPdp();
    }
    this.route.queryParams.subscribe(params => {
      if (this.areParametersChanged(params)) {
        console.log('Parameters have changed');
      }
    });
  }

  areParametersChanged(newParams: any): boolean {
    const currentParams = this.route.snapshot.queryParams;
    
    return Object.keys(newParams).length !== Object.keys(currentParams).length ||
      Object.keys(newParams).some(key => newParams[key] !== currentParams[key]);
  }

  getUserId() {
    this.id = this.loginService.getId();
  }

  getActualUser() {
    this.userService.userWithRole(this.loginService.getId()).subscribe( user => {
      console.log('userService');
      this.actualUser = user;
      this.isAdministrateur();
      this.isAdministrateur();
      this.isProductOnwer();
      this.isSM();
      this.isDev();
    });
  }

  login(): void {
    this.loginService.login();
  }

  logout(): void {
    this.sessionStorage.removeDataFromSessionStorage("projetWorking");
    this.loginService.logout();
  }

  voirProfil(id:String) {
    this.router.navigate(['Profile',id]);
  }

  temps(time:number):number {
    let ans:number = 0;
    const startDateTime = new Date(time);
    const endDateTime = new Date();

    const diffInMs = endDateTime.getTime() - startDateTime.getTime();

    if (diffInMs < 60 * 60 * 1000) {
      ans = Math.round(diffInMs / 1000 / 60);
    } else if (diffInMs < 24 * 60 * 60 * 1000) { 
      ans = Math.round(diffInMs / 1000 / 60 / 60);
    } else { 
      ans = Math.floor(diffInMs / 1000 / 60 / 60 / 24);
    }
    return ans;
  }

  unite(time:number):string {
    let ans:string = '';
    const startDateTime = new Date(time);
    const endDateTime = new Date();

    const diffInMs = endDateTime.getTime() - startDateTime.getTime();
    if (diffInMs < 60 * 60 * 1000) { 
      ans = ' minute(s).';
    } else if (diffInMs < 24 * 60 * 60 * 1000) { 
      ans = ' heure(s).';
    } else { 
      ans = ' jour(s).';
    }
    return ans;
  }

  getUserNotification() {
    this.notifService.getNotificationByIdDestinataire(this.loginService.getId()).subscribe( notifications => {
      for(let notification of notifications) {
        const startDateTime = new Date(notification.temp);
        const endDateTime = new Date();

        const diffInMs = startDateTime.getTime();

        notification.tempMinute = diffInMs;

        this.fichierService.getFichierByUserId(notification.expediteur.id).subscribe( photo => {
          if(photo) notification.expediteur.photo = photo.nom;
        });

      }
      this.notifications = notifications;
      console.log(this.notifications);
    });
  }

  getNewNotification():number {
    let newNotifs:number = 0;
    if(this.notifications) {
      for(let notification of this.notifications) {
        if(notification.new == true) newNotifs++;
      }
    }
    return newNotifs;
  }

  clickNotif() {
    if(this.notifications) {
      for(let notification of this.notifications) {
        notification.new = false
      }
    }
    this.notifService.readNotifications(this.loginService.getId()).subscribe( notifications => {
      console.log(notifications);
    });
  }

  isUserLogged() {
    !this.loginService.getIsLogged();
  }

  isAdministrateur():boolean {
    if(this.actualUser.realmRoles.includes('Administrateur')) this.isAdmini = true;
    return this.isAdmini;
  }

  isProductOnwer():boolean {
    if(this.actualUser.realmRoles.includes('Product_owner')) this.isProductOwner = true;
    return this.isProductOwner;
  }

  isSM():boolean {
    if(this.actualUser.realmRoles.includes('SCRUM_master')) this.isScrumMaster = true;
    return this.isScrumMaster;
  }

  isDev():boolean {
    if(this.actualUser.realmRoles.includes('Développeur')) this.isDevelloper = true;
    return this.isDevelloper;
  }

  open(content:any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static' });
  }

  getPdp() {
    this.userService.userWithRole(this.loginService.getId()).subscribe( user => {
      this.actualUser = user;
      this.fichierService.getUsersPhoto().subscribe( data => {
        this.photo = data;
        for(let pic of this.photo) {
          if(pic.user && this.loginService.getIsLogged() && pic.user.id == this.loginService.getId()) {
            this.actualUser.photo = pic.nom;
            console.log(this.actualUser);
            break;
          }
        }
      },
      err => console.log(err));
    });
  }

  getProjet(projet:Projet,content:any) {
    this.open(content);
    this.projetService.getProjetById(projet.idProjet).subscribe(data => {
      this.projetSelected = data;
      const date = new Date(data.dateCreation);
      this.projetSelected.dateCreation = date.toLocaleDateString() + " " + date.toLocaleTimeString();
      if(this.photo) {       
        for(let image of this.photo) {
          if(data.idCreateur && data.idCreateur.id == image.user.id) this.projetSelected.idCreateur.photo = image.nom;
          if(data.idResponsable && data.idResponsable.id == image.user.id) this.projetSelected.idResponsable.photo = image.nom;
        }
      }
      this.showChart(projet.idProjet);
    });
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

  openNotification(notification:Notification,content?:any) {
    console.log(notification);
    if(notification.tache) this.openTache(notification.tache);
    else if(notification.fonctionnalite) this.openFonctionnalite(notification.fonctionnalite);
    else if(notification.backlog) this.openBacklog(notification.backlog);
    else if(notification.projet) this.openProjet(notification.projet,content);
    else if(notification.commentaire) {
      if(notification.commentaire.projet) this.openProjet(notification.commentaire.projet,content);
      else if(notification.commentaire.backlog) this.openBacklog(notification.commentaire.backlog);
      else if(notification.commentaire.fonctionnalite) this.openFonctionnalite(notification.commentaire.fonctionnalite);
      else if(notification.commentaire.tache) this.openTache(notification.commentaire.tache);
    }
  }

  openProjet(projet:Projet,content:any) {
    this.getProjet(projet,content);
  }

  openBacklog(backlog:Backlog) {
    if(this.router.url == '/Backlog2?backlog=${backlog.id}&projet=${backlog.projet.idProjet}') {
      const url = '/Backlog2?backlog=${backlog.id}&projet=${backlog.projet.idProjet}';
      this.router.navigateByUrl(url);
    }
    else this.router.navigate(['/Backlog2'], { queryParams: { backlog: backlog.id ,projet: backlog.projet.idProjet } });
  }

  openFonctionnalite(fonctionnalite:Fonctionnalite) {
    this.router.navigate(['/Backlog2'], { queryParams: { fonctionnalite: fonctionnalite.id, projet: fonctionnalite.backlog.projet.idProjet } });
  }

  openTache(tache:Tache) {
    this.router.navigate(['/Backlog2'], { queryParams: { tache: tache.idTache, projet: tache.fonctionnalite.backlog.projet.idProjet } });
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

  exportToPDF() {
    const element = document.getElementById('project-profile');
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: this.projetSelected.nom+'.pdf',
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

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (messageons) => {
        if(messageons.body == that.loginService.getId()) {
          // $(".chat").append("<div class='message'>"+messageons.body+"</div>")
          that.getUserNotification();
        }
      });
    });
  }
}
