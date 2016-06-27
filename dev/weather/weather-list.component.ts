import {Component,OnInit} from '@angular/core';
import {WeatherItemComponent} from './weather-item.component';
import {WeatherItem} from './weather-item'
import {WeatherService} from './weather.service';


@Component({
    selector: 'weather-list',
    template: `
    <section class="weather-list">
        <weather-item *ngFor= "let weatheritem of weatheritems" [item]=weatheritem > </weather-item>
    </section>
                `,
    directives: [WeatherItemComponent],

})
export class WeatherListComponent implements OnInit{
    weatheritems : WeatherItem[];

    constructor(private _weatherService : WeatherService){

    }
     getWeatherItems(){
         this.weatheritems = this._weatherService.getWeatherItems();
     }

    ngOnInit():any{
        this.getWeatherItems();
    }
}
