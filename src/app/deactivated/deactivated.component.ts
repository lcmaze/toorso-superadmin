import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-deactivated',
  templateUrl: './deactivated.component.html',
  styleUrls: ['./deactivated.component.scss']
})
export class DeactivatedComponent implements OnInit {

  constructor(private mainData: MainService, private router: Router) { }

  ngOnInit(): void {
    this.getInactive();
  }

  pending: any;
  page: any= 1;
  limit: any = 35;
  getInactive(){
    this.mainData.get(`api/super/deactivated-vendors?page=${this.page}&limit=${this.limit}`).subscribe(data => {
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
          this.getInactive();
        }
        else this.mainData.openToast('Some error occurred!');
      })
    }
  }

  getBgStyle(obj: any){
    if(obj){
      if(obj.membership_type === 'free') return 'bg-success';
      else return 'bg-primary';
    }
  }

}
