import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/c/profile-menu/graphql';

import * as fromModels from '@web/app/features/c/profile-menu/models';

@Injectable({
  providedIn: 'root'
})
export class ProfileMenuService {

  constructor(
    private profileMenuPaginationGQL: fromGraphql.ProfileMenuPaginationGQL
  ) { }

  load(searchProfileMenu: fromModels.SearchProfileMenu) {
    return this.profileMenuPaginationGQL.watch({
      ...searchProfileMenu.profile_menu,
      profile_id: (searchProfileMenu.profile) ? searchProfileMenu.profile.profile_id : null,
      limit: searchProfileMenu.limit,
      page: searchProfileMenu.page
    }).valueChanges;
  }

}
