import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

import { Company } from '@web/app/features/b/company/models/company.model';
import { User } from '@web/app/features/c/user/models';

@Component({
  selector: 'app-header-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-core.component.html',
  styles: []
})
export class HeaderCoreComponent implements OnInit {

  @Input() company: Company;
  @Input() user: User;
  @Output() clickOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickLogout: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  handlerClick(event) {
    this.clickOpen.emit(event);
  }

  logout() {
    this.clickLogout.emit(true);
  }
}
