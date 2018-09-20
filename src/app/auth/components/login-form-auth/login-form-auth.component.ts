import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Auth } from '../../models/auth.model';

@Component({
  selector: 'app-login-form-auth',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form-auth.component.html',
  styles: []
})
export class LoginFormAuthComponent implements OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }
  @Input() error: string | null;
  @Output() submitted: EventEmitter<Auth> = new EventEmitter<Auth>();

  loginForm: FormGroup = this.formBuilder.group({
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

  login(loginForm: FormGroup) {
    this.submitted.emit(loginForm.value.auth);
  }
}
