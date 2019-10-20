import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TeacherHomePage } from '../../componentes/teacher-home/teacher-home.page';


@Component({
  selector: 'app-teacher-groups',
  templateUrl: './teacher-groups.page.html',
  styleUrls: ['./teacher-groups.page.scss'],
})
export class TeacherGroupsPage implements OnInit {

  public name;

  constructor(public router: Router) { 
     }

  ngOnInit() {
  }


  goBack(){
    this.router.navigate(['/teacher-home']);
  }
}
