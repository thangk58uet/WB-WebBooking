import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { MainComponent } from '../component/main/main.component';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxLookupModule,
  DxPopupModule, DxSelectBoxModule, DxTemplateModule, DevExtremeModule } from 'devextreme-angular';
// export const layoutRoutes: Routes = [
//   { path: '', component: LayoutComponent, children: [
//     { path: 'main', component: MainComponent },
//     { path: 'test', component: TestComponent },
//     { path: 'login', component: LoginComponent }
//     ]
//   }

//   //{ path: 'operation', loadChildren: 'app/operating-status/operating-status.module#OperatingStatusModule', data: { preload: true }},
// ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: MainLayoutComponent,
      children: [
        // {path: 'dashboard', loadChildren: '../../component/user/dashboard/dashboard.module#DashboardModule'},
        { path: 'main', component: MainComponent },
        // { path: 'test', component: TestComponent },
        { path: 'login', component: LoginComponent }
      ]
    }]),
    DxSelectBoxModule,
    DxDateBoxModule,
    DxPopupModule,
    DxTemplateModule,
    DxLookupModule,
    DevExtremeModule,
  ],
  declarations: [
    HeaderComponent,
    MainLayoutComponent,
    FooterComponent,
    LoginComponent,
    MainComponent
  ]
})
export class LayoutModule { }
