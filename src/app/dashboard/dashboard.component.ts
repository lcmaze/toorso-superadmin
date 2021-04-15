import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private mainData: MainService) { }

  ngOnInit() {
    this.getCounts();
  }

  details: any;
  getCounts(){
    this.mainData.get(`api/super/get-counts`).subscribe(data => {
      this.details = data;
      console.log(this.details)
    })
  }

}
