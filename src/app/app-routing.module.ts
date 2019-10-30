import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from  './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule' },
  { path: 'teacher-home', loadChildren: './componentes/teacher-home/teacher-home.module#TeacherHomePageModule' },
  { path: 'manager-student-home', loadChildren: './componentes/manager-student-home/manager-student-home.module#ManagerStudentHomePageModule'},
  { path: 'teacher-groups', loadChildren: './componentes/teacher-groups/teacher-groups.module#TeacherGroupsPageModule' },
  { path: 'sign-in', loadChildren: './componentes/sign-in/sign-in.module#SignInPageModule' },
  { path: 'teacher-admi-group', loadChildren: './componentes/teacher-admi-group/teacher-admi-group.module#TeacherAdmiGroupPageModule' },
  { path: 'notes/:id', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'estudiantes', loadChildren: './componentes/estudiantes/estudiantes.module#EstudiantesPageModule' },
  { path: 'detalle-estudiante/:id', loadChildren: './componentes/detalle-estudiante/detalle-estudiante.module#DetalleEstudiantePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
