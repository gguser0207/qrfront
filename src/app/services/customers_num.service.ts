import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cus_num } from "../models/cus.num";
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

//대기 순번
@Injectable({
  providedIn: 'root',
})
export class CustomerNumService {
  prepEndpoint(ep) {
    // 1. localhost에 포팅시
     return 'http://localhost:3000/' + ep;

    // 2. Heroku 클라우드 서버에 포팅시
    // return ep;
  }

  API_URL: string = this.prepEndpoint('cusnum/cus_nums/');

  constructor(private http: HttpClient) {}

  getCustomerNums() {
    return this.http.get<Cus_num[]>(this.API_URL, httpOptions);
  }

  getCustomerNum(id: string) {
    return this.http.get<Cus_num>(this.API_URL + `${id}`, httpOptions);
  }

  addCustomerNum(Cus_num: Cus_num): Observable<any> {
    return this.http.post<Cus_num>(this.API_URL, Cus_num, httpOptions);
  }

  editCustomerNum(id: string, Cus_num: Cus_num) {
    return this.http
      .put<Cus_num>(this.API_URL + `${id}`, Cus_num, httpOptions)
      .subscribe();
  }

  deleteCustomerNum(id: string) {
    return this.http
      .delete<Cus_num>(this.API_URL + `${id}`, httpOptions)
      .subscribe();
  }
}
