import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { MapService, Tweet } from '../map.service'
@Component({
  selector: 'app-form-map',
  templateUrl: './form-map.component.html',
  styleUrls: ['./form-map.component.css']
})
export class FormMapComponent implements OnInit {

  

   corrform = new FormGroup({
    lon: new FormControl(''),
    lat: new FormControl(''),
  });

   tweets: Array<any> = [];

  constructor ( private service: MapService ) { }

  ngOnInit(): void {
  }

  print(): void {
    

    let coordinates = {
      lon: this.corrform.get('lon')?.value,
      lat:this.corrform.get('lat')?.value 
     }

   
    this.service.getTweets(coordinates).subscribe((Tweets:Array<object>) => {

     this.tweets = Tweets
    
    })
    
  
  }

}
