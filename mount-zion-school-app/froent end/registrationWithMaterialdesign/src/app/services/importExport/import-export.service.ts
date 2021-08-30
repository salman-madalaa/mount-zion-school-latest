import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  import(im):Observable<any>{
    let options = { headers: new HttpHeaders().set('Content-Type', 'multipart/form-data; charset=utf-8') };
    return this.http.post(this.baseUrl + 'api/exportimport/upload',im);
  }
}
