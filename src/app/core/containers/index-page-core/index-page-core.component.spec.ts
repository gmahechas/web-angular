import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageCoreComponent } from './index-page-core.component';

describe('IndexPageCoreComponent', () => {
  let component: IndexPageCoreComponent;
  let fixture: ComponentFixture<IndexPageCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
