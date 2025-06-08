import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MiService {

  private apiUrl: string = 'http://viaandina/api/';
  private service: string = 'scheduler'

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    let url = `${this.apiUrl}${this.service}/schedules`
    return this.http.get<any>(url);
  }
}