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
import { ConformationDialogComponent } from './conformDialogBoxes/conformation-dialog.component';
import { ErrorMessageComponent } from './conformDialogBoxes/success/error-message/error-message.component';
import { SuccessMessageComponent } from './conformDialogBoxes/success/success-message/success-message.component';
import { NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    AllStudentsComponent,
    NewStudentComponent,
    UpdateStudentComponent,
    LoginComponent,
    HomeComponent,
    ConformationDialogComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    HighlightSearchPipe,
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule,
    BrowserAnimationsModule, MatTabsModule, FlexModule,
    MatTableModule, MatDialogModule, MatFormFieldModule, MaterialModule, NgxSpinnerModule
  ],
  entryComponents: [
    AllStudentsComponent,UpdateStudentComponent,
    NewStudentComponent,ErrorMessageComponent,ConformationDialogComponent,SuccessMessageComponent
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
