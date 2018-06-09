import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-core',
  templateUrl: './spinner-core.component.html',
  styleUrls: ['./spinner-core.component.scss']
})
export class SpinnerCoreComponent implements OnInit {

  @Input() showSpinner = false;

  constructor() { }

  ngOnInit() {
  }

}
