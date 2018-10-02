import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormProfileComponent } from './search-form-profile.component';

describe('SearchFormProfileComponent', () => {
  let component: SearchFormProfileComponent;
  let fixture: ComponentFixture<SearchFormProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
