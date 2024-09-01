import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { AcceuilComponent } from './content/acceuil/acceuil.component';
import { ContentComponent } from './interface/content/content.component';
import { NavbarComponent } from './interface/navbar/navbar.component';
import { SidebarComponent } from './interface/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjetComponent } from './content/projet/projet/projet.component';
import { ListUtilisateursComponent } from './content/utilisateur/list-utilisateurs/list-utilisateurs.component';
import { InscriptionComponent } from './content/utilisateur/inscription/inscription.component';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { ParametreComponent } from './content/parametre/parametre.component';
import { GestionComponent } from './content/projet/gestion/gestion.component';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './content/utilisateur/profile/profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmailActivationComponent } from './content/utilisateur/email-activation/email-activation.component';
import { KeycloakService } from 'keycloak-angular';
import { ProjetProfileComponent } from './content/projet/projet-profile/projet-profile.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Gantt3Component } from './content/projet/gantt/gantt.component';
import { TableauComponent } from './content/projet/tableau/tableau.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Backlog2Component } from './content/projet/backlog2/backlog2.component';
import { GanttModule, ResizeService, SortService, FilterService, SelectionService, ReorderService,
  EditService, DayMarkersService, ToolbarService } from '@syncfusion/ej2-angular-gantt';
import { RecapSprintComponent } from './content/projet/recap-sprint/recap-sprint.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { NotFoundComponent } from './content/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    ContentComponent,
    NavbarComponent,
    SidebarComponent,
    ProjetComponent,
    ListUtilisateursComponent,
    InscriptionComponent,
    ParametreComponent,
    GestionComponent,
    ProfileComponent,
    EmailActivationComponent,
    ProjetProfileComponent,
    Gantt3Component,
    TableauComponent,
    Backlog2Component,
    RecapSprintComponent,
    DashboardComponent,
    NotFoundComponent,
  ],
  imports: [
    DragDropModule,
    NgxDropzoneModule,
    NgbCollapseModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MdbCollapseModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    GanttModule,
    NgxExtendedPdfViewerModule,
    NgbModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8081/Commentaire',
                      'http://localhost:8081/Etat_projet',
                      'http://localhost:8081/Etat_soustache',
                      'http://localhost:8081/Etat_sprint',
                      'http://localhost:8081/Etat_tache',
                      'http://localhost:8081/Fichier',
                      'http://localhost:8081/Mail',
                      'http://localhost:8081/Notification',
                      'http://localhost:8081/Projet',
                      'http://localhost:8081/Projet_param',
                      'http://localhost:8081/Role',
                      'http://localhost:8081/Soustache',
                      'http://localhost:8081/Soustache_param',
                      'http://localhost:8081/Sprint',
                      'http://localhost:8081/Sprint_param',
                      'http://localhost:8081/Tache',
                      'http://localhost:8081/Tache_param',
                      'http://localhost:8081/User',
                      'http://localhost:8081/ResponsableProjet',
                      'http://localhost:8081/Backlog',
                      'http://localhost:8081/Fonctionnalite',
                      'http://localhost:8081/SprintBacklog'
                    ],
        sendAccessToken: true
      }
  }),
    AppRoutingModule
  ],
  providers: [KeycloakService,ResizeService, SortService, FilterService, SelectionService, ReorderService,
    EditService, DayMarkersService, ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
