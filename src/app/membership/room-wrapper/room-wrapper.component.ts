import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'room-wrapper',
  templateUrl: './room-wrapper.component.html',
  styleUrls: ['./room-wrapper.component.scss']
})
export class RoomWrapperComponent implements OnInit {

  constructor(private mainData: MainService) { }

  selectVendor(ev: any){
    this.mainData.vendorId = ev.vendor_id;
    this.getBranches();
  }

  ngOnInit(): void {
    if(this.mainData.selectedMembership){
      this.selectVendor(this.mainData.selectedMembership);
    }
  }

  // get branches
  branches: any;
  selectedBranch: any;
  getBranches(){
    this.mainData.get(`api/super/get-branches?id=${this.mainData.vendorId}`).subscribe(data => {
      let branch = data['rows'][Object.keys(data['rows'])[0]];
      if(branch){
        this.branches = data['rows'];
        this.selectedBranch = branch.branch_id;
        this.mainData.selectedBranch = this.selectedBranch;
        this.getProducts();
      }
    })
  }

  products: any;
  showMainBox: boolean = false;
  getProducts(){
    this.products = [];
    this.mainData.get(`api/vendor/get-products?branch_id=${this.selectedBranch}&vendor_id=${this.mainData.vendorId}`).subscribe(data => {
      this.products = data['rows'];
      this.showMainBox = true;
    })
  }

  // change branch 
  changeBranch(branch: any){
    this.mainData.selectedBranch = branch;
    this.getProducts();
  }

  deleteTable(id: any){
    // console.log(id);
    if(id >= 0){
      // console.log(id, this.products[id], this.products);
      if(!this.products[id]) this.products.splice(id, 1);
      else{
        console.log(id);
        let r = confirm("Are you sure to delete the table?");
        if(r){
          let obj = {};
          obj['product_id'] = this.products[id].product_id;
          // obj['price_id'] = this.products[id].prices[0].price_id;
          // obj['addon_id'] = this.products[id].addons[0].addonprice_id;
          this.mainData.delete(`api/vendor/delete-vendor-product?product_id=${this.products[id].product_id}`).subscribe(data => {
            if(data) {
              this.products.splice(id, 1);
              this.mainData.openToast('Deleted Table!');
            }
            else {
              this.mainData.openToast('Some error occurred!');
            }
          })
        }
      }
    }
  }

}
