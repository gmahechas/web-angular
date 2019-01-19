import { Injectable } from '@angular/core';

import { CheckAuth } from '@web/app/auth/models/check-auth.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CheckAuthGQL extends Query<CheckAuth> {

  document: DocumentNode = gql`
    query {
      checkAuth {
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
            person_address
            person_email
            person_phone
            type_person_id
            type_person {
              type_person_id
              type_person_code
              type_person_description
            }
            type_person_identification_id
            type_person_identification {
              type_person_identification_id
              type_person_identification_code
              type_person_identification_description
            }
          }
          profile_id
          profile {
            profile_id
            profile_name
            profile_menus {
              profile_menu_id
              profile_menu_status
              profile_id
              menu_id
              menu {
                menu_id
                menu_name
                menu_title_case
                menu_upper_case
                menu_uri
                menu_parent_id
              }
            }
          }
        }
        company {
          company_id
          company_name
          company_identification
          city_id
        }
      }
    }
  `;
}
