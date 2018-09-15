import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import * as fromGraphql from './../graphql/profile-menu.graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileMenuService {

  constructor(
    private apollo: Apollo
  ) { }

  load(searchProfileMenu: fromModels.SearchProfileMenu) {
    return this.apollo.watchQuery<fromModels.PaginationProfileMenu, fromModels.SearchProfileMenu>({
      query: fromGraphql.pagination,
      variables: {
        ...searchProfileMenu.profile_menu,
        profile_id: (searchProfileMenu.profile) ? searchProfileMenu.profile.profile_id : null,
        limit: searchProfileMenu.limit,
        page: searchProfileMenu.page
      }
    }).valueChanges;
  }

}
