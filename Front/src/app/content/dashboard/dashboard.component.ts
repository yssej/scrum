import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  projets: Projet[];

  constructor(private projetService: ProjetService) {}

  ngOnInit() {
    this.projetService.list().subscribe( data => {
      this.projets = data;
    },
    err => console.log(err));
  }
}
