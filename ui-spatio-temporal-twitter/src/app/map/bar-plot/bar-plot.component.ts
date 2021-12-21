import { Component, OnInit, Input } from '@angular/core';
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

  @Input()
  mbarChartLabels:string[] = [];

  @Input()
  values:Array<number> = []
  

  series: ApexAxisChartSeries  = []

  title: ApexTitleSubtitle = {
    
    text: "Monthly ",
    floating: false,
    offsetY: 320,
    align: "center",
    style: {
      color: "#444"
    }
  }

  chart:ApexChart = {
    height: 350,
    type: "bar"
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

  constructor() {

  }

  ngOnInit(): void {


  this.xaxis.categories = this.mbarChartLabels;
  this.series.push({data: this.values, name: "Month"})


  }

}

