import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeacherAdmiGroupPage } from './teacher-admi-group.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherAdmiGroupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeacherAdmiGroupPage]
})
export class TeacherAdmiGroupPageModule {}
