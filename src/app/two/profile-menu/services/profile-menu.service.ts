import { Injectable } from '@angular/core';

import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileMenuService {

  constructor(
    private profileMenuPagination: fromGraphql.ProfileMenuPaginationGQL
  ) { }

  load(searchProfileMenu: fromModels.SearchProfileMenu) {
    return this.profileMenuPagination.watch({
      ...searchProfileMenu.profile_menu,
      profile_id: (searchProfileMenu.profile) ? searchProfileMenu.profile.profile_id : null,
      limit: searchProfileMenu.limit,
      page: searchProfileMenu.page
    }).valueChanges;
  }

}
