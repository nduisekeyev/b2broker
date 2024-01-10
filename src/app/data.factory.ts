import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ChildModel, DataModel } from './data.model';

export interface DataFactory {
  createDataItem(): DataModel;
}

@Injectable({
  providedIn: 'root',
})
// Factory method design pattern
export class ConcreteDataFactory implements DataFactory {
  createDataItem(): DataModel {
    // Implement the logic to create a data item
    const dataItem = new DataModel();
    dataItem.id = this.generateUniqueId();
    dataItem.int = Math.floor(Math.random() * 100);
    dataItem.float = this.generateRandomFloat();
    dataItem.color = this.generateRandomColor();
    dataItem.child = new ChildModel();
    dataItem.child.id = this.generateUniqueId();
    dataItem.child.color = this.generateRandomColor();
    return dataItem;
  }

  private generateUniqueId(): string {
    return uuidv4().slice(-12); //  Get only the first 12 symbols of a unique ID
  }

  private generateRandomFloat(): number {
    // Generate a random float with 18 decimal places
    return parseFloat((Math.random() * 10 ** 18).toFixed(18));
  }

  private generateRandomColor(): string {
    const colors = ['#ff0000', '#00ff00', '#800080', '#0000ff', '#ffff00'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
}
