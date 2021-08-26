import { state } from '@angular/animations';
import { AfterViewInit, Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ConfirmDialogModel, ConformationDialogComponent } from 'src/app/conformDialogBoxes/conformation-dialog.component';
import { ErrorMessage, ErrorMessageComponent } from 'src/app/conformDialogBoxes/success/error-message/error-message.component';
import { SuccessMessage, SuccessMessageComponent } from 'src/app/conformDialogBoxes/success/success-message/success-message.component';
import { Student } from 'src/app/model/Student';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentService } from 'src/app/services/studentService/student.service';
import { NewStudentComponent } from '../new-student/new-student.component';
import { UpdateStudentComponent } from '../update-student/update-student.component';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit, AfterViewInit {



  displayedColumns = ['registrationId', 'dateOfAdmission', 'samagraId', 'firstName', 'lastName', 'fatherName', 'motherName', 'mobileNumber',
    'presentAddress', 'permanentAddress', 'classToJoin', 'gender', 'dateOfBirth', 'marksOfIdentification', 'religion', 'caste', 'castId',
    'aadharNumber', 'bankAccountNumber', 'ifscCode', 'childHandicapped', 'fatherMotherExpired', 'siblings', 'siblingInformation', 'rteStudent',
    // 'admissionFee', 'examFee', 'schoolFee', 'busFee', 'totalFee','admissionFeePaid', 'admissionFeeDue', 'examFeePaid', 'examFeeDue', 'busFeePaid', 'busFeeDue',
    'Actions'];


  public dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sortProperty: 'desc';
  id: any;
  id1: any;
  rte: any;
  type: string;
  filterText = '';
  isActivateFilter: boolean = false;
  constructor(private service: StudentService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute, private loaderSer: LoaderService) {
    this.route.params.subscribe(params => {
      this.ngOnInit();  
    });
  }

  ngOnInit(): void {


    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.firstName.toLowerCase().includes(filter) ||
        data.registrationId.toString().includes(filter) ||
        data.samagraId.toString().includes(filter)
    };

    this.rte = this.route.snapshot.params['id'];
    this.id1 = this.route.snapshot.params['rteClassName'];
    this.id = this.route.snapshot.params['className'];



    if (this.id == null && this.id1 != null) {
      console.log("Rte individula students load");
      this.getRteStudents(this.id1);
    } else if (this.id == null && this.rte != null) {
      console.log("all Rte Students Load");
      this.getAllRteStudents();
    }


    if (this.id != null && this.id1 == null) {
      console.log("normal individula class students load");
      this.getNormalStudents(this.id);
    } else if (this.id1 == null && this.rte == null) {
      console.log("all normal students");
      this.getAllNormalStudents();
    }

    if (this.id1 != null && this.id == null) {
      this.type = 'RTE'
    } else {
      this.type = 'Normal'
    }

  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // const sortState: Sort = {active: 'registrationId', direction: 'desc'};
    // this.sort.active = sortState.active;
    // this.sort.direction = sortState.direction;
    // this.sort.sortChange.emit(sortState);
  }


  pageable = {
    page: 0,
    size: 20,
    sort: {
      field: "modifiedDate",
      order: "DESC"
    }
  };


  // ------------ Filter method ----------------//
  applyFilter(filterValue: string) {
    this.filterText = filterValue.trim(); // Remove whitespace
    filterValue = this.filterText.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }


  getAllNormalStudents() {
    this.loaderSer.showNgxSpinner();
    this.service.getAllNormalStudents(this.pageable).subscribe((data) => {
      this.dataSource.data = data;
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
    });

  }

  getNormalStudents(id: any) {
    this.loaderSer.showNgxSpinner();
    this.service.getNormalClassStudents(id).subscribe((data) => {
      this.dataSource.data = data;
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
    });

  }


  getAllRteStudents() {
    this.loaderSer.showNgxSpinner();
    this.service.getAllRteStudents(this.pageable).subscribe((data) => {
      this.dataSource.data = data;
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
    });
  }

  getRteStudents(id: any) {
    this.loaderSer.showNgxSpinner();
    this.service.getRteClassStudents(id).subscribe((data) => {
      this.dataSource.data = data;
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
    });
  }


  edit(student) {
    const dialogRef = this.dialog.open(UpdateStudentComponent, { data: student, disableClose: true, hasBackdrop: true, width: '1000px' });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result == 'success') {
        this.dialog.open(SuccessMessageComponent, { width: "600px", panelClass: 'dialog-container-custom-success', data: new SuccessMessage("Student updated successfully") });
        this.ngOnInit();
      }
      else if (this.result == 'failure') {
        this.dialog.open(ErrorMessageComponent, { width: "600px", panelClass: 'dialog-container-custom-failure', data: new ErrorMessage("Student Updation failure") });
      }
    })
  }


  result: string = '';
  delete(element): void {

    const message = `Are you sure you want to delete this student ?` + '  ' + element.firstName;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConformationDialogComponent, {

      width: '600px',
      data: dialogData,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;

      if (this.result) {
        this.loaderSer.showNgxSpinner();
        element.status = 'DELETED';
        this.service.delete(element.registrationId).subscribe((data) => {
          this.dialog.open(SuccessMessageComponent, { width: "600px", panelClass: 'dialog-container-custom-success', data: new SuccessMessage("Student deleted successfully") });
          this.ngOnInit();
          this.loaderSer.hideNgxSpinner();
        }, (error) => {
          this.dialog.open(ErrorMessageComponent, { width: "600px", panelClass: 'dialog-container-custom-failure', data: new ErrorMessage("Student deletion failure") });
          console.log(error);
          this.loaderSer.hideNgxSpinner();
        })
      }

    });
  }

  newStudent() {
    const dialogRef = this.dialog.open(NewStudentComponent, { disableClose: true, hasBackdrop: true, width: '1000px' });
    dialogRef.beforeClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result == 'success') {
        this.ngOnInit();
        this.dialog.open(SuccessMessageComponent, { width: "600px", panelClass: 'dialog-container-custom-success', data: new SuccessMessage("Student created Successfully") });
      }
      else if (this.result == 'failure') {
        this.dialog.open(ErrorMessageComponent, { width: "600px", panelClass: 'dialog-container-custom-failure', data: new ErrorMessage("Student creation Failure") });
      }
    })
  }

}



@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {
  constructor() { }

  transform(value: string, search: string): string {
    const valueStr = value + ''; // Ensure numeric values are converted to strings
    return valueStr.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<strong class="text-highlight">$1</strong>');
  }
}

