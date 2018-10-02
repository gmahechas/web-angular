import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOfficeComponent } from './form-office.component';

describe('FormOfficeComponent', () => {
  let component: FormOfficeComponent;
  let fixture: ComponentFixture<FormOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
