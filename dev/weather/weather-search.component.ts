import { Component} from '@angular/core';
import {WeatherService} from './weather.service';
import {WeatherItem} from './weather-item';
import { ControlGroup} from '@angular/common';

@Component({
    selector: 'weather-search',
    template: `
                <section class="weather-search">
                    <form (ngSubmit)="onSubmit(f)" #f="ngForm">
                        <label for="city">City</label>
                        <input type="text" ngControl="location" id="city" required>
                        <button type="submit">Add city</button>
                        <div>
                            <span class="info">City found:</span>City Name
                        </div>
                    </form>
                </section>
    `,
    providers:[WeatherService],
})
export class WeatherSearchComponent {
  constructor(private _weatherService : WeatherService){
        
    }
 
    onSubmit(f: ControlGroup){        
        console.log(this._weatherService);
        console.log(f.value.location);
        this._weatherService.searchWeather(f.value.location)
            .subscribe(
                data => this.responseHandeler(data),
                err => console.log(err.message),
                () => console.log('done')
                )
    }
    
    responseHandeler(data){
        let item = new WeatherItem(data.name,data.weather[0].description,data.main.temp);
        this._weatherService.addWeatherItem(item);
    }

}