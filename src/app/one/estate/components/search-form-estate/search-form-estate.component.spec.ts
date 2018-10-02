import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormEstateComponent } from './search-form-estate.component';

describe('SearchFormEstateComponent', () => {
  let component: SearchFormEstateComponent;
  let fixture: ComponentFixture<SearchFormEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
