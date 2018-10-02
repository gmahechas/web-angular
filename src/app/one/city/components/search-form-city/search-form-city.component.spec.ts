import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormCityComponent } from './search-form-city.component';

describe('SearchFormCityComponent', () => {
  let component: SearchFormCityComponent;
  let fixture: ComponentFixture<SearchFormCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
