import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserButtonPipe } from './pipes/userbutton.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { environment } from 'src/environments/environment';
import { WorkingHoursComponent } from './components/working-hours/working-hours.component';
import { DxDataGridModule } from 'devextreme-angular';
import { HttpService } from './services/http.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    NotFoundComponent,
    UserButtonPipe,
    WorkingHoursComponent
  ],
  imports: [
    BrowserModule,
    DxDataGridModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    NoopAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.baseUrl],
        disallowedRoutes: []
      }
    })
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
