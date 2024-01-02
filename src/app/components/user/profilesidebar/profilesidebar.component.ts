import { Component } from '@angular/core';
import {userProfileSelector } from 'src/app/components/user/state/user.selectors';
import { Store, select } from '@ngrx/store'
import { UserModule } from '../user.module';

@Component({
  selector: 'app-profilesidebar',
  templateUrl: './profilesidebar.component.html',
  styleUrls: ['./profilesidebar.component.css']
})
export class ProfilesidebarComponent {


  public role: string = '';

  constructor(

    private store: Store<{userdetails:UserModule}>
  ){}


  userData$ = this.store.pipe(select(userProfileSelector)).subscribe( cleanedData => {
    console.log('hello');
    console.log(cleanedData, 'cleanedData');

    this.role = cleanedData.userdetails['data']['data'].role;
   
    
  })

}
