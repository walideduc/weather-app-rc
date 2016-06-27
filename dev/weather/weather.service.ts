import { Injectable } from '@angular/core';
import {WEATHERITEMS} from './weather.data';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {WeatherItem} from './weather-item';

@Injectable()

export class WeatherService {
    apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
    constructor(private _http : Http){

    }
    getWeatherItems(){
        return WEATHERITEMS;
    }
    addWeatherItem(item :WeatherItem){
        WEATHERITEMS.push(item);
    }
    searchWeather(citynam : string) : Observable<any> {
       return this._http.get(this.apiUrl+citynam+'&APIKEY=f32ab130bf3a1525d5364bc8396ba944&units=metric')
            .map(respone => respone.json())
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json().error);
            })
    }
    clearWeatherItems(){
        WEATHERITEMS.splice(0);
    }



}
