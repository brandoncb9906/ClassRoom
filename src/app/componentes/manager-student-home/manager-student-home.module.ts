import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagerStudentHomePage } from './manager-student-home.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerStudentHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagerStudentHomePage]
})
export class ManagerStudentHomePageModule {}
