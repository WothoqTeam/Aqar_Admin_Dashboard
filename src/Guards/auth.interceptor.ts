import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinanceServiceService } from 'src/app/Aqar/financePage/services/finance-service.service';
import { ConsultantServiceService } from 'src/app/Aqar/consultantPage/services/consultant-service.service';
import { CompaniesService } from 'src/app/Aqar/financeCompanyPage/services/companies.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private myApi: FinanceServiceService,private consultant:ConsultantServiceService,private company:CompaniesService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('usertoken');

    if (token && request.url.includes(`${this.myApi.BaseURI}/admin/finance/get-all-applications`)||(`${this.myApi.BaseURI}/admin/finance/delete`)||
                                     (`${this.consultant.BaseURI}/admin/consultants/get-consultants`)||(`${this.company.BaseURI}/admin/companies/get-companies`)||(`http://aqar.wothoq.co/api/admin/aqar/get-all-aqars?aqar_type=0`)
                                     ||(`http://aqar.wothoq.co/api/admin/aqar/get-all-aqars?aqar_type=1`)||(`http://aqar.wothoq.co/api/admin/aqar/get-all-aqars?aqar_type=2`)||(`http://aqar.wothoq.co/api/admin/aqar/get-all-aqars?aqar_type=3`)) {
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer' + token)});
      return next.handle(request);
    }
    else{
    return next.handle(request);
  }
  }
}
