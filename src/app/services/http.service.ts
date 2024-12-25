import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import ODataStore from 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';
import { AuthService } from './auth.service';
import { ODataConfig } from '../models/ODataConfig';
import { environment } from 'src/environments/environment';
import notify from 'devextreme/ui/notify';

const uri: string = environment.baseUrl;
@Injectable()
export class HttpService {
  constructor(@Inject(HttpClient) public httpClient: HttpClient, @Inject(AuthService) public authService: AuthService){}

  public getDataODataDxDataSourceObj(config: ODataConfig): DataSource {
    const url = uri + '/odata/' + config.entity;
    var token = this.authService.getToken();
    var authSer = this.authService;
    let store: ODataStore = new ODataStore({
      url: url,
      version: 4,
      key: config.keyDef ?? "Id",
      filterToLower: true,
      fieldTypes: config.fieldTypes ?? { Id: "Guid" },
      deserializeDates: config.deserializeDates,
      errorHandler: function (error: any) {
        console.log(error.message);
        if (error.httpStatus == 401) {
        notify("Unauthorized", "error", 5000);            
        authSer.logout();
        }
      },
      beforeSend: (req) => {
        req.headers = {
          ...req.headers,
          'Authorization': `Bearer ${token}`
        };
      },
    });


    return new DataSource({
      store: store,
      expand: config.expandDef?.length ? config.expandDef : '',  
      filter: config.filterDef?.length ? config.filterDef : '',
      group: config.groupDef?.length ? config.groupDef : '',
      pageSize: config.count,
      select: config.selectDef?.length ? config.selectDef : '',
      sort: config.sortDef?.length ? config.sortDef : '',
      paginate: true,
      map: config.mapFn
    });
  }
  
}
