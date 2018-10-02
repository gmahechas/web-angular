import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageProfileMenuComponent } from './index-page-profile-menu.component';

describe('IndexPageProfileMenuComponent', () => {
  let component: IndexPageProfileMenuComponent;
  let fixture: ComponentFixture<IndexPageProfileMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageProfileMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
