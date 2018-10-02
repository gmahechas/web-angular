import { CityModule } from './city.module';

describe('CityModule', () => {
  let cityModule: CityModule;

  beforeEach(() => {
    cityModule = new CityModule();
  });

  it('should create an instance', () => {
    expect(cityModule).toBeTruthy();
  });
});
