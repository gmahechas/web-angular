import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPageProjectComponent } from './dropdown-page-project.component';

describe('DropdownPageProjectComponent', () => {
  let component: DropdownPageProjectComponent;
  let fixture: ComponentFixture<DropdownPageProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPageProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPageProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
