import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

import { FetchStringInArraySharedPipe } from '../../pipes/fetch-string-in-array-shared.pipe';
import { DropdownSharedComponent } from '../dropdown-shared/dropdown-shared.component';

describe('DropdownSharedComponent', () => {
  let component: DropdownSharedComponent;
  let fixture: ComponentFixture<DropdownSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DropdownModule],
      declarations: [FetchStringInArraySharedPipe, DropdownSharedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
