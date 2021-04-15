import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateRangeComponent } from '../components/commons/date-range/date-range.component';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {

  constructor(private mainData: MainService) { }

  @ViewChild('dateRange') dateRange: DateRangeComponent;

  vendor: any;
  membershipContractPeriod: any = {};

  ngOnInit(): void {
    // console.log(this.mainData.vendorDetails);
    if(this.mainData.vendorDetails && this.mainData.vendorId){
      this.selectVendor(this.mainData.vendorDetails);
    }
    else if(this.mainData.selectedMembership){
      this.selectVendor(this.mainData.selectedMembership);
    }
  }

  membership: any = {};
  selectVendor(ev: any){
    this.vendor = ev;
    this.mainData.vendorId = this.vendor.vendor_id;
    this.membership = {};
    this.category = null;
    this.membershipDate = null;
    this.sub_categories = [];
    this.mainData.get(`api/membership/?vendor_id=${this.mainData.vendorId}`).subscribe(data => {
      if(data){
        this.membership = data;
        if(data && data['sub_categories']) this.sub_categories = data['sub_categories'].split(',');
        this.membershipDate = {start:data['contract_start_date'], end: data['contract_end_date']};
        this.category = data['category_id'];
        this.membershipContractPeriod['start'] = this.membership.contract_start_date;
        this.membershipContractPeriod['end'] = this.membership.contract_end_date;
      }
      else{
        this.membership = {};
      }
    })
  }

  // membership 
  membershipDate: any;
  category: any;
  subCategories: any;
  sub_categories: any = [];
  membershipDetails(form: NgForm){
    if(form.valid && this.mainData.vendorId){
      // console.log(form.value, this.category, new Date(this.membershipDate.start), new Date(this.membershipDate.end), this.sub_categories);
      if(this.membershipDate.start && this.membershipDate.end){
        form.value['contract_start_date'] = new Date(this.membershipDate.start);
        form.value['contract_end_date'] = new Date(this.membershipDate.end);
      }
      form.value['vendor_id'] = this.mainData.vendorId;
      form.value['category_id'] = this.category;
      if(this.sub_categories) form.value['sub_categories'] = this.sub_categories.toString();
      this.mainData.post(form.value, 'api/membership/update-membership').subscribe(data => {
        if(data) this.mainData.openToast("Updated!");
        else this.mainData.openToast("Some error occurred!")
      })
    }
  }

}
