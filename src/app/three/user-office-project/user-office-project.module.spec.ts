import { UserOfficeProjectModule } from './user-office-project.module';

describe('UserOfficeProjectModule', () => {
  let userOfficeProjectModule: UserOfficeProjectModule;

  beforeEach(() => {
    userOfficeProjectModule = new UserOfficeProjectModule();
  });

  it('should create an instance', () => {
    expect(userOfficeProjectModule).toBeTruthy();
  });
});
