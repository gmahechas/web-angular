import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SearchUser } from './../../models/search-user.model';

@Component({
  selector: 'app-search-form-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-user.component.html',
  styles: []
})
export class SearchFormUserComponent implements OnChanges, OnInit {

  @Input() query: SearchUser;
  @Output() search: EventEmitter<SearchUser> = new EventEmitter<SearchUser>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() resetSearch: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormUser: FormGroup = this.formBuilder.group({
    user: this.formBuilder.group({
      user_id: this.formBuilder.control(''),
      username: this.formBuilder.control(''),
      email: this.formBuilder.control('')
    }),
    person: this.formBuilder.control(''),
    profile: this.formBuilder.control('')
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormUser.setValue({
      user: {
        user_id: this.query.user.user_id,
        username: this.query.user.username,
        email: this.query.user.email
      },
      person: this.query.person,
      profile: this.query.profile
    });
  }

  ngOnInit() {
  }

  onSubmit(searchFormUser: FormGroup) {
    this.search.emit(searchFormUser.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
