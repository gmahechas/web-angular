import { Injectable } from '@angular/core';

import { StoreUserOfficeProject } from '@web/app/features/d/user-office-project/models/store-user-office-project.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserOfficeProjectStoreGQL extends Mutation<StoreUserOfficeProject> {

  document: DocumentNode = gql`
    mutation storeUserOfficeProject($user_office_project_status: Boolean, $user_office_id: ID, $project_id: ID) {
      storeUserOfficeProject(
          user_office_project_status: $user_office_project_status,
          user_office_id: $user_office_id,
          project_id: $project_id
        ) {
          user_office_project_id
          user_office_project_status
          user_office_project_created_at
          user_office_project_updated_at
          user_office_project_deleted_at
          user_office_id
          project_id
      }
    }
  `;

}
