import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-core',
  templateUrl: './spinner-core.component.html',
  styles: []
})
export class SpinnerCoreComponent implements OnInit {

  @Input() showSpinner = false;

  constructor() { }

  ngOnInit() {
  }

}
