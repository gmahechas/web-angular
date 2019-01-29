import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

import { Company } from '@web/app/features/b/company/models/company.model';
import { Office } from '@web/app/features/b/office/models';
import { Project } from '@web/app/features/d/project/models/project.model';
import { User } from '@web/app/features/c/user/models';

@Component({
  selector: 'app-header-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-core.component.html',
  styles: []
})
export class HeaderCoreComponent implements OnInit {

  @Input() company: Company;
  @Input() office: any;
  @Input() project: any;
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
