import { Pipe, PipeTransform } from '@angular/core';

import { at } from 'lodash';

@Pipe({
  name: 'fetchStringInArrayShared'
})
export class FetchStringInArraySharedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return at(value, args);
  }

}
