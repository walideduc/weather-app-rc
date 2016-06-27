import {Component} from '@angular/core';
import {SidebarComponent} from './sidebar.component';
import {WeatherListComponent} from './weather/weather-list.component';
import {WeatherSearchComponent} from './weather/weather-search.component';
import {WeatherService} from './weather/weather.service';



@Component({
    selector: 'my-app',
    template: `
        <header>
            <h1>Weather App</h1>
        </header>
        <my-sidebar></my-sidebar>
        <weather-search></weather-search>
        <weather-list></weather-list>
    `,
    directives:[WeatherListComponent,WeatherSearchComponent,SidebarComponent],
    styleUrls:['src/css/app.css'],
    providers:[WeatherService],
})
export class AppComponent {

}
