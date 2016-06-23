import {Component} from '@angular/core';
import {WeatherListComponent} from './weather/weather-list.component';
import {WeatherSearchComponent} from './weather/weather-search.component';

@Component({
    selector: 'my-app',
    template: `
        <header>
            <h1>Weather App</h1>
        </header>
        <weather-search></weather-search>
        <weather-list></weather-list>
       
        
    `,
    directives:[WeatherListComponent,WeatherSearchComponent],
    styleUrls:['src/css/app.css']
})
export class AppComponent {

}