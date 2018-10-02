import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageUserComponent } from './form-page-user.component';

describe('FormPageUserComponent', () => {
  let component: FormPageUserComponent;
  let fixture: ComponentFixture<FormPageUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPageUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
