import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCoreComponent } from './header-core.component';

describe('HeaderCoreComponent', () => {
  let component: HeaderCoreComponent;
  let fixture: ComponentFixture<HeaderCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
