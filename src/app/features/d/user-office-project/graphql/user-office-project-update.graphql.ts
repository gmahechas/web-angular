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
          user_office_id
          user_office {
            user_office_id
            user_office_status
            user_id
            user {
              user_id
              username
              person_id
              person {
                person_id
                person_identification
                person_first_name
                person_second_name
                person_first_surname
                person_second_surname
                person_legal_name
              }
              profile_id
            }
            office_id
            office {
              office_id
              office_name
            }
          }
          project_id
          project {
            project_id
            project_name
            project_address
            project_phone
            macroproject_id
          }
        }
      }
  `;

}
