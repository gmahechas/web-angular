import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Auth } from '@web/app/auth/models/auth.model';

@Component({
  selector: 'app-form-auth',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-auth.component.html',
  styles: []
})
export class FormAuthComponent implements OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.authForm.disable();
    } else {
      this.authForm.enable();
    }
  }
  @Input() error: string | null;
  @Output() submitted: EventEmitter<Auth> = new EventEmitter<Auth>();

  authForm = this.formBuilder.group({
    auth: this.formBuilder.group({
      username: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required])
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  login() {
    this.submitted.emit(this.authForm.value.auth);
  }
}
