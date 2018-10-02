import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageProfileComponent } from './form-page-profile.component';

describe('FormPageProfileComponent', () => {
  let component: FormPageProfileComponent;
  let fixture: ComponentFixture<FormPageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
