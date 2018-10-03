import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

import { TableSharedComponent } from '../table-shared/table-shared.component';
import { FetchStringInArraySharedPipe } from '../../pipes/fetch-string-in-array-shared.pipe';

describe('TableSharedComponent', () => {
  let component: TableSharedComponent;
  let fixture: ComponentFixture<TableSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TableModule, PaginatorModule],
      declarations: [TableSharedComponent, FetchStringInArraySharedPipe]
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
