import {Component,OnInit} from '@angular/core';
import {ProfileService} from './profile.service';
import {WeatherService} from './weather/weather.service';
import {Profile} from './profile';
import {WeatherItem} from './weather/weather-item';
@Component({
  selector: 'my-sidebar',
  template: `
    <h3>Saved Profiles</h3>
    <button (click) = "onSaveNew()">Save list to Profile</button>
    <article class="profile" *ngFor="let profile of profiles">
    <div  (click) = "onLoadProfile(profile)">
        <h4>{{profile.name}}</h4>
        <p>{{profile.cities.join(', ')}} </p>
    </div>
      <span class="delete" (click)="onDeleteProfile($event,profile)">X</span>
    </article>
  `,
  styleUrls:['src/css/sidebar.css'],
  providers:[ProfileService]

})
export class SidebarComponent implements OnInit {
  profiles: Profile[] ;

  constructor(private _profileService : ProfileService, private _weatherService: WeatherService){}

  ngOnInit(){
    this.profiles = this._profileService.getProfiles();
  }

  onSaveNew(){
    let cities = this._weatherService.getWeatherItems().map((item :WeatherItem) => {return item.cityName} );
    this._profileService.saveNewProfile(cities);
  }

  onLoadProfile(profile: Profile){
    this._weatherService.clearWeatherItems();
    for (let i = 0;i<profile.cities.length ;i++){
      console.log(profile.cities[i]);
      this._weatherService.searchWeather(profile.cities[i])
        .retry()
        .subscribe(
          data => {
            let item = new WeatherItem(data.name, data.weather[0].description, data.main.temp);
            this._weatherService.addWeatherItem(item);
          }
        )
      }
  }

  onDeleteProfile(event,profile){
    this.profiles.splice(this.profiles.indexOf(profile),1);
  }


























}
