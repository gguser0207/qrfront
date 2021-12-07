import { Component } from '@angular/core';
import { Cus_num } from "../../models/cus.num"
import { CustomerNumService } from "../../services/customers_num.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-customer-num',
  templateUrl: './customer-num.component.html',
  styleUrls: ['./customer-num.component.scss']
})

export class CustomerNumComponent {

  
  customers: Cus_num[] = [];
  customerForm: FormGroup;
  selectedCustomer: Cus_num = new Cus_num();
  customersQuantity: number = 0;

  constructor(private customer1Service: CustomerNumService) {
    this.customer1Service.getCustomerNums().subscribe((data) => {
      this.customers = data;
      this.customersQuantity = data.length;
    });
  }

  
}
