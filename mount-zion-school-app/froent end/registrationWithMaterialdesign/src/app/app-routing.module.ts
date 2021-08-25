import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { AllStudentsComponent } from './modules/student/all-students/all-students.component';
import { NewStudentComponent } from './modules/student/new-student/new-student.component';
import { UpdateStudentComponent } from './modules/student/update-student/update-student.component';
import { AuthGuardService } from './services/authGaurdService/auth-guard.service';
import { ImageComponent } from './uploadimage/image/image.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
   {path: 'image',component:ImageComponent},
  {path: 'login',component:LoginComponent},
  {path: 'logout',component:LogoutComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuardService]},
  {path:'home/:rtes',component:HomeComponent,canActivate:[AuthGuardService]},
  {path:'students/class/:className',component:AllStudentsComponent,canActivate:[AuthGuardService]},
  {path:'students/rte/class/:rteClassName',component:AllStudentsComponent,canActivate:[AuthGuardService]},
  {path:'students/all',component:AllStudentsComponent,canActivate:[AuthGuardService]},
  {path:'students/:id/all',component:AllStudentsComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
