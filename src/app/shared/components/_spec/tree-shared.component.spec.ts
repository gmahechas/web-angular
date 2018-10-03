import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeModule } from 'primeng/tree';

import { TreeSharedComponent } from '../tree-shared/tree-shared.component';

describe('TreeSharedComponent', () => {
  let component: TreeSharedComponent;
  let fixture: ComponentFixture<TreeSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule],
      declarations: [TreeSharedComponent]
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
