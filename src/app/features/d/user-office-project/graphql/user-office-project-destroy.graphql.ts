import { Injectable } from '@angular/core';

import { DestroyUserOfficeProject } from '@web/app/features/d/user-office-project/models/destroy-user-office-project.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserOfficeProjectDestroyGQL extends Mutation<DestroyUserOfficeProject> {

  document: DocumentNode = gql`
    mutation destroyUserOfficeProject($user_office_project_id: ID!) {
      destroyUserOfficeProject(user_office_project_id: $user_office_project_id) {
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
