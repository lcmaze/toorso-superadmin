import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

  constructor(private mainData: MainService, private http: HttpClient) { }
  promotionDate: any = {start: null, end: null};
  cdnUrl: any = environment.cdnLink;
  ngOnInit(): void {
    this.getPromotion();
    this.getProducts();
  }

  promotions: any;
  getPromotion(){
    this.mainData.get(`api/super/get-promotion?id=${this.mainData.vendorId}`).subscribe(data => {
      this.promotions = data['rows'][Object.keys(data['rows'])[0]];
      // console.log(this.promotions);
      if(!this.promotions) {
        this.promotions = { promotion_text: null, banner_color: '#c62828', product_id:  0, vendor_id: null, discount: null, image: 'no-image.png', start_date: null, end_date: null };
      }
      else{
        this.promotionDate['start'] = this.promotions.valid_date_start;
        this.promotionDate['end'] = this.promotions.valid_date_end;
        // console.log(this.promotionDate);
      }
    })
  }

  products: any;
  getProducts(){
    this.mainData.get(`api/vendor/get-all-products`).subscribe(data => {
      this.products = data['rows'];
      // console.log(this.promotions);
    })
  }

  // submit details
  async submitDetails(form: NgForm){
    if(form.valid && form.value['product_id'] != 0 && this.promotionDate.start && this.promotionDate.end){
      await this.onMultipleSubmit().then(()=>{
        console.log('updating..');
        form.value['promotion_id'] = 0;
        form.value['valid_date_start'] = this.promotionDate.start;
        form.value['valid_date_end'] = this.promotionDate.end;
        if(this.promotions.promotion_id) form.value['promotion_id'] = this.promotions.promotion_id;
        form.value['image'] = this.newsImageName;
        form.value['vendor_id'] = this.mainData.vendorDetails.vendor_id;
        if(!this.newsImageName) form.value['image'] = this.promotions.image;
        this.mainData.post(form.value, 'api/super/update-vendor-promotion').subscribe(data => {
          if(data) {
            this.mainData.openToast('Updated Successfully!');
          }
          else{
            this.mainData.openToast('Some error occurred!');
          }
        })
      })
    }
    else{
      this.mainData.openToast("Form not valid!");
    }
  }

  // file upload
  multipleImages: any = [];
  newsImageName: string ;
  logoPreview: any;
  @ViewChild('logo') vendorLogo: ElementRef;
  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
    let filenames = '';
    filenames += this.multipleImages[0].name;
    this.newsImageName = this.multipleImages[0].name;
    let image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.logoPreview = reader.result;
    reader.readAsDataURL(image);
  }

  resetImage(){
    this.vendorLogo.nativeElement.value = "";
    this.logoPreview = null;
  }

  async onMultipleSubmit(){
    await new Promise((resolve, reject) => {
      if(this.multipleImages.length > 0){
        const formData = new FormData();
        let d = new Date();
        this.newsImageName = `vendor_${d.getTime()}_${this.multipleImages[0].name}`
        for(let img of this.multipleImages){
          formData.append('files', img, `vendor_${d.getTime()}_${img.name}`);
        }
        this.http.post<any>(environment.apiUrl + 'api/vendor/upload-vendor-promotion', formData).subscribe(
          (res) => {
            console.log('uploaded');
            resolve(true);
          },
          (err) => {
            // console.log('some err happened');
            resolve(false);
          }
        );

      }
      else{
        // this.mainData.openToast(`Cover image not uploaded!`);
        resolve(false);
      }
    })
  }

}
