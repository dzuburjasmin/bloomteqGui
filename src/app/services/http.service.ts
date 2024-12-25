import { Injectable } from '@angular/core';
import ODataStore from 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';
import { AuthService } from './auth.service';
import { ODataConfig } from '../models/ODataConfig';
import { environment } from 'src/environments/environment';
import notify from 'devextreme/ui/notify';

const uri: string = environment.baseUrl;
@Injectable()
export class HttpService {
  constructor(private authService: AuthService){}

  public getOData(config: ODataConfig): DataSource {
    const url = uri + '/odata/' + config.entity;
    var authSer = this.authService;
    let store: ODataStore = new ODataStore({
      url: url,
      version: 4,
      key: "Id",
      filterToLower: true,
      fieldTypes: { Id: "Guid" },
      errorHandler: function (error: any) {
        console.log(error.message);
        if (error.httpStatus == 401) {
        notify(error.message, "error", 5000);            
        authSer.logout();
        }
      },
      beforeSend: (req) => {
        req.headers = {
          ...req.headers,
          'Authorization': `Bearer ${this.authService.getToken()}`
        };
      },
    });


    return new DataSource({
      store: store,
      pageSize: config.count,
    });
  }
  
}
