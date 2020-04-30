import { TestBed } from '@angular/core/testing';

import { BluetoothService } from './bluetooth.service';

describe('PrintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BluetoothService = TestBed.get(BluetoothService);
    expect(service).toBeTruthy();
  });
});
