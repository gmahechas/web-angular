import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageCountryComponent } from './form-page-country.component';

describe('FormPageCountryComponent', () => {
  let component: FormPageCountryComponent;
  let fixture: ComponentFixture<FormPageCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPageCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
