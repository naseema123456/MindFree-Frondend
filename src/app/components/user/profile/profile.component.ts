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
  public Time: boolean = false;
  availableTimeSlots: { label: string; selected: boolean }[] = [];
  
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

  scheduleTime(){
    this.Time=true
    this.availableTimeSlots = [
      { label: '9:00 AM - 10:00 AM', selected: false },
      { label: '10:00 AM - 11:00 AM', selected: false },
      { label: '11:00 AM - 12:00 PM', selected: false },
      { label: '12:00 PM - 1:00 PM', selected: false },
      { label: '1:00 PM - 2:00 PM', selected: false },
      { label: '2:00 PM - 3:00 PM', selected: false },
      { label: '3:00 PM - 4:00 PM', selected: false },
      { label: '4:00 PM - 5:00 PM', selected: false },
      { label: '5:00 PM - 6:00 PM', selected: false },
      { label: '6:00 PM - 7:00 PM', selected: false },
      { label: '7:00 PM - 8:00 PM', selected: false },
      { label: '8:00 PM - 9:00 PM', selected: false },
      { label: '9:00 PM - 10:00 PM', selected: false },
      { label: '10:00 PM - 11:00 PM', selected: false },
      { label: '11:00 PM - 12:00 AM', selected: false },
      { label: '12:00 AM - 1:00 AM', selected: false },
      { label: '1:00 AM - 2:00 AM', selected: false },
      { label: '2:00 AM - 3:00 AM', selected: false },
      { label: '3:00 AM - 4:00 AM', selected: false },
      { label: '4:00 AM - 5:00 AM', selected: false },
      { label: '5:00 AM - 6:00 AM', selected: false },
      { label: '6:00 AM - 7:00 AM', selected: false },
      { label: '8:00 AM - 9:00 AM', selected: false },
      // Add more time slots as needed
    ];
  }

  closeTime(){
    this.Time=false
  }
  selectTimeSlot(selectedSlot: { label: string; selected: boolean }): void {
    // Perform actions when a time slot is selected
    console.log('Selected Time Slot:', selectedSlot.label);

    // Update the selected status to prevent further clicks
    selectedSlot.selected = true;
    this.http.post('/callprovider/save-time-slot', { time: selectedSlot.label })
    .subscribe(
      () => console.log('Time slot saved successfully'),
      (error) => console.error('Error saving time slot:', error)
    );
  }
}