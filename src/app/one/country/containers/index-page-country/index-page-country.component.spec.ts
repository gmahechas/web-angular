import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageCountryComponent } from './index-page-country.component';

describe('IndexPageCountryComponent', () => {
  let component: IndexPageCountryComponent;
  let fixture: ComponentFixture<IndexPageCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
