import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { ConcreteDataFactory, DataFactory } from './data.factory';
import { DataModel } from './data.model';
import { WebWorkerService } from './web-worker.service';

@Injectable({
  providedIn: 'root',
})
// Observer Design pattern
export class DataService implements OnDestroy {
  private dataSubject = new BehaviorSubject<DataModel[]>([]);
  private dataFactory: DataFactory = new ConcreteDataFactory();
  dataStream = this.dataSubject.asObservable();
  timerSubscription: Subscription | undefined;
  dataUpdates: DataModel[] = [];

  constructor(private webWorkerService: WebWorkerService) {}

  addObserver(observer: any) {
    this.dataStream.subscribe(observer.update.bind(observer));
  }

  startPseudoSocket(intervalMs: number, dataSize: number) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(intervalMs).subscribe(() => {
      const newData = this.generateRandomData(dataSize);
      this.dataSubject.next(newData);
      this.dataUpdates = newData; // Update dataUpdates property
      this.webWorkerService.startPseudoSocket(newData); // Pass data to the web worker
    });
  }

  stopPseudoSocket() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.dataUpdates = [];
    }
  }

  ngOnDestroy() {
    // Unsubscribe from time subscription when the service is destroyed
    this.stopPseudoSocket();
  }

  private generateRandomData(size: number): DataModel[] {
    const data = [];
    for (let i = 0; i < size; i++) {
      data.push(this.dataFactory.createDataItem());
    }
    return data;
  }
}
