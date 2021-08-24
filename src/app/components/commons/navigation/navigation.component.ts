import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private mainData: MainService) { }

  view: any = '';
  selectedMainCategory: any;
  ngOnInit() {
    this.mainData.selectedMainCategory.subscribe(data => {
      this.selectedMainCategory = data;
      console.log(this.selectedMainCategory);
    })
  }
}
