import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PanelModule } from 'primeng/panel';

import { PanelSharedComponent } from '../panel-shared/panel-shared.component';

describe('PanelSharedComponent', () => {
  let component: PanelSharedComponent;
  let fixture: ComponentFixture<PanelSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, PanelModule],
      declarations: [PanelSharedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
