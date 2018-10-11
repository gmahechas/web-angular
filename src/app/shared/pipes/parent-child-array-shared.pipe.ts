import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parentChildArrayShared'
})
export class ParentChildArraySharedPipe implements PipeTransform {

  transform(objects: any): any {

    const newObjects: any[] = [];

    objects.map(object => {
      newObjects.push({
        label: object.menu.menu_name,
        data: object,
        children: []
      });
    });

    return this.nested(newObjects);
  }

  nested(objects, parentId = null) {
    const out = [];
    objects.forEach(element => {
      if (element.data.menu.menu_parent_id === parentId) {
        const children = this.nested(objects, element.data.menu.menu_id);
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
