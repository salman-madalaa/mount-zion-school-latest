import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms'
import { LoaderService } from './services/loader/loader.service';
import { AuthenticationService } from './services/authService/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mount Zion E.M.School (Tendukheda)';
  productForm: FormGroup;
  isLogged: boolean = true;
  constructor(public authSer: AuthenticationService, private _router: Router, private dialog: MatDialog, private fb: FormBuilder,
    public loaderSer: LoaderService) {

  }

  ngOnInit() {
    this.authSer.logout();
    this._router.navigateByUrl("/login");
  }

  logout() {
    this.authSer.logout();
    this._router.navigateByUrl("/logout");
  }

  home() {
    this._router.navigate(['home']);
  }

  normalStudents() {
    this._router.navigate(['home']);
  }

  RteStudents(rte) {
    this._router.navigate(['home/', rte]);
  }

}
