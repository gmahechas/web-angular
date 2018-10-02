import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSharedComponent } from './table-shared.component';

describe('TableSharedComponent', () => {
  let component: TableSharedComponent;
  let fixture: ComponentFixture<TableSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
