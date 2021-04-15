import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private mainData:MainService) { }

  ngOnInit(): void {
    this.getFeatures();
  }

  facilities: any;
  transportations: any;
  foods: any;
  categories: any;
  getFeatures(){
    this.mainData.get('api/get-facilities').subscribe(facilities => {
      this.facilities = facilities;
      this.mainData.get('api/get-transportations').subscribe(transportations => {
        this.transportations = transportations;
        this.mainData.get('api/get-foods').subscribe(foods => {
          this.foods = foods;
          this.mainData.get('api/get-categories').subscribe(category => {
            this.categories = category;
          })
        })
      })
    })
  }

  // category 
  addCategory(form: NgForm, link: string){
    if(form.valid){
      this.mainData.post(form.value, `api/${link}`).subscribe(data => {
        if(data) {
          this.mainData.openToast('Updated');
          this.getFeatures();
          form.reset();
        }
        else this.mainData.openToast('Some error happened!');
      })
    } else this.mainData.openToast('Form not valid!');
  }
  deleteCategory(id: any, link: string){
    let r = confirm("Sure to delete?")
    if(r){
      this.mainData.delete(`api/${link}?id=${id}`).subscribe(data => {
        if(data) {
          this.mainData.openToast('Deleted');
          this.getFeatures();
        }
        else this.mainData.openToast('Some error happened!');
      })
    }
  }

}
