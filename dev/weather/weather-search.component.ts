import { Component,OnInit} from '@angular/core';
import {WeatherService} from './weather.service';
import {WeatherItem} from './weather-item';
import { ControlGroup} from '@angular/common';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'weather-search',
    template: `
      <section class="weather-search">
        <form (ngSubmit)="onSubmit()">
          <label for="city">City</label>
          <input type="text" ngControl="location" id="city" required (input)="searchCityName(input.value)" #input>
          <button type="submit">Add city</button>
          <div>
            <span class="info">City found: </span>{{data.name}}
          </div>
        </form>
      </section>
    `,
    providers:[WeatherService],
})
export class WeatherSearchComponent implements OnInit {
  private searchStream = new Subject<any>();
  private data = {};

  constructor(private _weatherService : WeatherService){

    }

    onSubmit(){ // when the input is not valid the browser will prevent the form submition. When the user sart typing we have a info in this.data
      let item = new WeatherItem(this.data.name, this.data.weather[0].description, this.data.main.temp);
      this._weatherService.addWeatherItem(item);
    }

    searchCityName(cityName:string){
      this.searchStream.next(cityName);
    }

    ngOnInit(){
      this.searchStream
                .debounceTime(300)
                .distinctUntilChanged()
                .switchMap((item:string)=>this._weatherService.searchWeather(item))
                .subscribe(data=> this.data = data);
    }


}
