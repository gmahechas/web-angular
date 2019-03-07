import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';
import { User } from '@web/app/features/c/user/models/user.model';
import { Office } from '@web/app/features/b/office/models/office.model';

@Component({
  selector: 'app-form-user-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-user-office.component.html',
  styles: []
})
export class FormUserOfficeComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.userOfficeForm.disable();
    } else {
      this.userOfficeForm.enable();
    }
  }
  @Input() entityLabel: string;
  @Input() user: User;
  @Input() office: Office;
  @Output() submitted = new EventEmitter<UserOffice>();

  userOfficeForm = this.formBuilder.group({
    user: this.formBuilder.control('', [Validators.required]),
    office: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    switch (this.entityLabel) {
      case 'user':
        this.userOfficeForm.setValue({
          user: this.user,
          office: null
        });
        break;
      case 'office':
        this.userOfficeForm.setValue({
          user: null,
          office: this.office
        });
        break;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted.emit({
      user_office_status: true,
      user_id: this.userOfficeForm.value.user.user_id,
      office_id: this.userOfficeForm.value.office.office_id
    });
    switch (this.entityLabel) {
      case 'user':
        this.userOfficeForm.controls.office.reset();
        break;
      case 'office':
        this.userOfficeForm.controls.user.reset();
        break;
    }
  }
}
