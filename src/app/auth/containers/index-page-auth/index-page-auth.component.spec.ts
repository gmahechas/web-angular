import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageAuthComponent } from './index-page-auth.component';

describe('IndexPageAuthComponent', () => {
  let component: IndexPageAuthComponent;
  let fixture: ComponentFixture<IndexPageAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
