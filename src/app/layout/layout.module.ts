import { TourDuThuyenService } from './../component/tour-du-thuyen/tour-du-thuyen.service';
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
import { TourDuThuyenComponent } from '../component/tour-du-thuyen/tour-du-thuyen.component';
import { DetailsDuThuyenComponent } from '../component/details-du-thuyen/details-du-thuyen.component';
import { CommonHttpService } from '../service/common.http.service';
import { LoginService } from '../component/login/login.service';
import { HttpClientCustom } from '../service/httpclient.service';
import { DownloadHelperService } from '../service/downloadHelper';
import { UploadFileService } from '../service/upload-file.service';
import { CookieService } from 'ngx-cookie-service';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { RegisterComponent } from '../component/register/register.component';
import { VerifyEmailComponent } from '../component/register/verify-email/verify-email.component';
import { InformationComponent } from '../component/book-du-thuyen/information/information.component';
import { VerifyInformationComponent } from '../component/book-du-thuyen/verify-information/verify-information.component';
import { BookSuccessComponent } from './../component/book-du-thuyen/book-success/book-success.component';
import { UserComponent } from '../component/user/user.component';
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
    FormsModule,
    RouterModule.forChild([{
      path: '',
      component: MainLayoutComponent,
      children: [
        // {path: 'dashboard', loadChildren: '../../component/user/dashboard/dashboard.module#DashboardModule'},
        { path: 'main', component: MainComponent },
        { path: 'login', component: LoginComponent },
        { path: 'tour', component: TourDuThuyenComponent },
        { path: 'details', component: DetailsDuThuyenComponent },
        { path: 'account/active', component: DetailsDuThuyenComponent},
        { path: 'book/information', component: InformationComponent},
        { path: 'book/verify-information', component: VerifyInformationComponent},
        { path: 'book/confirm-information', component: BookSuccessComponent},
        { path: 'user', component: UserComponent},
      ]
    }]),
    DxSelectBoxModule,
    DxDateBoxModule,
    DxPopupModule,
    DxTemplateModule,
    DxLookupModule,
    DevExtremeModule
  ],
  declarations: [
    HeaderComponent,
    MainLayoutComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    TourDuThuyenComponent,
    DetailsDuThuyenComponent,
    PaginationComponent,
    RegisterComponent,
    VerifyEmailComponent,
    InformationComponent,
    VerifyInformationComponent,
    BookSuccessComponent,
    UserComponent
  ],
  providers: [
    CommonHttpService,
    LoginService,
    HttpClientCustom,
    DownloadHelperService,
    UploadFileService,
    CookieService,
    CommonService,
    TourDuThuyenService
  ]
})
export class LayoutModule { }
