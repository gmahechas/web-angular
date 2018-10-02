import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageEstateComponent } from './form-page-estate.component';

describe('FormPageEstateComponent', () => {
  let component: FormPageEstateComponent;
  let fixture: ComponentFixture<FormPageEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPageEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
