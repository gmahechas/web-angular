import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-split-button-shared',
  templateUrl: './split-button-shared.component.html',
  styles: []
})
export class SplitButtonSharedComponent implements OnInit {

  @Input() label: string[];
  @Input() class: string;

  constructor() { }

  ngOnInit() {
  }

}
