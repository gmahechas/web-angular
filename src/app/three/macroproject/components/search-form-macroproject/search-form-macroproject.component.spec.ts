import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormMacroprojectComponent } from './search-form-macroproject.component';

describe('SearchFormMacroprojectComponent', () => {
  let component: SearchFormMacroprojectComponent;
  let fixture: ComponentFixture<SearchFormMacroprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormMacroprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormMacroprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
