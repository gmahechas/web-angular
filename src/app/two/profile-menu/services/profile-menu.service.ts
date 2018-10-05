import { Injectable } from '@angular/core';

import * as fromGraphql from '@app/app/two/profile-menu/graphql';

import * as fromModels from '@app/app/two/profile-menu/models';

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
