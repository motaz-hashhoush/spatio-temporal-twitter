import { Component, Inject, OnInit } from '@angular/core';
import { MapService } from '../map.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})

export class WordCloudComponent implements OnInit {

  tagArray: Array<Object> = [
    {
      name:"html",
      value:1,
  }]

  constructor(private service:MapService, 
    @Inject(MAT_DIALOG_DATA) private data: {
      tagArray:Array<Object>
    }) { }

  ngOnInit(): void {

    console.log("WordCloudComponent constructor", this.data.tagArray.length)

    this.tagArray = this.data.tagArray
    
  }

  onSelectionChane(event:any) {
    console.log(event)
  }

}
