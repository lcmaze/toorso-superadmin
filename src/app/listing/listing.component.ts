import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  constructor(private mainData: MainService, private router: Router) { }

  ngOnInit(): void {
    this.getDetails();
  }

  listing: any;
  page: any = 1;
  limit: any = 25;
  totalPending: any;
  name: any = '';
  getDetails(){
    this.mainData.get(`api/super/get-vendors-list?page=${this.page}&limit=${this.limit}${this.name}`).subscribe(data => {
      if(data){
        this.totalPending = data['count'];
        this.listing = data['rows'];
      }
    })
  }

  loadMore(ev:any){
    // console.log(ev);
    this.page = ev.pageIndex + 1;
    this.limit = ev.pageSize;
    this.mainData.get(`api/super/get-vendors-list?page=${this.page}&limit=${this.limit}${this.name}`).subscribe(data => {
      this.listing = data['rows'];
    })
  }

  searchVendor(form: NgForm){
    if(form.valid){
      // console.log(form.value);
      this.name = `&name=${form.value.search_val}`;
      this.getDetails();
    }
  }

  getBgStyle(obj: any){
    if(obj){
      if(obj.membership_type === 'free') return 'bg-success';
      else return 'bg-primary';
    }
  }
  
  formatDate(obj: any){
    if(obj){
      let date = new Date(obj);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }
  }

  // selectMembership(vendor: any){
  //   this.router.navigateByUrl('/membership');
  // }
  
  editVendor(vendor: any){
    this.mainData.selectedMembership = vendor;
    this.mainData.vendorDetails = vendor;
    this.mainData.vendorId = vendor.vendor_id;
    this.router.navigateByUrl('/membership');
  }

  deleteVendor(vendor: any){
    let r = confirm('Are you sure to delete?');
    if(r){
      this.mainData.delete(`api/super/delete-vendor?id=${vendor.vendor_id}`).subscribe(data => {
        if(data) {
          this.mainData.openToast('Deleted!');
          this.getDetails();
        }
        else this.mainData.openToast('Some error occurred!');
      })
    }
  }

}
