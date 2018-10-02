import { TestBed, async, inject } from '@angular/core/testing';

import { CityExistGuard } from './city-exist.guard';

describe('CityExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityExistGuard]
    });
  });

  it('should ...', inject([CityExistGuard], (guard: CityExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
