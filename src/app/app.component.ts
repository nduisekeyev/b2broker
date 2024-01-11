import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataModel } from './data.model';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  last10Items: DataModel[] = [];
  timerInterval = 1000;
  dataArraySize = 10;
  additionalIds: string = '';
  isLoading: boolean = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.dataService) {
      this.dataService.addObserver(this);
      this.dataService.startPseudoSocket(
        this.timerInterval,
        this.dataArraySize
      );
    }
  }

  update(data: DataModel[]) {
    const updatedData = this.updateIds(data);
    this.last10Items = updatedData;
    // Check if data is not empty
    if (updatedData.length > 0) {
      this.isLoading = false; // Set isLoading to false when data is available
    }
  }

  updateIds(data: DataModel[]): DataModel[] {
    const ids = this.additionalIds.split(',').map((id) => id.trim());

    for (let i = 0; i < Math.min(ids.length, data.length); i++) {
      data[i].id = ids[i];
    }

    return data;
  }

  startPseudoSocket() {
    this.loadData();
  }

  getColorName(color: string): string {
    const colorMap: { [key: string]: string } = {
      '#ff0000': 'red',
      '#00ff00': 'green',
      '#800080': 'purple',
      '#0000ff': 'blue',
      '#ffff00': 'yellow',
    };

    return colorMap[color] || 'Unknown';
  }
}
