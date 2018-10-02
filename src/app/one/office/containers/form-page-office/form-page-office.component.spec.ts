import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageOfficeComponent } from './form-page-office.component';

describe('FormPageOfficeComponent', () => {
  let component: FormPageOfficeComponent;
  let fixture: ComponentFixture<FormPageOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPageOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
