import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/services/conformatioDialog/confirmation-dialog.service';
import { ImportExportService } from 'src/app/services/importExport/import-export.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { createImmediatelyInvokedArrowFunction } from 'typescript';


@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})

export class ImportExportComponent implements OnInit {

  selectedFile: File;

  isImport:boolean;
  isExport:boolean;
  isRteStudent :boolean;
  type:any;
  className:any;

  constructor(private _importExportService: ImportExportService, private route: ActivatedRoute,
    private router: Router,private loaderSer:LoaderService,private dialogSer:ConfirmationDialogService) {

    if(this.router.url == '/import'){
      this.isImport= true;
      this.isExport = false;
    }else{
      this.isImport= false;
      this.isExport = true;
    }

    console.log(this.router.url);
    }

  ngOnInit(): void {

  }

  importStudentData() {
    this.loaderSer.showNgxSpinner();
    const file = new FormData();
    file.append('file', this.selectedFile,this.selectedFile.name);
    this._importExportService.import(file).subscribe((data) => {
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showSucessSnakbar("Data imported successfully");
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showFailureSnakbar("Data imported Failure");
    })
  }

  onFileChange(event) {
    this.selectedFile = event.target.files[0];

    const msg = `Are you sure you want to Import this file ?` + '  ' + this.selectedFile.name;
    const title ="Import Confirm Action";

    this.dialogSer.openConfirmationDialog(msg,title).afterClosed().subscribe(res => {
      if (res) {
        this.importStudentData();
      }
    })

  }


  rteStudent(val: boolean): void {
    this.isRteStudent = val;
  }


   exportIndividual(a,b){
    this.loaderSer.showNgxSpinner();
    this._importExportService.exportInividual(a,b).subscribe(x=>{
      var blob = new Blob([x], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
     if(window.navigator && window.navigator.msSaveOrOpenBlob){
       window.navigator.msSaveOrOpenBlob(blob);
       return ;
     }
     const data = window.URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = data;
     link.download = this.className+'Class.xlsx';
     link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));

     setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove();
     },100);
     this.loaderSer.hideNgxSpinner();
     this.loaderSer.showSucessSnakbar( this.className+ " Class data Exported successfully ");
    },(error)=>{
      console.log(error);
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showFailureSnakbar( this.className+ " Class data Exported Failure ");
    });
  }


}
