import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors-shared',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './validation-errors-shared.component.html',
  styleUrls: ['./validation-errors-shared.component.scss']
})
export class ValidationErrorsSharedComponent implements OnInit {

  @Input() control: FormControl;

  get invalid() {
    return (
      this.control.invalid &&
      this.control.touched &&
      this.control.dirty
    );
  }

  constructor() { }

  ngOnInit() {
  }

}
