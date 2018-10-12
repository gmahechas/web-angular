import { Component, OnInit, Input } from '@angular/core';

import { UserOffice } from '@web/app/two/user-office/models/user-office.model';

@Component({
  selector: 'app-edit-user-office',
  templateUrl: './edit-user-office.component.html',
  styles: []
})
export class EditUserOfficeComponent implements OnInit {

  @Input() user_office: UserOffice;

  constructor() { }

  ngOnInit() {
  }

}
