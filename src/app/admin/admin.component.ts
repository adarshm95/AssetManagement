import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title= 'ADMIN';

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {

  }
  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');
  }

}
