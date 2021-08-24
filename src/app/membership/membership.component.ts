import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { DateRangeComponent } from '../components/commons/date-range/date-range.component';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {

  constructor(private mainData: MainService, private fb: FormBuilder) { }

  @ViewChild('dateRange') dateRange: DateRangeComponent;

  vendor: any;
  membershipContractPeriod: any = {};
  selectedMainCategory: any;

  ngOnInit(): void {
    this.membership_date_range = this.fb.group({
      start: [null],
      end: [null]
    })
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
    this.getCategory();
    if(this.mainData.vendorDetails && this.mainData.vendorId){
      this.selectVendor(this.mainData.vendorDetails);
    }
    else if(this.mainData.selectedMembership){
      this.selectVendor(this.mainData.selectedMembership);
    }
  }

  categories: any;
  getCategory(){
    this.mainData.get(`api/get-categories?m_id=${this.selectedMainCategory.m_category_id}`).subscribe(data => {
      this.categories = data;
    })
  }

  membership: any = {};
  membership_date_range: FormGroup;
  displayval : boolean = true;
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
        // sub categories 
        if(data && data['sub_categories']) {
          this.sub_categories = data['sub_categories'].split(',');
          this.sub_categories.forEach(category => {
            this.categories.forEach((m_category, i) => {
              if(m_category.category_name === category) this.categories[i]['checked'] = true;
            })
          })
        }

        this.membershipDate = {start:data['contract_start_date'], end: data['contract_end_date']};
        this.membership_date_range.patchValue({
          start: new Date(this.membershipDate.start),
          end: new Date(this.membershipDate.end)
        })
        this.category = data['category_id'];
        this.membershipContractPeriod['start'] = this.membership.contract_start_date;
        this.membershipContractPeriod['end'] = this.membership.contract_end_date;
      }
      else{
        this.membership = {};
      }
    })
  }

  selectSubCategory(ev: any) {
    if(ev.target.checked){
      this.sub_categories.push(ev.target.value);
    }
    else{
      this.sub_categories.splice(this.sub_categories.indexOf(ev.target.value), 1);
    }
    // console.log(this.sub_categories);
  }

  selectedDate(){
    if(this.membership_date_range.value.start && this.membership_date_range.value.end){
      this.membershipDate = {start: this.membership_date_range.value.start, end: this.membership_date_range.value.end};
    }
  }

  // membership 
  membershipDate: any;
  category: any;
  subCategories: any;
  sub_categories: any = [];
  membershipDetails(form: NgForm){
    if(form.valid && this.mainData.vendorId){
      // console.log(form.value);
      // console.log(form.value, this.category, new Date(this.membershipDate.start), new Date(this.membershipDate.end), this.sub_categories);
      if(this.membershipDate.start && this.membershipDate.end){
        form.value['contract_start_date'] = new Date(this.membershipDate.start);
        form.value['contract_end_date'] = new Date(this.membershipDate.end);
      }
      form.value['vendor_id'] = this.mainData.vendorId;
      form.value['category_id'] = this.category;
      // form.value['sub_cat'] = form.value['sub_cat'].toString();
      form.value['sub_cat'] = this.sub_categories.toString();
      if(this.sub_categories) form.value['sub_categories'] = this.sub_categories.toString();
      this.mainData.post(form.value, 'api/membership/update-membership').subscribe(data => {
        if(data) this.mainData.openToast("Updated!");
        else this.mainData.openToast("Some error occurred!")
      })
    }
  }

}
