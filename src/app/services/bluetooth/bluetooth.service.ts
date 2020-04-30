import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { CustomerService } from '@services/customer/customer.service';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {
  constructor(
    private readonly btSerial: BluetoothSerial,
    private readonly alertCtrl: AlertController,
    private readonly customerService: CustomerService
  ) {
    this.customerService.isCordovaAvailable.subscribe(status => {
      if (status) {
        this.checkBluetoothEnabled();
      }
    });
  }

  private checkBluetoothEnabled(): void {
    this.btSerial.isEnabled().then(
      () => {
        this.presentAlert('success', 'Bluetooth is enabled');
      },
      () => {
        this.presentAlert(
          'Error',
          'Bluetooth is not enabled trying to enable it'
        );

        this.btSerial.enable().then(
          () => {
            this.presentAlert('success', 'Hurray!! Bluetooth is enabled');
          },
          () => {
            this.presentAlert(
              'error',
              'You still not enabled the bluetooth, please enable it'
            );
          }
        );
      }
    );
  }

  public searchBluetoothPrinter() {
    return this.btSerial.list();
  }

  public connectToBluetoothDevice(macAddress) {
    return this.btSerial.connect(macAddress);
  }

  public disconnectBluetoothDevice() {
    return this.btSerial.disconnect();
  }

  public sendDataToConnectedDevice() {
    this.btSerial.write('hello world').then(
      () => {
        this.presentAlert('success', 'Data send to connected device');
      },
      () => {
        this.presentAlert('error', 'Something went wrong!');
      }
    );
  }

  async presentAlert(status, msg) {
    const alert = await this.alertCtrl.create({
      header: status === 'success' ? 'Success' : 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
