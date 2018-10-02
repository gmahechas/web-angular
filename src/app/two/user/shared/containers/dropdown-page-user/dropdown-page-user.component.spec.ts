import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPageUserComponent } from './dropdown-page-user.component';

describe('DropdownPageUserComponent', () => {
  let component: DropdownPageUserComponent;
  let fixture: ComponentFixture<DropdownPageUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPageUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
