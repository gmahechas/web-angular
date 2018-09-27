import { Component, OnInit, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';

import { QuestionBase } from './../models/question-base';
import { QuestionControlService } from './../services/question-control.service';

@Component({
  selector: 'app-dynamic-form-shared',
  templateUrl: './dynamic-form-shared.component.html',
  styles: []
})
export class DynamicFormSharedComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(
    private qcs: QuestionControlService
  ) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
