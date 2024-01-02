import { HttpClient } from '@angular/common/http';

import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { IApiUserRes } from 'src/app/model/usermodel';
import { User } from 'src/app/model/usermodel';
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
  public showModal: boolean = false;
  public showAddress: boolean = false;
  public showdetail: boolean = false;
  public id: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public phoneNumber: string = '';
  public role: string = '';
  img?: string;
  selectedFile!: File;
  public address: {
    name?: String,
    house?: String,
    post?: String,
    pin?: Number,
    contact?: Number,
    state?: String,
    District?: String,
  }={};

  

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{userdetails:UserModule}>
  ){}
  userData$ = this.store.pipe(select(userProfileSelector)).subscribe( cleanedData => {
    console.log('hello');
    console.log(cleanedData, 'cleanedData');
    this.id = cleanedData.userdetails['data']['data']._id;
    this.firstName = cleanedData.userdetails['data']['data'].firstName;
    this.lastName = cleanedData.userdetails['data']['data'].lastName;
    this.email = cleanedData.userdetails['data']['data'].email;
    this.phoneNumber = cleanedData.userdetails['data']['data'].phoneNumber;
    this.role = cleanedData.userdetails['data']['data'].role;
    this.img = cleanedData.userdetails['data']['data']?.image;
    this.address = cleanedData.userdetails['data']['data']?.address|| {}; ;
    
  })
  toggleModal2() {
    console.log("openModal function called");
    this.showModal = !this.showModal;
    this.showdetail=true
  }


  ngAfterViewInit(): void {
    Emitters.authEmitter.emit(true)
    console.log(this.userData$, ' userdata$');
  }

  ngOnInit(): void {
    console.log('dispatching profile');
    this.store.dispatch(retrieveProfile());
    
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('image',this.selectedFile,this.selectedFile.name)
console.log("submit",this.selectedFile);



    this.http.post(`/profile/upload`,formData,{ withCredentials: true })
    .subscribe(
      () => {
        Emitters.authEmitter.emit(true);
        this.store.dispatch(retrieveProfile());
        Swal.fire('Success','Saved','success')
      },
      (err) => {
        Swal.fire("Error",err.error.message,'error');
      }
    )
  }

  
  onFileSelected(event: Event): void {
    const inputElement = (event.target as HTMLInputElement)?.files;
    console.log("hi");
    
    if (inputElement && inputElement.length > 0) {
      this.selectedFile = inputElement[0];
      console.log(this.selectedFile);
    }
  }
  updateUser(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: {
      name?: String,
        house?: String,
        post?: String,
        pin?: Number,
        contact?: Number,
        state?: String,
        District?: String,
    }
  ) {
    const user= {
      id:this.id,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    };
  {
  console.log(user,"..........");
  this.showModal=false;
  this.showAddress=false
  this.showdetail=false
    this.http.post<IApiUserRes>('/profile/update', user, { withCredentials: true }).subscribe(
      (response:IApiUserRes) => {
     
        Emitters.authEmitter.emit(true);
        this.store.dispatch(retrieveProfile());
        Swal.fire('Success','Saved','success')
      },
      (err) => {
        Swal.fire("Error", err.error.message, "error");
      }
    );
    // Add your update logic here
  }}
  closeModal(){
    this.showModal=false;
    this.showAddress=false
    this.showdetail=false
  }
  AddAddress(){
    this.showAddress=true
    this.showdetail=false
  }
}