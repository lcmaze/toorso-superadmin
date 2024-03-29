import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  cdnUrl: string = environment.cdnLink;
  selectedState: any;

  constructor(private mainData: MainService, private http: HttpClient) { }

  ngOnInit() {
    this.selectedState = this.mainData.state;
    this.getStates(this.selectedState.country_info.country_id);
    this.getCities(this.selectedState.state_id);
    let state = this.mainData.selectedState.subscribe(data => {
      this.selectedState = data;
      this.getCities(this.selectedState.state_id);
    });
    if(this.mainData.selectedMembership){
      this.selectVendor(this.mainData.selectedMembership);
    }
  }

  selectVendor(ev: any){
    this.mainData.vendorId = ev.vendor_id;
    this.getVendor();
  }

  selectedCity: any;
  selectCity(city: any){
    if(city){
      // console.log(city);
      this.selectedCity = city;
    }
  }

  // countries
  countries: any;
  getCountry(){
    this.mainData.getCache(`api/get-countries`).subscribe(data => {
      this.countries = data;
    })
  }

  vendor: any;
  vendor_keywords: any = [];
  vendor_keywords_single: any;
  getVendor(){
    if(this.mainData.vendorId){
      this.mainData.get(`api/super/get-vendor?id=${this.mainData.vendorId}`).subscribe(data => {
        this.vendor = data[Object.keys(data)[0]];
        this.vendor_keywords = this.vendor.vendor_keywords ? this.vendor.vendor_keywords.split(',') : [];
        // console.log(this.vendor);
        if(this.vendor.city_info) {
          this.getStates(this.vendor.city_info.states_info.country_info.country_id);
          this.getCities(this.vendor.city_info.states_info.state_id);
        }
        // else{this.getStates(this.vendor.city_info.states_info.country_info.country_id)}
      })
    }
  }

  deleteVendorKeywords(i: any){
    console.log(this.vendor_keywords[i]);
    this.vendor_keywords.splice(i, 1);
  }

  // states 
  states: any;
  getStates(id: any){
    this.mainData.getCache(`api/get-states?id=${id}`).subscribe(data => {
      this.states = data.rows;
    })
  }

  // cities 
  cities: any;
  getCities(id: any){
    console.log(id);
    this.mainData.getCache(`api/get-cities?id=${id}`).subscribe(data => {
      this.cities = data.rows;
    })
  }

  // update vendor details
  async updateVendor(form: NgForm){
    if(form.valid){
      await this.onMultipleSubmit().then(()=>{
        form.value['vendor_id'] = this.vendor.vendor_id;
        form.value['vendor_logo'] = this.vendor.vendor_logo;
        form.value['vendor_keywords'] = this.vendor_keywords.toString();
        if(this.selectedCity){
          form.value['city_id'] = this.selectedCity.city_id;
        }
        if(this.newsImageName) form.value['vendor_logo'] = this.newsImageName;
        this.mainData.post(form.value, `api/vendor/update-vendor`).subscribe(data =>{
          if(data){
            this.mainData.openToast("Updated Details!");
            this.vendorLogo.nativeElement.value = "";
          }
          else{
            this.mainData.openToast("Something went wrong!");
          }
        })
      })
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
        this.http.post<any>(environment.apiUrl + 'api/vendor/upload-vendor-logo', formData).subscribe(
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
