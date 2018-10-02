import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPageProfileComponent } from './dropdown-page-profile.component';

describe('DropdownPageProfileComponent', () => {
  let component: DropdownPageProfileComponent;
  let fixture: ComponentFixture<DropdownPageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
