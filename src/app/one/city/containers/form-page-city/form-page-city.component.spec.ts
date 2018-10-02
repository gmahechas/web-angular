import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageCityComponent } from './form-page-city.component';

describe('FormPageCityComponent', () => {
  let component: FormPageCityComponent;
  let fixture: ComponentFixture<FormPageCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPageCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
