import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fichier } from 'src/app/models/fichier';
import { Projet } from 'src/app/models/projet';
import { FichierService } from 'src/app/services/fichier.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent {

  @ViewChild('myModal',{ static:true }) myModalRef: ElementRef;
  idProjet:number;
  projetInWork:Projet;
  allProjects:Projet[];
  page:number = 1;
  totalLength:any;
  photos:Fichier[];

  constructor(private sessionStorage:LocalStorageService,private projetService:ProjetService,private modalService:NgbModal,private router:Router,
    private fichierService:FichierService,private login:LoginService) {}

  ngOnInit(): void {
    if(this.login.getIsLogged() == false) {
      this.router.navigate(['/Acceuil']);
    } else {
      this.checkSession();
    }
  }

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
        this.fichierService.getUsersPhoto().subscribe( data => {
          this.photos = data;
        });
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
    });
  }

}
