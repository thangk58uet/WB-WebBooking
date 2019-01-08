import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        sessionStorage.setItem('currentUrl', e.url);
      }
    });
    setTimeout(() => {
      if (sessionStorage.getItem('currentUrl')) {
        if (sessionStorage.getItem('currentUrl') === '/' || sessionStorage.getItem('currentUrl') === '/wb') {
          this.router.navigateByUrl('/wb/main');
          return;
        }
        this.router.navigateByUrl(sessionStorage.getItem('currentUrl'));
      } else { this.router.navigateByUrl('/wb/main'); }
    }, 1000);
  }
}
