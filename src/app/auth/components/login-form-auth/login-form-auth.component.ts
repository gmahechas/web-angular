import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Auth } from '../../models/auth.model';

@Component({
  selector: 'app-login-form-auth',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form-auth.component.html',
  styles: []
})
export class LoginFormAuthComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    auth: this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  });

  @Output() submitted: EventEmitter<Auth> = new EventEmitter<Auth>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  login(loginForm: FormGroup) {
    this.submitted.emit(loginForm.value);
  }
}
