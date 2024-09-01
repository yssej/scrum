import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './content/acceuil/acceuil.component';
import { ParametreComponent } from './content/parametre/parametre.component';
import { Backlog2Component } from './content/projet/backlog2/backlog2.component';
import { Gantt3Component } from './content/projet/gantt/gantt.component';
import { GestionComponent } from './content/projet/gestion/gestion.component';
import { ProjetProfileComponent } from './content/projet/projet-profile/projet-profile.component';
import { ProjetComponent } from './content/projet/projet/projet.component';
import { RecapSprintComponent } from './content/projet/recap-sprint/recap-sprint.component';
import { TableauComponent } from './content/projet/tableau/tableau.component';
import { EmailActivationComponent } from './content/utilisateur/email-activation/email-activation.component';
import { InscriptionComponent } from './content/utilisateur/inscription/inscription.component';
import { ListUtilisateursComponent } from './content/utilisateur/list-utilisateurs/list-utilisateurs.component';
import { ProfileComponent } from './content/utilisateur/profile/profile.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { NotFoundComponent } from './content/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent} ,
  { path: 'Acceuil', component: AcceuilComponent} ,
  { path: 'Projet', component: ProjetComponent} ,
  { path: 'ListUtilisateurs', component: ListUtilisateursComponent} ,
  { path: 'Inscription', component: InscriptionComponent} ,
  { path: 'Parametres', component: ParametreComponent} ,
  { path: 'ProjetGestion', component: GestionComponent} ,
  { path: 'Profile', component: ProfileComponent} ,
  { path: 'EmailActivation/:id/:token', component: EmailActivationComponent} ,
  { path: 'ProjetProfile/:id', component: ProjetProfileComponent} ,
  { path: 'Gantt', component: Gantt3Component} ,
  { path: 'Backlog2', component: Backlog2Component} ,
  { path: 'Backlog2/:backlog/:projet', component: Backlog2Component} ,
  { path: 'Backlog2/:fonctionnalite/:projet', component: Backlog2Component} ,
  { path: 'Backlog2/:tache/:projet', component: Backlog2Component} ,
  { path: 'Tableau', component: TableauComponent} ,
  { path: 'RecapSprint', component: RecapSprintComponent} ,
  { path: 'Dashboard', component: DashboardComponent} ,
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
