import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index-page-user-office-project',
  templateUrl: './index-page-user-office-project.component.html',
  styles: []
})
export class IndexPageUserOfficeProjectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
  }

}
