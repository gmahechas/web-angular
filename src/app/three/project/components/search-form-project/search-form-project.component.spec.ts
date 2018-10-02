import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormProjectComponent } from './search-form-project.component';

describe('SearchFormProjectComponent', () => {
  let component: SearchFormProjectComponent;
  let fixture: ComponentFixture<SearchFormProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
