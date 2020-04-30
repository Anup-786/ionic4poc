import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from '@interfaces/customer';
import { CustomerService } from '@services/customer/customer.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public customers: Customer[];
  constructor(private readonly customerService: CustomerService) {}

  ngOnInit() {
    this.customers = [];
    this.getCustomerList();
  }

  private getCustomerList(): void {
    this.subscription.add(
      this.customerService.customerList.subscribe(res => {
        if (res) {
          const result = JSON.parse(JSON.stringify(res));
          this.customers = [...result.data];
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
