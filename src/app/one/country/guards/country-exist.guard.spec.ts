import { TestBed, async, inject } from '@angular/core/testing';

import { CountryExistGuard } from './country-exist.guard';

describe('CountryExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryExistGuard]
    });
  });

  it('should ...', inject([CountryExistGuard], (guard: CountryExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
