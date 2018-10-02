import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormPersonComponent } from './search-form-person.component';

describe('SearchFormPersonComponent', () => {
  let component: SearchFormPersonComponent;
  let fixture: ComponentFixture<SearchFormPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
