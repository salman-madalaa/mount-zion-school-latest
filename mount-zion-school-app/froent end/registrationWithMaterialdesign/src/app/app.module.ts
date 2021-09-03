import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllStudentsComponent, HighlightSearchPipe } from './modules/student/all-students/all-students.component';
import { NewStudentComponent } from './modules/student/new-student/new-student.component';
import { UpdateStudentComponent } from './modules/student/update-student/update-student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from './modules/material.module';
import { HttpInterceptorService } from './interceptors/HttpInterceptorService';
import { LoginComponent } from './modules/login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './modules/home/home.component';
import { FlexModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImportExportComponent } from './modules/import-export/import-export.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AllStudentsComponent,
    NewStudentComponent,
    UpdateStudentComponent,
    LoginComponent,
    HomeComponent,
    HighlightSearchPipe,
    ImportExportComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule,
    BrowserAnimationsModule, MatTabsModule, FlexModule,
    MatTableModule, MatDialogModule, MatFormFieldModule, MaterialModule, NgxSpinnerModule
  ],
  entryComponents: [
    AllStudentsComponent, UpdateStudentComponent,
    NewStudentComponent,  MatConfirmDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
