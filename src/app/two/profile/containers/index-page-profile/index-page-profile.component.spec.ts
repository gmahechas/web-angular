import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageProfileComponent } from './index-page-profile.component';

describe('IndexPageProfileComponent', () => {
  let component: IndexPageProfileComponent;
  let fixture: ComponentFixture<IndexPageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
