import { Component, OnInit, Input } from '@angular/core';
import { LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-transform-text-shared',
  templateUrl: './transform-text-shared.component.html',
  styles: [],
  providers: [LowerCasePipe, TitleCasePipe, UpperCasePipe]
})
export class TransformTextSharedComponent implements OnInit {

  newText = '';
  @Input() text: string;
  @Input() toLowerCase: boolean;
  @Input() toTitleCase: boolean;
  @Input() toUpperCase: boolean;

  constructor(
    private lowerCasePipe: LowerCasePipe,
    private titleCasePipe: TitleCasePipe,
    private upperCasePipe: UpperCasePipe
  ) { }

  ngOnInit() {
    if (!this.toLowerCase && !this.toTitleCase && !this.toUpperCase) {
      this.newText = this.text;
    } else if (this.toLowerCase) {
      this.newText = this.lowerCasePipe.transform(this.text);
    } else if (this.toTitleCase) {
      this.newText = this.titleCasePipe.transform(this.text);
    } else if (this.toUpperCase) {
      this.newText = this.upperCasePipe.transform(this.text);
    }
  }

}
