import { Injectable } from '@angular/core';

import { StoreOfficeDepartment } from '@web/app/features/b/office-department/models/store-office-department.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class OfficeDepartmentStoreGQL extends Mutation<StoreOfficeDepartment> {

  document: DocumentNode = gql`
    mutation storeOfficeDepartment(
      $office_department_status: Boolean,
      $office_id: ID,
      $department_id: ID
    ) {
      storeOfficeDepartment(
        office_department_status: $office_department_status,
        office_id: $office_id,
        department_id: $department_id
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
