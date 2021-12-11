import { Component, OnInit, Input } from '@angular/core';
import { ChartDataset} from 'chart.js';

@Component({
  selector: 'app-bar-plot',
  templateUrl: './bar-plot.component.html',
  styleUrls: ['./bar-plot.component.css']
})
export class BarPlotComponent implements OnInit {

  barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  @Input()
  mbarChartLabels:string[] = [];

  @Input()
  values:Array<number> = []

  barChartData: ChartDataset[] = [];
  

  constructor() { }

  ngOnInit(): void {

  this.barChartData.push({data: this.values, label: 'month'})

    console.log(this.values)
    console.log(this.mbarChartLabels)
  }

}
