import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit, AfterViewInit {
  
  displayval : boolean = true;
  @Output('date') date: any = new EventEmitter();
  @Input('date-input') dateInput: any;
  @Input('show-value') showExtraValue: boolean = false;

  constructor(private fb: FormBuilder) {}


  range: FormGroup;

  ngOnInit(): void {
    this.range = this.fb.group({
      start: [null],
      end: [null]
    })
    if(this.dateInput.start && this.dateInput.end){
      this.range.patchValue({
        start: new Date(this.dateInput.start),
        end: new Date(this.dateInput.end)
      })
    }
  }

  ngAfterViewInit(): void {
    
  }

  formatDate(date: any){
    let d = new Date(date);
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
  }

  toggledate(){
    this.displayval = !this.displayval;
  }

  selectedDate(){
    if(this.range.value.start && this.range.value.end){
      // console.log(this.range.value.start);
      this.date.emit({start: this.range.value.start, end: this.range.value.end});
    }
  }

}
