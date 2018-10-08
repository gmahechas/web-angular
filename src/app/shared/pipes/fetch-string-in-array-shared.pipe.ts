import { Pipe, PipeTransform } from '@angular/core';

import { get } from 'lodash';

@Pipe({
  name: 'fetchStringInArrayShared'
})
export class FetchStringInArraySharedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return get(value, args, args);
  }

}
