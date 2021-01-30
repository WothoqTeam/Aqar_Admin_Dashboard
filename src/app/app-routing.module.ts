import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantuserComponent } from './Aqar/consultantPage/components/consultantuser/consultantuser.component';
import { FinanceCompanyComponent } from './Aqar/financeCompanyPage/component/finance-company/finance-company.component';
import { FinancecompanyComponent } from './Aqar/financePage/component/financecompany/financecompany.component';
import { HomePageComponent } from './Aqar/homePage/components/home-page/home-page.component';
import { LogiinComponent } from './Aqar/loginPage/components/logiin/logiin.component';
import { OfferComponentComponent } from './Aqar/offersPage/component/offer-component/offer-component.component';
import { SupportComponent } from './Aqar/supportPage/component/support/support.component';
import { AppSettingComponent } from './Aqar/appSetting/component/app-setting/app-setting.component';
import { AppSocialComponent } from './Aqar/appSocial/component/app-social/app-social.component';
import { RateConsultantComponent } from './Aqar/Rates/component/rate-consultant/rate-consultant.component';
import { AllUserComponent } from './Aqar/usersPage/component/all-user/all-user.component';
import { MaintenanceComponent } from './Aqar/maintenancePage/component/maintenance/maintenance.component';
import { AqarReportComponent } from './Aqar/aqarReportPage/component/aqar-report/aqar-report.component';
import { ContractorComponent } from './Aqar/contractorPage/component/contractor/contractor.component';
import { AqarComponent } from './Aqar/aqarPage/component/aqar/aqar.component';
import { CitiesComponent } from './Aqar/city/component/cities/cities.component';
import { DistrictComponent } from './Aqar/district/component/district/district.component';

const routes: Routes = [
 {path:'', component:LogiinComponent},
 {
   path:'aqar/Dashboard',component:HomePageComponent
 },
 {
   path:'aqar/finance',component:FinancecompanyComponent
 }
 ,
 {
   path:'aqar/consultant',component:ConsultantuserComponent
 },
 {
   path:'aqar/financecompany',component:FinanceCompanyComponent
 },
 {
   path:'aqar/aqars',component:AqarComponent
 }
 ,
 {
  path:'aqar/offers',component:OfferComponentComponent
}
 ,
 {
  path:'aqar/contractor',component:ContractorComponent
}

,
{
  path:'aqar/supportClient',component:SupportComponent
}
,
{
  path:'aqar/appSetting',component:AppSettingComponent
}
,
{
  path:'aqar/AppSocial',component:AppSocialComponent
}
,
{
  path: 'aqar/consultantRates', component: RateConsultantComponent
}
,
{
  path: 'aqar/User', component: AllUserComponent
}
,
{
  path: 'aqar/Cities', component: CitiesComponent
}
,
{
  path: 'aqar/district', component: DistrictComponent
}

,
{
  path: 'aqar/requestmaintenance', component: MaintenanceComponent
}
,
{
  path: 'aqar/aqarReport', component: AqarReportComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash:true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
