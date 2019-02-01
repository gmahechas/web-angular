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
      texts.push('nouns.field.singular', 'adjectives.required.singular');
    }
    if (this.control.hasError('minlength')) {
      texts.push('adjectives.minimum.singular', String(this.control.errors['minlength'].requiredLength), 'nouns.letter.singular');
    }
    if (this.control.hasError('maxlength')) {
      texts.push('adjectives.maximum.singular', String(this.control.errors['maxlength'].requiredLength), 'nouns.letter.singular');
    }
    if (this.control.hasError('invalidIdentification')) {
      texts.push('person.model.person_identification', 'adjectives.invalid.singular');
    }
    return texts;
  }

  constructor() { }

  ngOnInit() {
  }

}
