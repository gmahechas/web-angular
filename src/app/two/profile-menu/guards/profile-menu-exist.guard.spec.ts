import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileMenuExistGuard } from './profile-menu-exist.guard';

describe('ProfileMenuExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileMenuExistGuard]
    });
  });

  it('should ...', inject([ProfileMenuExistGuard], (guard: ProfileMenuExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
