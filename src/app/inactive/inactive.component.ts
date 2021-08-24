import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss']
})
export class InactiveComponent implements OnInit {

  constructor(private mainData: MainService, private router: Router) { }

  ngOnInit(): void {
    this.getInactive();
  }

  pending: any;
  page: any= 1;
  limit: any = 25;
  totalPending: any;
  name: any = '';
  getInactive(){
    this.mainData.get(`api/super/inactive-vendors?page=${this.page}&limit=${this.limit}${this.name}`).subscribe(data => {
      this.totalPending = data['count'];
      this.pending = data['rows'];
    })
  }

  loadMore(ev:any){
    // console.log(ev);
    this.page = ev.pageIndex + 1;
    this.limit = ev.pageSize;
    this.mainData.get(`api/super/inactive-vendors?page=${this.page}&limit=${this.limit}${this.name}`).subscribe(data => {
      this.pending = data['rows'];
    })
  }

  searchVendor(form: NgForm){
    if(form.valid){
      // console.log(form.value);
      this.name = `&name=${form.value.search_val}`;
      this.getInactive();
    }
  }

  selectMembership(vendor: any){
    this.mainData.selectedMembership = vendor;
    this.mainData.vendorDetails = vendor;
    this.mainData.vendorId = vendor.vendor_id;
    this.router.navigateByUrl('/membership');
  }

  deleteVendor(vendor: any){
    let r = confirm('Are you sure to delete?');
    if(r){
      this.mainData.delete(`api/super/delete-approval?id=${vendor.vendor_id}`).subscribe(data => {
        if(data) {
          this.mainData.openToast('Deleted!');
          this.getInactive();
        }
        else this.mainData.openToast('Some error occurred!');
      })
    }
  }

}
