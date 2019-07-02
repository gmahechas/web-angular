import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/c/profile-menu/graphql';

import * as fromModels from '@web/app/features/c/profile-menu/models';

@Injectable({
  providedIn: 'root'
})
export class ProfileMenuService {

  queryRef: QueryRef<fromModels.PaginationProfileMenu>;

  constructor(
    private profileMenuPaginationGQL: fromGraphql.ProfileMenuPaginationGQL,
    private profileMenuStoreGQL: fromGraphql.ProfileMenuStoreGQL,
    private profileMenuUpdateGQL: fromGraphql.ProfileMenuUpdateGQL,
    private profileMenuDestroyGQL: fromGraphql.ProfileMenuDestroyGQL
  ) { }

  load(searchProfileMenu: fromModels.SearchProfileMenu) {
    this.queryRef = this.profileMenuPaginationGQL.watch({
      ...searchProfileMenu.profile_menu,
      profile_id: (searchProfileMenu.profile) ? searchProfileMenu.profile.profile_id : null,
      limit: searchProfileMenu.limit,
      page: searchProfileMenu.page
    });

    return this.queryRef.valueChanges;
  }

  store(profileMenu: fromModels.ProfileMenu) {
    return this.profileMenuStoreGQL.mutate(profileMenu);
  }

  update(profileMenu: fromModels.ProfileMenu) {
    return this.profileMenuUpdateGQL.mutate(profileMenu);
  }

  destroy(profileMenu: fromModels.ProfileMenu) {
    return this.profileMenuDestroyGQL.mutate(profileMenu);
  }

  pagination(searchProfileMenu: fromModels.SearchProfileMenu) {

    return this.queryRef.fetchMore({
      query: this.profileMenuPaginationGQL.document,
      variables: {
        profile_menu_id: searchProfileMenu.profile_menu.profile_menu_id,
        profile_menu_status: searchProfileMenu.profile_menu.profile_menu_status,
        profile_id: searchProfileMenu.profile.profile_id,
        limit: searchProfileMenu.limit,
        page: searchProfileMenu.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, [prev, fetchMoreResult]);
      }
    });
  }

}
