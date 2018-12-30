import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors-shared',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './validation-errors-shared.component.html',
  styles: []
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

  get showText() {
    const texts: string[] = [];
    if (this.control.hasError('required')) {
      texts.push('field.verb', 'required.verb');
    }
    if (this.control.hasError('minlength')) {
      texts.push('minimum.verb', String(this.control.errors['minlength'].requiredLength), 'letter.verb');
    }
    if (this.control.hasError('maxlength')) {
      texts.push('maximum.verb', String(this.control.errors['maxlength'].requiredLength), 'letter.verb');
    }
    return texts;
  }

  constructor() { }

  ngOnInit() {
  }

}
