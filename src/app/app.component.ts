import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    // setTimeout(() => {
    //   if (sessionStorage.getItem('currentUrl')) {
    //     if (sessionStorage.getItem('currentUrl') === '/') {
    //       this.router.navigate(['/trang-chu']);
    //       return;
    //     } else {
    //       this.router.navigateByUrl(sessionStorage.getItem('currentUrl'));
    //     }
    //   } else { this.router.navigate(['/trang-chu']); }
    // }, 1000);
  }
}
