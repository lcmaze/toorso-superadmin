import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'city-filter',
  templateUrl: './city-filter.component.html',
  styleUrls: ['./city-filter.component.scss']
})
export class CityFilterComponent implements OnInit {

  @Output('city') city: any = new EventEmitter();

  constructor(private mainData: MainService) { }

  ngOnInit(): void {
  }

  options: any;

  search(ev: any){
    if(ev.target.value.length > 2){
      // console.log(ev.target.value);
      this.mainData.get(`api/search-cities?name=${ev.target.value}`).subscribe(data => {
        this.options = data;
      })
    }
  }

  displayFn(city: any): string {
    return city && city.city_name ? city.city_name : '';
  }

  selectCity(city: any){
    this.city.emit(city);
  }

}
