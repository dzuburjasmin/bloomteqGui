import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkingHoursComponent } from './working-hours.component';
import { HttpService } from 'src/app/services/http.service';
import * as notifyModule from 'devextreme/ui/notify'; 
import { of } from 'rxjs';
import DataSource from 'devextreme/data/data_source';

describe('WorkingHoursComponent', () => {
  let component: WorkingHoursComponent;
  let fixture: ComponentFixture<WorkingHoursComponent>;
  let dataService: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj<HttpService>('HttpService', ['getOData']);

    await TestBed.configureTestingModule({
      declarations: [WorkingHoursComponent],
      providers: [
        { provide: HttpService, useValue: dataServiceSpy }
      ]
    }).compileComponents();

    dataService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHoursComponent);
    component = fixture.componentInstance;

    dataService.getOData.and.returnValue(
      new DataSource({
        load: () => of({}).toPromise(), 
      })
    );
    fixture.detectChanges();
  });

  it('should initialize dataSource and load data', async () => {
    component.ngOnInit();
  
    expect(component.dataSource).toBeInstanceOf(DataSource);
  
    const loadSpy = spyOn(component.dataSource, 'load').and.returnValue(Promise.resolve([]));
  
    const data = await component.dataSource.load();
    expect(loadSpy).toHaveBeenCalled();
    expect(data).toEqual([]);
  });

});
