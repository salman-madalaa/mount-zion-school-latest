import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms'
import { LoaderService } from './services/loader/loader.service';
import { AuthenticationService } from './services/authService/authentication.service';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mount Zion E.M.School (Tendukheda)';
  productForm: FormGroup;
  isLogged: boolean = true;
  panelOpenState = false;


  normalClass: string[] = ['Nursary','kg1', 'kg2', '1', '2', '3','4','5','6','7','8','9','10'];
  rteClass: string[] = ['Nursary','kg1', 'kg2', '1', '2', '3','4','5','6','7','8'];


  constructor(public authSer: AuthenticationService, private _router: Router, private dialog: MatDialog, private fb: FormBuilder,
    public loaderSer: LoaderService,public activateRoute: ActivatedRoute) {

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

  normalClassStudents(className){
    this._router.navigate(['/students/class/', className]);
  }

}
