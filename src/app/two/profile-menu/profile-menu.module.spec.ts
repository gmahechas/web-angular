import { ProfileMenuModule } from './profile-menu.module';

describe('ProfileMenuModule', () => {
  let profileMenuModule: ProfileMenuModule;

  beforeEach(() => {
    profileMenuModule = new ProfileMenuModule();
  });

  it('should create an instance', () => {
    expect(profileMenuModule).toBeTruthy();
  });
});
