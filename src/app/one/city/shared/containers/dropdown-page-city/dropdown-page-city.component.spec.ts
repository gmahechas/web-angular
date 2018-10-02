import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPageCityComponent } from './dropdown-page-city.component';

describe('DropdownPageCityComponent', () => {
  let component: DropdownPageCityComponent;
  let fixture: ComponentFixture<DropdownPageCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPageCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPageCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
