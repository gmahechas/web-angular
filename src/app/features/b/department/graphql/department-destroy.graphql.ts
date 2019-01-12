import { Injectable } from '@angular/core';

import { DestroyDepartment } from '@web/app/features/b/department/models/destroy-department.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DepartmentDestroyGQL extends Mutation<DestroyDepartment> {

  document: DocumentNode = gql`
    mutation destroyDepartment($department_id: ID!) {
      destroyDepartment(department_id: $department_id) {
        department_id
        department_name
        department_description
      }
    }
  `;

}
