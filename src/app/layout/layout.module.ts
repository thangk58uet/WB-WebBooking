import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: MainLayoutComponent,
      children: [
        // {path: 'dashboard', loadChildren: '../../component/user/dashboard/dashboard.module#DashboardModule'},
        {path: '', component: LoginComponent}
      ]
    }])
  ],
  declarations: [
    HeaderComponent,
    MainLayoutComponent,
    FooterComponent,
    LoginComponent
  ]
})
export class LayoutModule { }
