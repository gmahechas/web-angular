import { Pipe, PipeTransform } from '@angular/core';
import { LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Pipe({
  name: 'transformTextShared'
})
export class TransformTextSharedPipe implements PipeTransform {

  constructor(
    private lowerCasePipe: LowerCasePipe,
    private titleCasePipe: TitleCasePipe,
    private upperCasePipe: UpperCasePipe
  ) { }

  transform(value: any, toLowerCase?: boolean, toTitleCase?: boolean, toUpperCase?: boolean): any {
    if (!toLowerCase && !toTitleCase && !toUpperCase) {
      return value;
    } else if (toLowerCase) {
      return this.lowerCasePipe.transform(value);
    } else if (toTitleCase) {
      return this.titleCasePipe.transform(value);
    } else if (toUpperCase) {
      return this.upperCasePipe.transform(value);
    }
  }

}
