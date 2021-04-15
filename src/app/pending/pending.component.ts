import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  constructor(private mainData: MainService, private router: Router) { }

  ngOnInit(): void {
    this.getPending();
  }

  pending: any;
  page: any= 1;
  limit: any = 35;
  getPending(){
    this.mainData.get(`api/super/pending-vendors?page=${this.page}&limit=${this.limit}`).subscribe(data => {
      this.pending = data;
    })
  }

  selectMembership(vendor: any){
    this.mainData.selectedMembership = vendor;
    this.router.navigateByUrl('/membership');
  }

  deleteVendor(vendor: any){
    let r = confirm('Are you sure to delete?');
    if(r){
      this.mainData.delete(`api/super/delete-approval?id=${vendor.vendor_id}`).subscribe(data => {
        if(data) {
          this.mainData.openToast('Deleted!');
          this.getPending();
        }
        else this.mainData.openToast('Some error occurred!');
      })
    }
  }

}
