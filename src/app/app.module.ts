import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogiinComponent } from './Aqar/loginPage/components/logiin/logiin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SideComponent } from './shared/side/side.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomePageComponent } from './Aqar/homePage/components/home-page/home-page.component';
import { FinancecompanyComponent } from './Aqar/financePage/component/financecompany/financecompany.component';
import { AuthInterceptor } from 'src/Guards/auth.interceptor';
import { ViewDetailsComponent } from './Aqar/financePage/component/view-details/view-details.component';
import { ConsultantuserComponent } from './Aqar/consultantPage/components/consultantuser/consultantuser.component';
import { FinanceCompanyComponent } from './Aqar/financeCompanyPage/component/finance-company/finance-company.component';
import { EditCompanyComponent } from './Aqar/financeCompanyPage/component/edit-company/edit-company.component';
import { OfferComponentComponent } from './Aqar/offersPage/component/offer-component/offer-component.component';
import { EditOffersComponent } from './Aqar/offersPage/component/edit-offers/edit-offers.component';
import { SupportComponent } from './Aqar/supportPage/component/support/support.component';
import { EditConsultantComponent } from './Aqar/consultantPage/components/edit-consultant/edit-consultant.component';
import { DetailsConsultantComponent } from './Aqar/consultantPage/components/details-consultant/details-consultant.component';
import { EditFinanceAppComponent } from './Aqar/financePage/component/edit-finance-app/edit-finance-app.component';
import { AppSettingComponent } from './Aqar/appSetting/component/app-setting/app-setting.component';
import { EditAppSettingComponent } from './Aqar/appSetting/component/edit-app-setting/edit-app-setting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSocialComponent } from './Aqar/appSocial/component/app-social/app-social.component';
import { EditAppSocialComponent } from './Aqar/appSocial/component/edit-app-social/edit-app-social.component';
import { RateConsultantComponent } from './Aqar/Rates/component/rate-consultant/rate-consultant.component';
import { ViewDetailRatesComponent } from './Aqar/Rates/component/view-detail-rates/view-detail-rates.component';
import { AllUserComponent } from './Aqar/usersPage/component/all-user/all-user.component';
import { EditUserComponent } from './Aqar/usersPage/component/edit-user/edit-user.component';
import { MaintenanceComponent } from './Aqar/maintenancePage/component/maintenance/maintenance.component';
import { EditMaintenanceComponent } from './Aqar/maintenancePage/component/edit-maintenance/edit-maintenance.component';
import { ChangeStatusComponent } from './Aqar/usersPage/component/change-status/change-status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AqarReportComponent } from './Aqar/aqarReportPage/component/aqar-report/aqar-report.component';
import { EditReportComponent } from './Aqar/aqarReportPage/component/edit-report/edit-report.component';
import { DetailsReportComponent } from './Aqar/aqarReportPage/component/details-report/details-report.component';
import { ViewDetailsAqarComponent } from './Aqar/aqarReportPage/component/view-details-aqar/view-details-aqar.component';
import { EditAqarComponent } from './Aqar/aqarReportPage/component/edit-aqar/edit-aqar.component';
import { ContractorComponent } from './Aqar/contractorPage/component/contractor/contractor.component';
import { EditContractorComponent } from './Aqar/contractorPage/component/edit-contractor/edit-contractor.component';
import { AqarComponent } from './Aqar/aqarPage/component/aqar/aqar.component';
import { DetailsLandComponent } from './Aqar/aqarPage/component/details-land/details-land.component';
import { DetailsFlatComponent } from './Aqar/aqarPage/component/details-flat/details-flat.component';
import { DetailsVillaComponent } from './Aqar/aqarPage/component/details-villa/details-villa.component';
import { DetailsBuildComponent } from './Aqar/aqarPage/component/details-build/details-build.component';
import { CitiesComponent } from './Aqar/city/component/cities/cities.component';
import { EditCityComponent } from './Aqar/city/component/edit-city/edit-city.component';
import { DistrictComponent } from './Aqar/district/component/district/district.component';
import { EditDistrictComponent } from './Aqar/district/component/edit-district/edit-district.component';
import { EditVillaComponent } from './Aqar/aqarPage/component/edit-villa/edit-villa.component';
import { EditFlatComponent } from './Aqar/aqarPage/component/edit-flat/edit-flat.component';
import { EditBuildComponent } from './Aqar/aqarPage/component/edit-build/edit-build.component';
import { EditLandComponent } from './Aqar/aqarPage/component/edit-land/edit-land.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LogiinComponent,
    HeaderComponent,
    SideComponent,
    FinancecompanyComponent,
    ViewDetailsComponent,
    ConsultantuserComponent,
    FinanceCompanyComponent,
    EditCompanyComponent,
    OfferComponentComponent,
    EditOffersComponent,
    SupportComponent,
    EditConsultantComponent,
    DetailsConsultantComponent,
    EditFinanceAppComponent,
    AppSettingComponent,
    EditAppSettingComponent,
    AppSocialComponent,
    EditAppSocialComponent,
    RateConsultantComponent,
    ViewDetailRatesComponent,
    AllUserComponent,
    EditUserComponent,
    MaintenanceComponent,
    EditMaintenanceComponent,
    ChangeStatusComponent,
    AqarReportComponent,
    EditReportComponent,
    DetailsReportComponent,
    ViewDetailsAqarComponent,
    EditAqarComponent,
    ContractorComponent,
    EditContractorComponent,
    AqarComponent,
    DetailsLandComponent,
    DetailsFlatComponent,
    DetailsVillaComponent,
    DetailsBuildComponent,
    CitiesComponent,
    EditCityComponent,
    DistrictComponent,
    EditDistrictComponent,
    EditVillaComponent,
    EditFlatComponent,
    EditBuildComponent,
    EditLandComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
