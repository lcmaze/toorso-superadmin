import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('country') country: boolean = true;

  constructor(public dialog: MatDialog, private mainData: MainService) { }

  money : string[] =  ['₹ INR', '$ Dollar'];
  locations : any = [
    {name: 'India', flag: 'india.jpg', branch: true, states: ['Kerala', 'Karnataka', 'Tamil Nadu']},
    {name: 'Oman', flag: 'oman.jpg', branch: false, states: null }
  ]
  selectedcurrency :string = this.money[0];
  selectedcountry :any;
  branchvisible : any = true;
  statelist: string[] = this.locations[0].states;
  selectedstate : any;
  selectedflag: string = this.locations[0].flag;

  userDetails: any;
  ngOnInit() {
    this.userDetails = this.mainData.userDetails;
    // console.log(this.userDetails);
    this.getCountries();
  }

  selectCountry(country: any){
    this.mainData.selectedCountry.next(country);
    this.selectedcountry = country;
    this.getStates(country.country_id);
  }

  // countries
  countries: any;
  getCountries(){
    this.mainData.getCache(`api/get-countries`).subscribe(data => {
      this.countries = data;
      this.countries.forEach(country => {
        if(country.country_id === 221) {
          this.selectedcountry = country;
          this.mainData.selectedCountry.next(country);
          this.getStates(country.country_id);
        }
      })
    })
  }

  // states 
  states: any;
  getStates(id: any){
    this.mainData.getCache(`api/get-states?id=${id}`).subscribe(data => {
      this.states = data.rows;
      this.states.forEach(state => {
        if(state.state_id === 4045) {
          this.selectedstate = state;
          this.mainData.selectedState.next(state);
          this.mainData.state = state;
          // console.log(state);
        }
      })
    })
  }

  currencyselect(selectedcurrency :string){
    this.selectedcurrency = selectedcurrency;
  }

  countryselect(selectedcountry :string, branchvisible :string, statelist: any, selectedflag: string){
    this.selectedcountry = selectedcountry;
    this.branchvisible = branchvisible;
    this.statelist = statelist;
    this.selectedflag = selectedflag;
    // console.log(this.selectedflag);
  }

  stateselect(selectedstate : any){
    this.mainData.selectedState.next(selectedstate);
    this.selectedstate = selectedstate;
  }

}
