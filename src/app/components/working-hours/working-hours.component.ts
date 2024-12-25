import { Component, Inject, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(@Inject(HttpService) public dataService: HttpService, @Inject(AuthService) public authService: AuthService) { }

  ngOnInit(): void {
    this.dataSource = this.dataService.getDataODataDxDataSourceObj({ count: 10, entity: 'Shifts'});
    this.user = this.authService.getUserName();
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
