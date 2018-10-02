import { UserOfficeModule } from './user-office.module';

describe('UserOfficeModule', () => {
  let userOfficeModule: UserOfficeModule;

  beforeEach(() => {
    userOfficeModule = new UserOfficeModule();
  });

  it('should create an instance', () => {
    expect(userOfficeModule).toBeTruthy();
  });
});
