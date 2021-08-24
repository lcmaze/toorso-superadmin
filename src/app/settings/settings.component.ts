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

  selectedMainCategory: any;
  ngOnInit(): void {
    this.getFeatures();
    this.getMainFeatures();
    if(localStorage.getItem('main_category')){
      this.selectedMainCategory = JSON.parse(localStorage.getItem('main_category'));
      this.mainData.selectedMainCategory.next(this.selectedMainCategory);
      // console.log(this.selectedMainCategory);
    }
    else{
      this.selectedMainCategory = {m_category_id: 2, m_category_name: "Hotels, Resorts & Homestays"};
      localStorage.setItem('main_category', JSON.stringify({m_category_id: 2, m_category_name: "Hotels, Resorts & Homestays"}));
      this.mainData.selectedMainCategory.next(this.selectedMainCategory);
    }
  }

  // get main features
  main_category: any;  
  getMainFeatures() {
    this.mainData.get(`api/get-main-category`).subscribe(data => {
      this.main_category = data;
    })
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
          this.mainData.get(`api/get-categories?m_id=${this.selectedMainCategory.m_category_id}`).subscribe(category => {
            this.categories = category;
          })
        })
      })
    })
  }
 

  // category 
  addCategory(form: NgForm, link: string){
    if(link === 'main_category'){
      let item = this.main_category[Number(form.value.m_category_name)];
      this.selectedMainCategory = item;
      this.mainData.selectedMainCategory.next(item);
      localStorage.setItem('main_category', JSON.stringify(item));
      this.mainData.openToast("Updated category!");
      this.getFeatures();
      return;
    }
    // console.log(form.value, link);
    if(form.valid){
      form.value['m_category_id'] = this.selectedMainCategory['m_category_id'];
      console.log(form.value);
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
