import { Injectable } from '@angular/core';

import { DestroyOfficeDepartment } from '@web/app/features/b/office-department/models/destroy-office-department.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class OfficeDepartmentDestroyGQL extends Mutation<DestroyOfficeDepartment> {

  document: DocumentNode = gql`
    mutation destroyOfficeDepartment($office_department_id: ID!) {
      destroyOfficeDepartment(office_department_id: $office_department_id) {
        total
        per_page
        current_page
        from
        to
        data {
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
    }
  `;

}
