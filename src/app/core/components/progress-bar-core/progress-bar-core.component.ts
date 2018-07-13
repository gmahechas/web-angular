import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-progress-bar-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './progress-bar-core.component.html',
  styles: []
})
export class ProgressBarCoreComponent implements OnInit {

  @Input() progressBar: boolean;

  constructor() { }

  ngOnInit() {
  }

}
