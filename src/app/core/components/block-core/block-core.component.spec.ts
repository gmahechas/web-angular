import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCoreComponent } from './block-core.component';

describe('BlockCoreComponent', () => {
  let component: BlockCoreComponent;
  let fixture: ComponentFixture<BlockCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
