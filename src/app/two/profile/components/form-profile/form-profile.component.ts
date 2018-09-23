import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Profile } from './../../models/profile.model';

@Component({
  selector: 'app-form-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-profile.component.html',
  styles: []
})
export class FormProfileComponent implements OnChanges, OnInit {

  @Input() profile: Profile;
  @Output() submitted: EventEmitter<Profile> = new EventEmitter<Profile>();

  profileForm: FormGroup = this.formBuilder.group({
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

  onSubmit(profileForm: FormGroup) {

    if (this.profile) {
      if (profileForm.dirty) {
        const updated = {
          profile_id: this.profile.profile_id,
          ...profileForm.value.profile
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit(profileForm.value.profile);
    }

  }

}
