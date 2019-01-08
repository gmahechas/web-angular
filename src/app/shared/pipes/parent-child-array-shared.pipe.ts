import { Pipe, PipeTransform } from '@angular/core';

import { get } from 'lodash';

@Pipe({
  name: 'parentChildArrayShared'
})
export class ParentChildArraySharedPipe implements PipeTransform {

  transform(objects: any, id: any, parent_id: any, label?: any): any {

    const newObjects: any[] = [];

    objects.map(object => {
      newObjects.push({
        label: (label) ? get(object, label, label) : null,
        data: object,
        children: []
      });
    });

    return this.nested(newObjects, id, parent_id);
  }

  nested(objects, id: any, parent_id: any, parentId = null) {
    const out = [];
    objects.forEach(element => {
      if (get(element.data, parent_id, parent_id) === parentId) {
        const children = this.nested(objects, id, parent_id, get(element.data, id, id));
        if (children.length) {
          children.forEach(child => {
            element.children.push(child);
          });
        }
        out.push(element);
      }
    });
    return out;
  }

}
