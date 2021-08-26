import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessage, ErrorMessageComponent } from 'src/app/conformDialogBoxes/success/error-message/error-message.component';
import { SuccessMessageComponent, SuccessMessage } from 'src/app/conformDialogBoxes/success/success-message/success-message.component';
import { HomeService } from 'src/app/services/home/home.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { NewStudentComponent } from '../student/new-student/new-student.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  result: string = '';
  type:any;
  allStundents;
  allRteStundents;

 // arr2 = ["firstClass","secondClass","thirdClass","fourthClass","fifthClass","sixClass","seventhClass","eightClass","ninthClass","tenthClass"]


 constructor(public dialog: MatDialog, private homeSer: HomeService,private router: Router,private route: ActivatedRoute, public loaderSer:LoaderService) { }


  ngOnInit(): void {
    this.loaderSer.isHomeActive.next(true);

    this.type = this.route.snapshot.params['rtes'];
    if(this.type != null ){
      this.getAllRteStudentsCount();
    }
    else{
      this.getAllStudentsCounts();
    }

  }


//-----------------------RTE Students---------------------

  arr = ["Nursary","kg1","kg2",1, 2, 3, 4, 5, 6, 7, 8];
  arr2 = ["Nursary","kg1","kg2",1,2,3,4,5,6,7,8]

  getAllRteStudentsCount() {
    this.loaderSer.showNgxSpinner();
    this.getIndividualRteClassStudentCount();
    this.homeSer.getAllRteStudentsCount().subscribe((data) => {
      this.allRteStundents= data;
     // this.getIndividualRteClassStudentCount();
      this.loaderSer.hideNgxSpinner();
    },(error)=>{
      console.log(error);
      this.loaderSer.hideNgxSpinner();
    });

  }

getIndividualRteClassStudentCount(){

  for (let i=0,j=0;i<this.arr.length,j<this.arr2.length;i++,j++) {

    this.homeSer.getRteStudentsClassCount(this.arr[i]).subscribe((data:any) => {

      this.arr2[j] = data;
   // console.log(this.arr[i] +"=" + this.arr2[j]);

    },(error)=>{
      console.log(error);
      this.loaderSer.hideNgxSpinner();
    });

  }

}


//-----------------------Normal Students---------------------

  arr4 = ["Nursary","kg1","kg2",1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  arr5 = ["Nursary","kg1","kg2",1,2,3,4,5,6,7,8,9,10]

  getAllStudentsCounts() {
    this.loaderSer.showNgxSpinner();
    this.getIndividualNormalClassStudentCount();
    this.homeSer.getAllStudentsCount().subscribe((data) => {
      this.allStundents= data;
      this.loaderSer.hideNgxSpinner();
    },(error)=>{
      console.log(error);
      this.loaderSer.hideNgxSpinner();
    });

  }

  getIndividualNormalClassStudentCount(){

    for (let i=0,j=0;i<this.arr4.length,j<this.arr5.length;i++,j++) {

      this.homeSer.getStudentsClassCount(this.arr4[i]).subscribe((data:any) => {

        this.arr5[j] = data;
     // console.log(this.arr4[i] +"=" + this.arr5[j]);

      },(error)=>{
        console.log(error);
        this.loaderSer.hideNgxSpinner();
      });
    }
  }


//----------------------New Student Pop up window ------------------
  newStudent() {
    const dialogRef = this.dialog.open(NewStudentComponent, { hasBackdrop: true, disableClose: true, width: '1000px' });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result == 'success') {
        this.getAllStudentsCounts();
        this.dialog.open(SuccessMessageComponent, { width: "600px", data: new SuccessMessage("Added Successfully") });
      }
      else if (this.result == 'failure') {
        this.dialog.open(ErrorMessageComponent, { width: "600px", data: new ErrorMessage("Addition Failure") });
      }
    });
  }



  allStuents(){
    this.router.navigate(['students/all']);
  }

  allRteStuents(rte:any){
    this.router.navigate(['students/',rte,'all']);
  }


  details(className:any){
    this.router.navigate(['students/class/',className]);
  }

  detailsRte(className:any){
    this.router.navigate(['students/rte/class/',className]);
  }


  ngOnDestroy(){
   
    this.loaderSer.isHomeActive.next(false);
  }
}
