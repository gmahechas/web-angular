import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar-core',
  templateUrl: './progress-bar-core.component.html',
  styles: []
})
export class ProgressBarCoreComponent implements OnInit {

  @Input() progressBar: boolean;

  constructor() { }

  ngOnInit() {
  }

}
