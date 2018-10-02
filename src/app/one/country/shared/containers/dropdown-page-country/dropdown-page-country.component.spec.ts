import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPageCountryComponent } from './dropdown-page-country.component';

describe('DropdownPageCountryComponent', () => {
  let component: DropdownPageCountryComponent;
  let fixture: ComponentFixture<DropdownPageCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPageCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPageCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
