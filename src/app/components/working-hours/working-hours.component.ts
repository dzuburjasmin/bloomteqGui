import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.css']
})
export class WorkingHoursComponent implements OnInit {
  dataSource = [
    { ID: 1, Date: Date.now(), Description: "29", Hours: "8" },
    { ID: 2, Date: Date.now(), Description: "32", Hours: "7" },
    { ID: 3, Date: Date.now(), Description: "45", Hours: "6" }
  ];
  
  columns = ['Date', 'Hours', 'Description'];
  constructor() { }

  ngOnInit(): void {
  }

}
