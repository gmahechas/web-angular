import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parentChildArrayShared'
})
export class ParentChildArraySharedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}