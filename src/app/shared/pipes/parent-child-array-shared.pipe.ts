import { Pipe, PipeTransform } from '@angular/core';

import { get } from 'lodash';

@Pipe({
  name: 'parentChildArrayShared'
})
export class ParentChildArraySharedPipe implements PipeTransform {

  transform(objects: any, id: any, parentId: any, label?: any): any {
    const treeNode = this.transformToTreeNode(objects, label);
    const treeNodeNested = this.nested(treeNode, id, parentId);
    return treeNodeNested;
  }

  nested(objects, id: any, parentId: any, oldParentId = null) {
    const out: any[] = [];
    objects.forEach(element => {
      if (get(element.data, parentId, null) === oldParentId) {
        const children = this.nested(objects, id, parentId, get(element.data, id, null));
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

  transformToTreeNode(objects, label) {
    const objectsTreeNode: any[] = [];
    objects.map(object => {
      objectsTreeNode.push({
        label: get(object, label, null),
        data: object,
        children: []
      });
    });
    return objectsTreeNode;
  }

}
