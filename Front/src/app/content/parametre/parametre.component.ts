import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chart, registerables } from 'chart.js';
import { Projet } from 'src/app/models/projet';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit  {
  
  isCollapsed = false;
  okay = true;
  projet:Projet;
  isLogged:boolean;
  
  @ViewChild('myChart', { static: true }) chartElement!: ElementRef;

  constructor(private modalService:NgbModal,private loginService:LoginService,private projetService:ProjetService,private route:ActivatedRoute,private sessionStorage:LocalStorageService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.isLogged = this.loginService.getIsLogged();
    this.projetService.getProjetById(this.sessionStorage.getDataFromSessionStorage('projetWorking')).subscribe( data => {
      this.projet = data;
      this.showChart()
      
    });
  }

  showChart(): void {
    console.log(this.chartElement);
    // if (this.okay && this.chartElement && this.chartElement.nativeElement) {
      console.log(this.chartElement);
      console.log(this.isLogged);
      const canvas = this.chartElement.nativeElement;
      // const canvas = this.chartElement.nativeElement.getContext('2d');
      const chartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      };
      const pieChart = new Chart(canvas, {
        type: 'pie',
        data: chartData,
        options: {}
      });
    // }
  }

  open(content: any) {
		// this.modalService.open(content, { size: 'lg', backdrop: 'static' });
    // this.okay = true,
    this.showChart();
	}
}
