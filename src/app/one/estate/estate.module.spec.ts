import { EstateModule } from './estate.module';

describe('EstateModule', () => {
  let estateModule: EstateModule;

  beforeEach(() => {
    estateModule = new EstateModule();
  });

  it('should create an instance', () => {
    expect(estateModule).toBeTruthy();
  });
});
