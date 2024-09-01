import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Fichier } from 'src/app/models/fichier';
import { Projet } from 'src/app/models/projet';
import { FichierService } from 'src/app/services/fichier.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProjetService } from 'src/app/services/projet.service';
import { PdfColor} from '@syncfusion/ej2-pdf-export';
// import { projectNewData } from './data';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Sprint } from 'src/app/models/sprint';
import { Backlog } from 'src/app/models/backlog';
import { Fonctionnalite } from 'src/app/models/fonctionnalite';
import { Tache } from 'src/app/models/tache';
import { SprintService } from 'src/app/services/sprint.service';
import { BacklogService } from 'src/app/services/backlog.service';
import { FonctionnaliteService } from 'src/app/services/fonctionnalite.service';
import { TacheService } from 'src/app/services/tache.service';
import { SprintBacklog } from 'src/app/models/sprint-backlog';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class Gantt3Component {

  @ViewChild('myModal',{ static:true }) myModalRef: ElementRef;
  idProjet:number;
  projetInWork:Projet;
  allProjects:Projet[];
  page:number = 1;
  totalLength:any;
  photos:Fichier[];
  isLogged = false;
  user:User;

  sprintsProjet:Fonctionnalite[];
  backlogsProjet:Tache[];
  fonctionnalitesProjet:Fonctionnalite[];
  tachesProjet:Tache[];

  sprintBacklogs:SprintBacklog[];

  projectNewData: Object[] = [];
 
  public eventMarkers: any;
  public taskfield: Object;
  title = 'my-angular-project';
  @ViewChild("ganttObject")
  public ganttObject: GanttComponent | undefined;
  public data: object[] = [];
  public toolbarOptions: string[] = ["PdfExport", "ExcelExport", "CsvExport"];
  public columnSettings: object[] = [
    {field: "id", headerText: "id"},
    {field: "nom", headerText: "nom"},
    {field: "date_debut", headerText: "date_debut"},
    { field: 'date_fin', headerText: "date_fin"}
  ]
  public taskSettings: object = {
    id: 'id',
    name: 'nom',
    startDate: 'date_debut',
    endDate: 'date_fin',
    duration: 'duration',
    child: 'subtasks',
    dependency: 'predecessor'
  }

  constructor(private sessionStorage:LocalStorageService,private projetService:ProjetService,private modalService:NgbModal,private router:Router,
    private fichierService:FichierService,private observer: BreakpointObserver,private login:LoginService,private userService:UserService,
    private sprintService:SprintService,private backlogService:BacklogService,private fonctionnaliteService:FonctionnaliteService,
    private tacheService:TacheService,private sprintBacklogService:SprintService) {}

  ngOnInit(): void {
    if(this.login.getIsLogged()) {
      this.isLogged = true;
      this.userService.userWithRole(this.login.getId()).subscribe( data => {
        this.user = data;
      });
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
      this.fonctionnaliteService.getFonctionnaliteByIdProjet(this.idProjet).subscribe( sprints => {
        for(let i = 0; i < sprints.length; i++) {
          if(sprints[i].dateDebut) {
            sprints[i].dateDebut = new Date(sprints[i].dateDebut).toLocaleDateString();
            const [day, month, year] = sprints[i].dateDebut.split('/');
            sprints[i].dateDebut = `${month}/${day}/${year}`;
          }
          if(sprints[i].dateFin) {
            sprints[i].dateFin = new Date(sprints[i].dateFin).toLocaleDateString();
            const [day, month, year] = sprints[i].dateFin.split('/');
            sprints[i].dateFin = `${month}/${day}/${year}`;
          }
        }
        this.sprintsProjet = sprints;
        console.log(this.sprintsProjet)
      });

      this.tacheService.getTacheByIdProjet(this.idProjet).subscribe( backlogs => {
        this.backlogsProjet = backlogs;
        console.log(this.backlogsProjet)
        // let backlogId:number[] = [];
        // for(let backlog of backlogs) backlogId.push(backlog.idTache)
        this.fonctionnaliteService.list().subscribe( fonctionnalites => {
          // for(let i = 0; i < backlogId.length; i++) {
          //   this.fonctionnalitesProjet = fonctionnalites.filter( resp => resp.backlog && resp.backlog.id == i);
          // }
          // console.log(this.fonctionnalitesProjet);
          // let fonctionnaliteId:number[] = [];
          // for(let fonc of this.fonctionnalitesProjet) fonctionnaliteId.push(fonc.id);
          // this.tacheService.list().subscribe( taches => {
            // for(let i = 0; i < fonctionnaliteId.length; i++) {
            //   this.tachesProjet = taches.filter( resp => resp.fonctionnalite && resp.fonctionnalite.id == i);
            // }
            // console.log(this.tachesProjet);
            this.sprintsProjet.forEach(sprints => {
              if(sprints.dateDebut && sprints.dateFin && sprints.dateDebut <= sprints.dateFin) {
                console.log(sprints)
                const { id, nom, dateDebut, dateFin } = sprints;
                const dure = Math.ceil(Math.abs((new Date(dateDebut).getTime() - new Date(dateFin).getTime()) / (1000 * 3600 * 24)));
                console.log(dure);
                const taskData: {
                  id: number;
                  nom: string;
                  date_debut: Date;
                  date_fin: Date;
                  // duration: number;
                  subtasks: {
                    id: number;
                    nom: string;
                    date_debut: Date;
                    date_fin: Date;
                  }[];
                } = {
                  id: id,
                  nom: nom,
                  date_debut: new Date(dateDebut),
                  date_fin: new Date(dateFin),
                  // duration: dure,
                  subtasks: [],
                };
                console.log(new Date(new Date(dateDebut).setDate(new Date(dateFin).getDate() + dure)))
              
                this.backlogsProjet.forEach(backlogs => {
                  if (backlogs.dateDebut && backlogs.dateFin && backlogs.fonctionnalite.id === id) {
                    const { idTache, nom, dateDebut, dateFin } = backlogs;
                    const backlogData = {
                      id: idTache, nom: nom, date_debut: new Date(new Date(dateDebut).toLocaleString('en-US', {month: '2-digit',day: '2-digit',year: 'numeric'})), date_fin: new Date(new Date(dateFin).toLocaleString('en-US', {month: '2-digit',day: '2-digit',year: 'numeric'}))
                    };
                    taskData.subtasks.push(backlogData);
                  }
                });


                this.projectNewData.push(taskData);
              }             
            });
            
            this.data = this.projectNewData;
            console.log(this.data);
          // });
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

  public toolbarBtnClick(args:any):void{
    if(args.item.text === "Pdf export"){
      (this.ganttObject as GanttComponent).pdfExport({
        fileName: "ProjectData.pdf",
        enableFooter: false,
        showPredecessorLines: false,
        theme: "Fabric",
        ganttStyle: {
          taskbar: {
            taskColor: new PdfColor(240, 128, 128),
            taskBorderColor: new PdfColor(240, 128, 128),
            progressColor: new PdfColor(205, 92, 92)
          }
        }
      });
    } else if(args.item.text === "Excel export"){
      (this.ganttObject as GanttComponent).excelExport({
        fileName: "ProjectData.xlsx",
        theme: {
          header: { fontColor:"#C67878"},
          record: { fontColor:"#C67878"}
        },
        header:{
          headerRows: 1,
          rows: [{
            cells:[{
              colSpan: 4,
              value: "Project Time Tracking Report",
              style: { fontSize:20, hAlign:"Center"}
            }]
          }]
        },
        footer:{
          footerRows: 1,
          rows: [{
            cells:[{
              colSpan: 4,
              value: "Visit Again!!!",
              style: { fontSize:18, hAlign:"Center"}
            }]
          }]
        }
      });
    } else if(args.item.text === "CSV export"){
      (this.ganttObject as GanttComponent).csvExport();
    }
  }

}
