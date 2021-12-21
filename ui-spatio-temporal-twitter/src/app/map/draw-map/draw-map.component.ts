import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css';

@Component({
  selector: 'app-draw-map',
  templateUrl: './draw-map.component.html',
  styleUrls: ['./draw-map.component.css']
})
export class DrawMapComponent implements OnInit {

  private map?: L.Map;
    //private drawControl? = new L.Control.Draw;
    private drawnLayer?: L.DrawEvents.Created;

    public options = {
        layers: [
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, })
        ],
        zoom: 5,
        center: L.latLng(46, 12)
    };

     drawOptions =new L.Control.Draw({
      
        draw: {
          polyline: false,
          polygon: {
              allowIntersection: false,
              drawError: {
                  color: '#b00b00',
                  timeout: 1000
              },
              shapeOptions: {
                  color: '#bada55'
              },
              showArea: true
          },
          circle: false,
          rectangle: false,
          marker: false
      }
});

     constructor() { }
    ngOnInit(): void{

    }
 
    public onDrawReady(dc: L.Control.Draw): void {
      console.log(dc)
      
    }

    public onMapReady(map: L.Map): void {
      console.log(map)
        this.map = map;
        console.log(`[+] Map ready`);
    }
}
