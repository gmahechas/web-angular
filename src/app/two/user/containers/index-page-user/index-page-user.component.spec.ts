import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageUserComponent } from './index-page-user.component';

describe('IndexPageUserComponent', () => {
  let component: IndexPageUserComponent;
  let fixture: ComponentFixture<IndexPageUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
