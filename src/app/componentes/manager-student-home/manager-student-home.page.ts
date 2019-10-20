import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
@Component({
  selector: 'app-manager-student-home',
  templateUrl: './manager-student-home.page.html',
  styleUrls: ['./manager-student-home.page.scss'],
})
export class ManagerStudentHomePage implements OnInit {
  
  constructor(public authService: AuthService) {}

  ngOnInit() {
  }
  
  onLogout(){
    this.authService.logout();
  }
}
