import { MacroprojectModule } from './macroproject.module';

describe('MacroprojectModule', () => {
  let macroprojectModule: MacroprojectModule;

  beforeEach(() => {
    macroprojectModule = new MacroprojectModule();
  });

  it('should create an instance', () => {
    expect(macroprojectModule).toBeTruthy();
  });
});
