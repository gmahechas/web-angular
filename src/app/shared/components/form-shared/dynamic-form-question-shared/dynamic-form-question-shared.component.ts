import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './../models/question-base';

@Component({
  selector: 'app-dynamic-form-question-shared',
  templateUrl: './dynamic-form-question-shared.component.html',
  styles: []
})
export class DynamicFormQuestionSharedComponent implements OnInit {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  constructor() { }

  ngOnInit() {
  }

}
