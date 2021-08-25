import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  message: string;

  constructor(public dialogRef: MatDialogRef<ErrorMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorMessage) {

      this.message = data.message;

    }

  ngOnInit(): void {
  }

}
export class ErrorMessage {

  constructor(public message: string) {
  }

}
