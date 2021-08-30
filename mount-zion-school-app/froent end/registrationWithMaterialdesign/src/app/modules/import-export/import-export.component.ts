import { Component, OnInit } from '@angular/core';
import { ImportExportService } from 'src/app/services/importExport/import-export.service';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {

  selectedFile: File;

  constructor(private _importExportService: ImportExportService) { }

  ngOnInit(): void {
  }
  import() {
    const file = new FormData();
    file.append('file', this.selectedFile,this.selectedFile.name);
    this._importExportService.import(file).subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }
  onFileChange(event) {

    this.selectedFile = event.target.files[0];

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);

      reader.onload = () => {


      };

    }
  }

}
