import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { MapService, Tweet } from '../map.service'
import { ChartConfiguration, ChartDataset, ChartOptions , ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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

  display:boolean = false
  outValues:Array<number> = [];
  outKeys:Array<string> = [];
  tweets: Array<any> = [];
  dic_tweets: {[month:string]: number;} = {};


    // CHART CLICK EVENT.
    onChartClick(event:any) {
    console.log(event.active[0].index);

    Object.keys(this.dic_tweets)
    Object.values(this.dic_tweets)
    
  }

  constructor (private service: MapService) { }

  ngOnInit(): void {

  }

  getData(): void {

    let coordinates = {
      lon: this.corrform.get('lon')?.value, 
      lat:this.corrform.get('lat')?.value 
     }
   
    this.service.getTweetsRectangle(coordinates)
    .subscribe((Tweets:Array<object>) => {
      // stor all the dates which come from response
     this.tweets = Tweets
     
     for(let value of this.tweets) {

          // get the month
        let key = value._source.created_at.substring(0, 7);

        if(this.dic_tweets[key] != undefined) 
          this.dic_tweets[key] += 1;
        else 
          this.dic_tweets[key] = 1;
    }
    this.showPlot();

  
    })
  }

 showPlot(): void {
   this.outValues =  Object.values(this.dic_tweets);
   this.outKeys =   Object.keys(this.dic_tweets)
   this.display = true;

 }

}
