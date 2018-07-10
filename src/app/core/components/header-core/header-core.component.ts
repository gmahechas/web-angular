import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-core',
  templateUrl: './header-core.component.html',
  styleUrls: ['./header-core.component.scss']
})
export class HeaderCoreComponent implements OnInit {

  @Output() clickOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  handlerClick(event) {
    this.clickOpen.emit(event);
  }

}
