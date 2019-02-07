import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchUser } from '@web/app/features/c/user/models/search-user.model';

@Component({
  selector: 'app-search-form-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-user.component.html',
  styles: []
})
export class SearchFormUserComponent implements OnChanges, OnInit {

  @Input() query: SearchUser;
  @Output() search = new EventEmitter<SearchUser>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormUser = this.formBuilder.group({
    user: this.formBuilder.group({
      user_id: this.formBuilder.control(''),
      username: this.formBuilder.control('')
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
        username: this.query.user.username
      },
      person: this.query.person,
      profile: this.query.profile
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormUser.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
