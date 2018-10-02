import { TestBed } from '@angular/core/testing';

import { ProfileMenuService } from './profile-menu.service';

describe('ProfileMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileMenuService = TestBed.get(ProfileMenuService);
    expect(service).toBeTruthy();
  });
});
