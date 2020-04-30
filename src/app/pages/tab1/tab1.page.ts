import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BluetoothService } from '@services/bluetooth/bluetooth.service';
import { CustomerService } from '@services/customer/customer.service';
import { BluetoothDevice } from '@interfaces/bluetoothDevice';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  public bluetoothList: BluetoothDevice[];
  public bluetoothSupport: boolean;
  public connectedDevice: BluetoothDevice;

  private readonly subscription = new Subscription();
  constructor(
    private readonly bluetoothService: BluetoothService,
    private readonly customerService: CustomerService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.bluetoothList = [];

    this.subscription.add(
      this.customerService.isCordovaAvailable.subscribe(status => {
        this.bluetoothSupport = status;
        if (status) {
          this.listBluetoothDevices();
        }
      })
    );
  }

  private listBluetoothDevices(): void {
    this.bluetoothService.searchBluetoothPrinter().then(resp => {
      if (resp) {
        this.bluetoothList = resp;
      }
    });
  }

  public selectPrinter(deviceData): void {
    this.subscription.add(
      this.bluetoothService
        .connectToBluetoothDevice(deviceData.id)
        .subscribe(res => {
          if (res === 'OK' || res === 'Ok') {
            this.connectedDevice = deviceData;
          }
        })
    );
  }

  public sendData(): void {
    if (this.connectedDevice) {
      this.bluetoothService.sendDataToConnectedDevice();
    }
  }

  public disconnect(): void {
    this.connectedDevice = null;
    this.bluetoothService.disconnectBluetoothDevice();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
