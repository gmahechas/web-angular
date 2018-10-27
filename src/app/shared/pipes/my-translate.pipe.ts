import { Pipe, PipeTransform } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'myTranslate'
})
export class MyTranslatePipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) { }

  transform(value: string[], args?: any): any {
    let text = '';
    value.forEach(val => {
      if (val) {
        text = text.concat(this.translate.instant(val), ' ');
      }
    });
    return text;
  }

}
