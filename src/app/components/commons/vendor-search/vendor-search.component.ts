import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'vendor-search',
  templateUrl: './vendor-search.component.html',
  styleUrls: ['./vendor-search.component.scss']
})
export class VendorSearchComponent implements OnInit {

  @Output('vendor') vendor: any = new EventEmitter();

  constructor(private mainData: MainService) { }

  ngOnInit(): void {
  }

  options: any;

  search(ev: any){
    if(ev.target.value.length > 2){
      // console.log(ev.target.value);
      this.mainData.get(`api/vendor/search-vendor?name=${ev.target.value}`).subscribe(data => {
        this.options = data;
      })
    }
  }

  displayFn(vendor: any): string {
    return vendor && vendor.vendor_name ? vendor.vendor_name : '';
  }

  selectVendor(vendor: any){
    this.vendor.emit(vendor);
  }

}
