import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCoreComponent } from './sidebar-core.component';

describe('SidebarCoreComponent', () => {
  let component: SidebarCoreComponent;
  let fixture: ComponentFixture<SidebarCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
