import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service'
import * as L from 'leaflet';
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map:any;
  dic_tweets: {[month:string]: number;} = {};
  tweets: Array<any> = [];

  display:boolean = false
  outValues:Array<number> = [];
  outKeys:Array<string> = [];
 

  constructor(private service:MapService) { }

  showPlot(): void {
    this.outValues =  Object.values(this.dic_tweets);
    this.outKeys =   Object.keys(this.dic_tweets)
    this.display = true;

    console.log("outKeys", this.outKeys)
    console.log("outValues", this.outValues)

  }

  getTheData(body: Object): void {

    this.service.getTweetsRectangle(body)
        .subscribe((tweet: any) => {

          // stor all the dates which come from response
          this.tweets = tweet

          console.log("im in subscribe", this.tweets.length)

          for(let value of this.tweets) {

              // get the month
              let key = value._source.created_at.substring(0, 7);

            if(this.dic_tweets[key] != undefined) 
              this.dic_tweets[key] += 1;
            else 
              this.dic_tweets[key] = 1;

          }
          this.showPlot()
        })


  }

  ngOnInit(): void {
    this.initMap()
  }

  initMap(): void {

   this.map = L.map('map', {zoomControl: false}).setView([25, -15], 3);

    L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=r7WkEkjqWmsSdoPQlGfZ', {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }).addTo(this.map)


    // add leaflet.pm controls with some options to the map
    this.map.pm.addControls({
      position: 'topleft',
      removalMode: true,
      drawCircle: true,

      drawPolygon: false,
      editMode: false,
      drawPolyline: false,
      drawCircleMarker: false,

    });


    this.map.on('pm:create',(e: any)=>{
      if(e.shape == 'Rectangle') {
    
      
        let LatLngs = e.layer.getLatLngs()
        console.log(LatLngs)
        let toQurey = {
  
          top_left: {
            lat: LatLngs[0][1].lat,
            lng: LatLngs[0][1].lng
          },
          bottom_right:{
            lat: LatLngs[0][3].lat,
            lng:  LatLngs[0][3].lng
          }
        };
   
        console.log("toQurey :" , toQurey);
        this.getTheData(toQurey);
    
  
        
  
      } else if (e.shape == "Marker") {
        console.log(e.layer.getLatLng())
      }


    })

    
  }


}



