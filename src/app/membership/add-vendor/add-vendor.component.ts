import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

  constructor(private mainData: MainService, private router: Router) { }

  city: any;

  ngOnInit(): void {
  }

  submitDetails(form: NgForm){
    if(form.valid){
      form.value['city_id'] = this.city.city_id;
      // console.log(form.value);
      this.mainData.post(form.value, `api/vendor/register-vendor`).subscribe(data => {
        if(data === true){
          this.mainData.openToast("Registered Successfully!");
          this.router.navigateByUrl('/membership');
        }
        else{
          this.mainData.openToast(data['message']);
        }
      })
    }
  }

}
