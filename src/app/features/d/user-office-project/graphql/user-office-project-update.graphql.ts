import { Injectable } from '@angular/core';

import { UpdateUserOfficeProject } from '@web/app/features/d/user-office-project/models/update-user-office-project.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserOfficeProjectUpdateGQL extends Mutation<UpdateUserOfficeProject> {

  document: DocumentNode = gql`
    mutation updateUserOfficeProject($user_office_project_id: ID!, $user_office_project_status: Boolean) {
        updateUserOfficeProject(user_office_project_id: $user_office_project_id, user_office_project_status: $user_office_project_status) {
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
