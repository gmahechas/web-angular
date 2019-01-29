

import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

import { Company } from '@web/app/features/b/company/models/company.model';
import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';
import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';
import { User } from '@web/app/features/c/user/models';

@Component({
  selector: 'app-header-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-core.component.html',
  styles: []
})
export class HeaderCoreComponent implements OnInit {

  @Input() company: Company;
  @Input() userOffice: UserOffice;
  @Input() userOfficeProject: UserOfficeProject;
  @Input() user: User;
  @Output() clickOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickSelectOffice: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickSelectProject: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickLogout: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  handlerClick(event) {
    this.clickOpen.emit(event);
  }

  selectOffice() {
    this.clickSelectOffice.emit(true);
  }

  selectProject() {
    this.clickSelectProject.emit(true);
  }

  logout() {
    this.clickLogout.emit(true);
  }

}
