import { Pipe, PipeTransform } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Pipe({
  name: 'parentChildArrayShared'
})
export class ParentChildArraySharedPipe implements PipeTransform {

  transform(objects: any): any {
    const newObjects: TreeNode[] = [];
    objects.map(object => {
      newObjects.push({
        label: object.menu.menu_name,
        data: object
      });
    });
    const end = this.nested(newObjects);
    return end;
  }

  nested(objects, parent = null) {
    const out = [];
    objects.forEach(element => {
      if (element.data.menu.menu_parent_id === parent) {
        const children = this.nested(objects, element.data.menu.menu_id);
        if (children.length) {
          element.children.push(children);
        }
        out.push(element);
      }
    });
    return out;
  }
}
