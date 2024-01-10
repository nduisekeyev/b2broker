import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { DataModel } from './data.model';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });
  afterEach(() => {
    // Unsubscribe from the observer in each test case
    service.stopPseudoSocket();
  });

  it('should create data service', () => {
    expect(service).toBeTruthy();
  });

  it('should start pseudo-socket and emit data updates', (done) => {
    const intervalMs = 100;
    const dataSize = 3;

    // Use take(2) to ensure the test completes after two emissions
    service.startPseudoSocket(intervalMs, dataSize);
    service.dataStream.pipe(take(2)).subscribe((data) => {
      if (Object.keys(data).length === dataSize) {
        expect(data.every((item) => item instanceof DataModel)).toBeTruthy();
        done();
      }
    });
  });

  it('should add observer and receive data updates', fakeAsync(() => {
    let dataReceived = false;

    const observer = {
      update: (data: DataModel[]) => {
        if (Object.keys(data).length > 0) {
          dataReceived = true;
        }
      },
    };

    service.addObserver(observer);
    service.startPseudoSocket(10, 5); // 10ms timer and 5 items

    // Simulate the passage of time with tick
    tick(100); // Adjust the time as needed

    // Check if data has been received
    service.stopPseudoSocket();
    expect(dataReceived).toBe(true);
  }));
  it('should stop emitting data updates after unsubscribing observer', fakeAsync(() => {
    const observer = {
      update: (data: DataModel[]) => {},
    };

    service.addObserver(observer);
    service.startPseudoSocket(10, 1); // Start the pseudo-socket

    // Use fakeAsync and tick to simulate the passage of time
    tick(200);
    service.stopPseudoSocket();

    // Advance the fakeAsync zone to make sure the timer is cleared
    tick();

    expect(service.dataUpdates).toEqual([]);
  }));
});
