import {Profile} from './profile';
import {Injectable} from '@angular/core';

@Injectable()

export class ProfileService {
  profiles:Profile[] = [
    new Profile('Default Profile',['Paris', 'New York', 'Berlin'])
  ];

  saveNewProfile(cities:string[]){
    let profileName = `Profile ${ this.profiles.length}`;
    let profile = new Profile(profileName,cities);
    this.profiles.push(profile);
  }

  getProfiles(){
    return this.profiles;
  }
}
