import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar-core',
  templateUrl: './progress-bar-core.component.html',
  styleUrls: ['./progress-bar-core.component.scss']
})
export class ProgressBarCoreComponent implements OnInit {

  @Input() progressBar: boolean;

  constructor() { }

  ngOnInit() {
  }

}
