import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPageOfficeComponent } from './dropdown-page-office.component';

describe('DropdownPageOfficeComponent', () => {
  let component: DropdownPageOfficeComponent;
  let fixture: ComponentFixture<DropdownPageOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPageOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPageOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
