import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  
  displayval : boolean = true;
  @Output('date') date: any = new EventEmitter();
  @Input('date-input') dateInput: any;

  constructor() { }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
    if(this.dateInput.start && this.dateInput.end){

      this.range = new FormGroup({
        start: new FormControl(new Date(this.dateInput.start)),
        end: new FormControl(new Date(this.dateInput.end))
      });
    }
  }

  toggledate(){
    this.displayval = !this.displayval;
  }

  selectedDate(){
    if(this.range.value.start && this.range.value.end){
      console.log(this.range.value.start);
      this.date.emit({start: this.range.value.start, end: this.range.value.end});
    }
  }

}
