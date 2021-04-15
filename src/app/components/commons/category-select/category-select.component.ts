import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnInit {

  constructor(private mainData: MainService) { }

  @Output('category') cat: any = new EventEmitter();
  @Input('value') categoryValue: any;

  ngOnInit(): void {
    this.getDetails();
  }

  category: any;
  getDetails(){
    this.mainData.get('api/get-categories').subscribe(data => {
      this.category = data;
    })
  }

  selectCategory(ev: any){
    this.cat.emit(ev);
  }

}
