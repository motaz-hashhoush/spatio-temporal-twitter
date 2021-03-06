import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map/map.component';
import { FormMapComponent } from './map/form-map/form-map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgChartsModule } from 'ng2-charts';
import { BarPlotComponent } from './map/bar-plot/bar-plot.component';
import { NgApexchartsModule } from 'ng-apexcharts'
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { DrawMapComponent } from './map/draw-map/draw-map.component';
import {MatDialogModule} from '@angular/material/dialog';
import { WordCloudComponent } from './map/word-cloud/word-cloud.component';

import { Ang2TagCloudModule } from 'ang2-tag-cloud';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FormMapComponent,
    BarPlotComponent,
    DrawMapComponent,
    WordCloudComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    LeafletDrawModule,
    LeafletModule,
    MatDialogModule,
    Ang2TagCloudModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
