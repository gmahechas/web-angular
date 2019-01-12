import { Injectable } from '@angular/core';

import { StoreDepartment } from '@web/app/features/b/department/models/store-department.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DepartmentStoreGQL extends Mutation<StoreDepartment> {

  document: DocumentNode = gql`
    mutation storeDepartment($department_name: String, $department_description: String) {
      storeDepartment(department_name: $department_name, department_description: $department_description) {
        department_id
        department_name
        department_description
      }
    }
  `;

}
