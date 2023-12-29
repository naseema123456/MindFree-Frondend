
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import { UserModule } from '../user.module';
import { Store, select } from '@ngrx/store'
import Swal from 'sweetalert2';
import { retrieveProfile } from 'src/app/components/user/state/user.action';
import {userProfileSelector } from 'src/app/components/user/state/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit, AfterViewInit {
  // form: FormGroup;

  public firstName: string;
  // public email: string;
  img?: string;
  // selectedFile: File;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{userdetails:UserModule}>
  ){}
  userData$ = this.store.pipe(select(userProfileSelector)).subscribe( profileData => {
    console.log('hello');
    
    this.firstName = profileData.firstName;
    // this.email = profileData.email;
    // this.img = profileData?.image;
    // console.log(profileData,'profileData');
    
  })


  ngAfterViewInit(): void {
    Emitters.authEmitter.emit(true)
    // console.log(this.userData$, ' userdata$');
  }

  ngOnInit(): void {
    console.log('dispatching profile');
    this.store.dispatch(retrieveProfile());
    
  }

  onFileSelected(event: Event): void {
    const inputElement = (event.target as HTMLInputElement)?.files;
    
    if (inputElement && inputElement.length > 0) {
      // this.selectedFile = inputElement[0];
      // console.log(this.selectedFile);
    }
  }

  onSubmit(){

  }
}
