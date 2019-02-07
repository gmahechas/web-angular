import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Profile } from '@web/app/features/c/profile/models/profile.model';

@Component({
  selector: 'app-form-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-profile.component.html',
  styles: []
})
export class FormProfileComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.profileForm.disable();
    } else {
      this.profileForm.enable();
    }
  }
  @Input() profile: Profile;
  @Output() submitted = new EventEmitter<Profile>();

  profileForm = this.formBuilder.group({
    profile: this.formBuilder.group({
      profile_name: this.formBuilder.control('', [Validators.required])
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.profile) {
      this.profileForm.reset();
      this.profileForm.setValue({
        profile: {
          profile_name: this.profile.profile_name
        }
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.profile) {
      if (this.profileForm.dirty) {
        const updated = {
          profile_id: this.profile.profile_id,
          ...this.profileForm.value.profile
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit(this.profileForm.value.profile);
    }

  }

}
