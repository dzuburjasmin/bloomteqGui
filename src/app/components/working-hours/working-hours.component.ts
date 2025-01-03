import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.css']
})
export class WorkingHoursComponent implements OnInit {
  dataSource: any;
  today: Date = new Date();
  user: string = "";
  constructor(private dataService: HttpService) { }

  ngOnInit(): void {
    this.dataSource = this.dataService.getOData({ count: 10, entity: 'Shifts'});
  }

  validateDate(e:any){
    if (e.data.Date)
      return true;
    else 
    return false;  
  }
   onRowInserted(e: any) {
    notify('ENTRY INSERTED!', 'success', 5000);
  }
  onRowRemoved(e: any) {
    notify('ENTRY DELETED!', 'error', 5000);
  }

  onRowUpdated(e: any) {
    notify('ENTRY SAVED!', 'info', 5000);
  }
}
