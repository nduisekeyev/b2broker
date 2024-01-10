import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebWorkerService {
  private worker: Worker;
  private dataSubject = new Subject<any[]>();

  dataStream$: Observable<any[]> = this.dataSubject.asObservable();

  constructor() {
    this.worker = new Worker(new URL('./app.worker', import.meta.url));
    this.worker.onmessage = (event) => {
      this.dataSubject.next(event.data);
    };
  }

  startPseudoSocket(data: any) {
    this.worker.postMessage(data);
  }
}
