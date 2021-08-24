import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})

export class FeaturesComponent implements OnInit {

  constructor(private mainData: MainService) { }

  ngOnInit() {
    // this.getBranches();
    if(this.mainData.selectedMembership){
      this.selectVendor(this.mainData.selectedMembership);
    }
  }

  vendor: any;
  selectVendor(ev: any){
    this.vendor = ev;
    this.branches = null;
    this.selectedBranch = null;
    this.foods = this.transportations = this.facilities = null;
    this.mainData.vendorId = ev.vendor_id;
    this.getBranches();
  }

  // get branches
  branches: any;
  selectedBranch: any;
  getBranches(){
    this.mainData.get(`api/super/get-branches?id=${this.mainData.vendorId}`).subscribe(data => {
      let branch = data['rows'][Object.keys(data['rows'])[0]]
      if(branch){
        this.branches = data['rows'];
        this.selectedBranch = branch.branch_id;
        this.mainData.selectedBranch = this.selectedBranch;
        this.getFoods();
        this.getTransportations();
        this.getFacilities();
      }
    })
  }
  // change branch 
  changeBranch(branch: any){
    this.mainData.selectedBranch = branch;
    this.getFoods();
    this.getTransportations();
    this.getFacilities();
  }

  facilities: any;
  getFacilities(){
    this.mainData.get(`api/super/get-facilities?branch_id=${this.selectedBranch}`).subscribe(data => {
      this.facilities = data['rows'];
      for (let i = 0; i < this.facilities.length; i++) {
        this.facilities[i]['checked'] = false;
        if(this.facilities[i].branch_facility && this.facilities[i].branch_facility.branch_facility_id) {
          this.facilities[i]['checked'] = this.facilities[i].branch_facility.is_active;
        }
        if(!this.facilities[i].branch_facility) {
          this.facilities[i].branch_facility = {}; 
          this.facilities[i].branch_facility['facility_type'] = 'free';
        }
      }
      // console.log(this.facilities);
    })
  }

  transportations: any;
  getTransportations(){
    this.mainData.get(`api/super/get-transportations?branch_id=${this.selectedBranch}`).subscribe(data => {
      this.transportations = data['rows'];
      for (let i = 0; i < this.transportations.length; i++) {
        this.transportations[i]['checked'] = false;
        if(this.transportations[i].branch_transportation && this.transportations[i].branch_transportation.branch_transportation_id) {
          this.transportations[i]['checked'] = this.transportations[i].branch_transportation.is_active;
        }
        if(!this.transportations[i].branch_transportation) {
          this.transportations[i].branch_transportation = {};
          this.transportations[i].branch_transportation['transportation_type'] = 'free';
        }
      }
    })
  }
  foods: any;
  getFoods(){
    this.mainData.get(`api/super/get-foods?branch_id=${this.selectedBranch}`).subscribe(data => {
      this.foods = data['rows'];
      for (let i = 0; i < this.foods.length; i++) {
        this.foods[i]['checked'] = false;
        if(this.foods[i].branch_food && this.foods[i].branch_food.branch_food_id) {
          this.foods[i]['checked'] = this.foods[i].branch_food.is_active;
        }
        if(!this.foods[i].branch_food) {
          this.foods[i].branch_food = {};
          this.foods[i].branch_food['food_type'] = 'free';
        }
      }
    })
  }

  // submit details 
  submitFacilities(form: NgForm){
    if(form.valid){
      this.facilities[0]['branch_id'] = this.mainData.selectedBranch;
      this.facilities[0]['vendor_id'] = this.mainData.vendorId;
      // console.log(this.facilities);
      this.mainData.post(this.facilities, 'api/super/update-branch-facility').subscribe(data => {
        if(data){
          this.mainData.openToast('Updated!');
          this.getFacilities();
        }
        else{
          this.mainData.openToast('Some error occurred!');
        }
      })
    }
  }
  submitTransportation(form: NgForm){
    if(form.valid){
      this.transportations[0]['branch_id'] = this.mainData.selectedBranch;
      this.transportations[0]['vendor_id'] = this.mainData.vendorId;
      // console.log(this.transportations);
      this.mainData.post(this.transportations, 'api/super/update-branch-transportation').subscribe(data => {
        if(data){
          this.mainData.openToast('Updated!');
          this.getTransportations();
        }
        else{
          this.mainData.openToast('Some error occurred!');
        }
      })
    }
  }
  submitFood(form: NgForm){
    if(form.valid){
      this.foods[0]['branch_id'] = this.mainData.selectedBranch;
      this.foods[0]['vendor_id'] = this.mainData.vendorId;
      // console.log(this.foods);
      this.mainData.post(this.foods, 'api/super/update-branch-food').subscribe(data => {
        if(data){
          this.mainData.openToast('Updated!');
          this.getFoods();
        }
        else{
          this.mainData.openToast('Some error occurred!');
        }
      })
    }
  }

}
