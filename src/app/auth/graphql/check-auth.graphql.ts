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
        user_created_at
        user_updated_at
        user_deleted_at
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
          person_created_at
          person_updated_at
          person_deleted_at
          city_id
        }
        profile {
          profile_id
          profile_name
          profile_created_at
          profile_updated_at
          profile_deleted_at
          profile_menus {
            profile_menu_id
            profile_menu_status
            profile_menu_created_at
            profile_menu_updated_at
            profile_menu_deleted_at
            profile_id
            menu_id
            menu {
              menu_id
              menu_name
              menu_uri
              menu_created_at
              menu_updated_at
              menu_deleted_at
              menu_parent_id
            }
          }
        }
      }
      company {
        company_id
        company_name
        company_identification
        company_created_at
        company_updated_at
        company_deleted_at
        city_id
      }
    }
  }
`;
}
