import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormCountryComponent } from './search-form-country.component';

describe('SearchFormCountryComponent', () => {
  let component: SearchFormCountryComponent;
  let fixture: ComponentFixture<SearchFormCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
