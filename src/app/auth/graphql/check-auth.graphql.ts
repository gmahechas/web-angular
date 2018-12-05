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
          email
          person_id
          profile_id
          person {
            person_id
            person_business_type,
            person_identification_type,
            person_identification
            person_first_name
            person_second_name
            person_first_surname
            person_second_surname
            person_legal_name
            city_id
          }
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
