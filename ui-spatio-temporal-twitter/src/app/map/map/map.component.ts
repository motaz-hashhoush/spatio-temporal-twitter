import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map:any;

  constructor() { }

  ngOnInit(): void {
    this.initMap()
  }

  initMap(): void {

   this.map = L.map('map').setView([25, -15], 3);
    L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=r7WkEkjqWmsSdoPQlGfZ', {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }).addTo(this.map)

  }

}
