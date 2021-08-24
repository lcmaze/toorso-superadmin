import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(private mainData: MainService) { }

  @Input('editable') editable: boolean = false;
  @Input('products') product_val: any = null;
  @Input('prices') prices: any = null;
  @Input('addons') addons: any = null;
  @Input('id') id: any = null;
  @Output('refresh') refreshProducts: any = new EventEmitter();
  @Output('add-new') addNewTable: any = new EventEmitter();
  @Output('delete') deleteTable: any = new EventEmitter();

  bedQty: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  bedType: any = ['Single Bed', 'Double Bed', 'Queen size Bed', 'King size Bed'];
  roomQty: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  roomNumber: any = [];
  roomNumberVal: string;
  roomAmenities: any = [];
  roomAmenitiesVal: string;
  highlitedFeatures: any = [];
  highlitedFeaturesVal: string;
  product: any = {
    product_id: null, room_type: null, subtitle: null, have_ac: false, bed_qty: 1, bed_type: 'Single', room_qty: 1, room_numbers: null, room_amenities: null, highlited_features: null, 
    vendor_id: this.mainData.uid, branch_id: this.mainData.selectedBranch
  };
  product_prices: any = {
    vendor_id: this.mainData.uid, branch_id: this.mainData.selectedBranch, price_one: null, date_range_one_start: null, date_range_one_end: null, text_one: null,
    price_two: null, date_range_two_start: null, date_range_two_end: null, text_two: null, price_three: null, date_range_three_start: null, date_range_three_end: null, text_three: null,
    price_four: null, date_range_four_start: null, date_range_four_end: null, text_four: null,
    price_five: null, date_range_five_start: null, date_range_five_end: null, text_five: null,
  };
  product_addons: any = {
    vendor_id: this.mainData.uid, branch_id: this.mainData.selectedBranch, text_one: null, value_one: null, 
    text_two: null, value_two: null
  }

  ngOnInit() {
    // console.log(this.product, this.product_val);
    this.editable = false;
    if(this.product_val){
      this.product = this.product_val;
      // console.log(this.product);
      if(this.product.room_numbers) this.roomNumber = this.product.room_numbers.split(',');
      if(this.product.room_amenities) this.roomAmenities = this.product.room_amenities.split(',');
      if(this.product.highlited_features) this.highlitedFeatures = this.product.highlited_features.split(',');
      if(this.prices) this.product_prices = this.prices;
      if(this.addons) this.product_addons = this.addons;
      // console.log(this.product_val, this.prices, this.addons);
    }
  }

  style(): object {
    if (this.editable) {
      return {
        opacity: 1,
        pointerEvents: 'unset'
      }
    }
    else {
      return {
        opacity: 0.8,
        pointerEvents: 'none'
      }
    }
  }

  // manage array values (room number, amenities, features)
  addArrayVal(id: any){
    if(this.roomNumberVal && id === 1){
      // console.log(this.product.room_qty,this.roomNumber.length)
      if(this.product.room_qty > this.roomNumber.length){
        this.roomNumber.push(this.roomNumberVal);
        this.roomNumberVal = null;
      } 
      else this.mainData.openToast("Room Quantity not matching!");
    }
    if(this.roomAmenitiesVal && id === 2){
      this.roomAmenities.push(this.roomAmenitiesVal);
      this.roomAmenitiesVal = null;
    }
    if(this.highlitedFeaturesVal && id === 3){
      this.highlitedFeatures.push(this.highlitedFeaturesVal);
      this.highlitedFeaturesVal = null;
    }
  }
  removeArrayVal(id: any, index: any){
    if(id === 1){
      this.roomNumber.splice(index, 1);
    }
    if(id === 2){
      this.roomAmenities.splice(index, 1);
    }
    if(id === 3){
      this.highlitedFeatures.splice(index, 1);
    }
  }

  saveProduct(){
    // console.log(this.product_prices);
    if(this.mainData.selectedBranch && this.mainData.uid){
      this.product.branch_id = this.mainData.selectedBranch;
      this.product_prices.branch_id = this.mainData.selectedBranch;
      this.product_addons.branch_id = this.mainData.selectedBranch;
      let obj = {};
      this.product['room_numbers'] = this.roomNumber.toString();
      this.product['room_amenities'] = this.roomAmenities.toString();
      this.product['highlited_features'] = this.highlitedFeatures.toString();
      obj['product'] = this.product;
      let prices = {};
      prices = {...this.product_prices};
      obj['prices'] = this.parseDateFormat(prices);
      // obj['prices'] = this.parseDateFormat(this.product_prices);
      obj['addons'] = this.product_addons;
      obj['vendor_id'] = this.mainData.vendorId;
      // console.log(obj['prices']);
      // console.log(obj);
      this.mainData.post(obj, 'api/super/add-branch-product').subscribe(data => {
        if(data){
          this.mainData.openToast('Updated Product!');
          if(data['id']) {
            this.product.product_id = data['id'];
            this.refreshProducts.emit(true);
          }
        }
        else{
          this.mainData.openToast('Some error occurred!');
        }
      })
    }
  }

  parseDateFormat(obj: any){
    if(obj['date_range_one_end']) obj['date_range_one_end'] = new Date(obj.date_range_one_end).toLocaleDateString();
    if(obj['date_range_one_start']) obj['date_range_one_start'] = new Date(obj.date_range_one_start).toLocaleDateString();
    if(obj['date_range_three_end']) obj['date_range_three_end'] = new Date(obj.date_range_three_end).toLocaleDateString();
    if(obj['date_range_three_start']) obj['date_range_three_start'] = new Date(obj.date_range_three_start).toLocaleDateString();
    if(obj['date_range_two_end']) obj['date_range_two_end'] = new Date(obj.date_range_two_end).toLocaleDateString();
    if(obj['date_range_two_start']) obj['date_range_two_start'] = new Date(obj.date_range_two_start).toLocaleDateString();
    if(obj['date_range_five_end']) obj['date_range_five_end'] = new Date(obj.date_range_five_end).toLocaleDateString();
    if(obj['date_range_five_start']) obj['date_range_five_start'] = new Date(obj.date_range_five_start).toLocaleDateString();
    if(obj['date_range_four_end']) obj['date_range_four_end'] = new Date(obj.date_range_four_end).toLocaleDateString();
    if(obj['date_range_four_start']) obj['date_range_four_start'] = new Date(obj.date_range_four_start).toLocaleDateString();
    console.log(obj);
    return obj;
  }

  edit(){
    this.editable = true;
  }

  save(){
    this.editable = false;
    this.saveProduct();
  }

  addNew(){
    this.addNewTable.emit(true);
  }

  delete(){
    this.deleteTable.emit(true);
  }


}
