import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SearchProfile } from './../../models/search-profile.model';

@Component({
  selector: 'app-search-form-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-profile.component.html',
  styles: []
})
export class SearchFormProfileComponent implements OnChanges, OnInit {

  @Input() query: SearchProfile;
  @Output() search: EventEmitter<SearchProfile> = new EventEmitter<SearchProfile>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormProfile: FormGroup = this.formBuilder.group({
    profile: this.formBuilder.group({
      profile_id: this.formBuilder.control(''),
      profile_name: this.formBuilder.control('')
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormProfile.setValue({
      profile: {
        profile_id: this.query.profile.profile_id,
        profile_name: this.query.profile.profile_name
      }
    });
  }

  ngOnInit() {
  }

  onSubmit(searchFormProfile: FormGroup) {
    this.search.emit(searchFormProfile.value);
  }

  onCreate() {
    this.create.emit(true);
  }
}
