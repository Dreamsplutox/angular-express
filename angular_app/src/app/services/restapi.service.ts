import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private httpClient: HttpClient) { }

  // Get the list of current jobs in jasper 
  public getSchedule(){
    return this.httpClient.get("https://srvreporting.arnaudjasper2.tk:4200/api/jobs");
  }

  // Create a schedule on a report (immediate execution + send mail)
  public createParameterizedSchedule(params: string){
    console.log("parameterized schedule function, params = "+params)
    return this.httpClient.get("https://srvreporting.arnaudjasper2.tk:4200/api/jobsparameterizedschedule/"+params);
  }
}
