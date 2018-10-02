import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSharedComponent } from './tree-shared.component';

describe('TreeSharedComponent', () => {
  let component: TreeSharedComponent;
  let fixture: ComponentFixture<TreeSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
