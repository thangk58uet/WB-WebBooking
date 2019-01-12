import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { StaticPageService } from './static-page.service';
// import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  encapsulation: ViewEncapsulation.None
})
export class StaticPageComponent implements OnInit {

  public objContent;
  private link;

  constructor(
    private router: ActivatedRoute,
    public staticPageService: StaticPageService
  ) {
    this.router.params.subscribe(params => {
      console.log(params);
      this.link = params['link'];
    });
  }

  ngOnInit() {
    this.getStaticPage(this.link);
  }

  getStaticPage(link) {
    this.staticPageService.getStaticPage(link).subscribe(res => {
      if (res && res['value']) {
          this.objContent = res['value'];
      }
    });

  }

}
