import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Cus_num } from '../../models/cus.num';
import { CustomerNumService } from '../../services/customers_num.service';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  customers: Cus_num[] = [];
  customerForm: FormGroup;
  selectedCustomer: Cus_num = new Cus_num();
  customersQuantity: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private customer1Service: CustomerNumService,
    private _builder: FormBuilder
  ) {this.customerForm = this._builder.group({}); }
  
  ngOnInit() {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.name = profile.user.name;
        this.username = profile.user.username;
        this.email = profile.user.email;
      },
      (err) => {

        return false;
      }
    );
  }

  onLogoutClick() {
    this.authService.logout();
    Swal.fire({
      title: '로그아웃 성공! ',
      icon: 'success',
      confirmButtonText: '확인',
    });
    this.router.navigate(['/login']);
    return false;
  }
  checkLoggedIn() {
    return this.authService.loggedIn();
  }

  _blankControls() {
    this.customerForm.get('name').reset();
    this.customerForm.get('birth').reset();
  }

  manageSubmit(values: Cus_num) {
    console.log(values._id);
    if (this.selectedCustomer._id === undefined) {
      this.customer1Service.addCustomerNum(values).subscribe((data) => {
        return this.customers.push(data);
      });
      this.customersQuantity = this.customersQuantity + 1;
      Swal.fire({
        title: '예약 성공! ',
        icon: 'success',
        confirmButtonText: '확인',
      });
    }
    this.selectedCustomer = new Cus_num();
    this._blankControls();
  }
}
