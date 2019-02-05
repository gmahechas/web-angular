import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';

@Component({
  selector: 'app-index-page-core',
  templateUrl: './index-page-core.component.html',
  styles: []
})
export class IndexPageCoreComponent implements OnInit {

  blockedDocument$ = this.store.pipe(select(fromCore.getBlockedDocument));
  showSpinner$ = this.store.pipe(select(fromCore.getShowSpinner));
  progressBar$ = this.store.pipe(select(fromCore.getProgressBar));

  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit() {
  }

}
