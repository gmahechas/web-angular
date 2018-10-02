import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageEstateComponent } from './index-page-estate.component';

describe('IndexPageEstateComponent', () => {
  let component: IndexPageEstateComponent;
  let fixture: ComponentFixture<IndexPageEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
