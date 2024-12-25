import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: string = "";
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserName();
  }

  onLogout(){
      this.authService.logout();
  }

}
