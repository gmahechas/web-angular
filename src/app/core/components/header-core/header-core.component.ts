import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { Company } from '@web/app/one/company/models/company.model';

@Component({
  selector: 'app-header-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-core.component.html',
  styles: []
})
export class HeaderCoreComponent implements OnInit {

  @Input() company: Company;
  @Output() clickOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  handlerClick(event) {
    this.clickOpen.emit(event);
  }

}
