import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon-prime-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-prime-shared.component.html',
  styles: []
})
export class IconPrimeSharedComponent implements OnChanges, OnInit {

  @Input() class: string;
  @Input() style: string;
  newStyle: any;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges() {
    if (this.style) {
      this.newStyle = this.sanitizer.bypassSecurityTrustStyle(this.style);
    }
  }

  ngOnInit() {
  }

}
