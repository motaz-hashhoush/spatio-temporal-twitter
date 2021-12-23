import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatDialog } from '@angular/material/dialog';
import { WordCloudComponent } from '../word-cloud/word-cloud.component'
import { MapService } from '../map.service'
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";



@Component({
  selector: 'app-bar-plot',
  templateUrl: './bar-plot.component.html',
  styleUrls: ['./bar-plot.component.css']
})
export class BarPlotComponent implements OnInit {

  show:Boolean = true;


  constructor(private service:MapService, public dialog:MatDialog, 
    
    @Inject(MAT_DIALOG_DATA) private data:
  {
    xaxis:string[], 
    series:Array<number>,
    tweets: Array<any>,
    freq: Array<any>
  }) {}

  displayTweets:Array<any> = []
  
  series: ApexAxisChartSeries  = []
  title: ApexTitleSubtitle = {
    
    text: "Monthly",
    floating: false,
    offsetY: 320,
    align: "center",
    style: {
      color: "#444"
    }
  }

  chart:ApexChart = {
    height: 350,
    type: "bar",
    events: {
      click:  (event, chartContext, config) => {

        this.displayTweets = []
      
        console.log("config", config.dataPointIndex)
        console.log("event", this.data.xaxis[config.dataPointIndex])

        for(let i =0; i < this.data.tweets.length; i++){
          
          let date = this.data.tweets[i]._source.created_at.substring(0, 7);
          
           if(date == this.data.xaxis[config.dataPointIndex]){
            this.displayTweets.push(this.data.tweets[i]._source)
           }
        }
      }
    }
  }

  xaxis:ApexXAxis = {
    //categories: [ "Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],

    position: "top",
    labels: {
      offsetY: -18
    }
  }

  plotOptions:ApexPlotOptions = {
    bar: {
      borderRadius: 10
    }
  }

  tagArray:Array<Object> = []


  ngOnInit(): void {


    this.xaxis.categories = this.data.xaxis;
    this.series.push({data: this.data.series, name: "Frequency"})
  }

  wordCloud() {

     this.show = false;

      for(let i of this.data.freq){

        this.tagArray.push({
          name: i.key,
          value: i.doc_count
        })

      }

      this.dialog.open(WordCloudComponent, {

           data: {
          tagArray:this.tagArray
        } 
        })
   
  }
}

