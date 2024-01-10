import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DataModel } from './data.model';
import { DataService } from './data.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let dataServiceMock: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
      providers: [{ provide: DataService, useValue: dataServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should update last10Items on update', () => {
    const mockData: DataModel[] = [
      // Your mock DataModel objects here
      {
        id: '1',
        int: 1,
        float: 1.0,
        color: '#ffffff',
        child: { id: 'child1', color: '#000000' },
      },
      // Add more DataModel objects as needed
    ];

    component.update(mockData);

    expect(component.last10Items).toEqual(mockData.slice(0, 10));
  });

  it('should update ids on updateIds', () => {
    const mockData: DataModel[] = [
      {
        id: '1',
        int: 1,
        float: 1.0,
        color: '#ffffff',
        child: { id: 'child1', color: '#000000' },
      },
      {
        id: '2',
        int: 2,
        float: 2.0,
        color: '#ffffff',
        child: { id: 'child2', color: '#000000' },
      },
      {
        id: '3',
        int: 3,
        float: 3.0,
        color: '#ffffff',
        child: { id: 'child3', color: '#000000' },
      },
    ];

    component.additionalIds = 'idA, idB, idC';

    const updatedData = component.updateIds(mockData);

    expect(updatedData[0].id).toBe('idA');
    expect(updatedData[1].id).toBe('idB');
    expect(updatedData[2].id).toBe('idC');
  });
});
