import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageProjectComponent } from './form-page-project.component';

describe('FormPageProjectComponent', () => {
  let component: FormPageProjectComponent;
  let fixture: ComponentFixture<FormPageProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPageProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
