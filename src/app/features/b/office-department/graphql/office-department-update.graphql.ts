import { Injectable } from '@angular/core';

import { UpdateOfficeDepartment } from '@web/app/features/b/office-department/models/update-office-department.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class OfficeDepartmentUpdateGQL extends Mutation<UpdateOfficeDepartment> {

  document: DocumentNode = gql`
    mutation updateOfficeDepartment(
      $office_department_id: ID!,
      $office_department_status: Boolean
    ) {
      updateOfficeDepartment(
        office_department_id: $office_department_id,
        office_department_status: $office_department_status
      ) {
        office_department_id
        office_department_status
        office_id
        office {
          office_id
          office_name
        }
        department_id
        department {
          department_id
          department_name
        }
      }
    }
  `;

}
