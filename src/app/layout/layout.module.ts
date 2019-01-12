import { MainService } from './../component/main/main.service';
import { TourDuThuyenService } from './../component/tour-du-thuyen/tour-du-thuyen.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import { FooterService } from './footer/footer.service';
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
import { ShowImageComponent } from '../component/details-du-thuyen/show-image/show-image.component';
import { ActiveAccountComponent } from '../component/active-account/active-account.component';
import { ThousandNumberFormatter } from '../pipe/thousand-number-formatter.pipe';
import { DetailsDuThuyenService } from '../component/details-du-thuyen/details-du-thuyen.service';
import { ShowImageComponentComponent } from '../component/details-du-thuyen/show-image-component/show-image-component.component';
import { TinMoiComponent } from '../component/tin-tuc/tin-moi/tin-moi.component';
import { XemTinComponent } from '../component/tin-tuc/xem-tin/xem-tin.component';
import { TheComponent } from '../component/the/the.component';
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
        { path: '', component: MainComponent },
        { path: 'trang-chu', component: MainComponent },
        { path: 'tour', component: TourDuThuyenComponent },
        { path: 'du-thuyen', component: TourDuThuyenComponent },
        { path: 'details', component: DetailsDuThuyenComponent },
        { path: 'account/activate', component: ActiveAccountComponent},
        { path: 'book/information', component: InformationComponent},
        { path: 'book/verify-information', component: VerifyInformationComponent},
        { path: 'book/confirm-information', component: BookSuccessComponent},
        { path: 'user', component: UserComponent},
        { path: 'tin-tuc/tin-moi', component: TinMoiComponent},
        { path: 'tin-tuc/tin-khuyen-mai', component: TinMoiComponent},
        { path: 'tin-tuc/xem-tin', component: XemTinComponent},
        { path: 'the', component: TheComponent},
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
    UserComponent,
    ShowImageComponent,
    ActiveAccountComponent,
    ThousandNumberFormatter,
    ShowImageComponentComponent,
    TinMoiComponent,
    XemTinComponent,
    TheComponent
  ],
  providers: [
    CommonHttpService,
    LoginService,
    HttpClientCustom,
    DownloadHelperService,
    UploadFileService,
    CookieService,
    CommonService,
    TourDuThuyenService,
    DetailsDuThuyenService,
    HeaderService,
    FooterService,
    MainService
  ]
})
export class LayoutModule { }
