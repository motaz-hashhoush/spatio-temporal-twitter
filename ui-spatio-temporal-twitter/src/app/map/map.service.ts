import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


export interface Tweet  {
  
  created_at?: Date;
  text?: string;
  coordinates?: object;
  
}

@Injectable({
  providedIn: 'root',
})

export class MapService {

  constructor(
    private http:HttpClient
    ) { }

  

  // getTweets(body: {lon: number, lat:number}): Observable<[]> {
    
  //   return this.http.get<[]>('http://localhost:3000/api/v1/get/qurey/'+ body.lon +'/' + body.lat)
  // }

  getTweetsRectangle(body:Object): Observable<[]> {
    
    return this.http.post<[]>('http://localhost:3000/api/v1/get/qurey/', body)
  }
 
    
  
}
