import { Pipe, PipeTransform } from '@angular/core';

import { get } from 'lodash';

@Pipe({
  name: 'parentChildArrayShared'
})
export class ParentChildArraySharedPipe implements PipeTransform {

  transform(objects: any, id: any, parentId: any, label?: any): any {

    const newObjects: any[] = [];

    objects.map(object => {
      newObjects.push({
        label: (label) ? get(object, label, label) : null,
        data: object,
        children: []
      });
    });

    return this.nested(newObjects, id, parentId);
  }

  nested(objects, id: any, oldParentId: any, parentId = null) {
    const out = [];
    objects.forEach(element => {
      if (get(element.data, oldParentId, oldParentId) === parentId) {
        const children = this.nested(objects, id, oldParentId, get(element.data, id, id));
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
