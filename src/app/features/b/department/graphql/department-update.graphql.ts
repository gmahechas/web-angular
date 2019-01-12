import { Injectable } from '@angular/core';

import { UpdateDepartment } from '@web/app/features/b/department/models/update-department.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DepartmentUpdateGQL extends Mutation<UpdateDepartment> {

  document: DocumentNode = gql`
    mutation updateDepartment($department_id: ID!, $department_name: String, $department_description: String) {
        updateDepartment(
          department_id: $department_id,
          department_name: $department_name,
          department_description: $department_description
        ) {
          department_id
          department_name
          department_description
        }
    }
  `;

}
