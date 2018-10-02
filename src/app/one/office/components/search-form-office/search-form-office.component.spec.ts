import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormOfficeComponent } from './search-form-office.component';

describe('SearchFormOfficeComponent', () => {
  let component: SearchFormOfficeComponent;
  let fixture: ComponentFixture<SearchFormOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
