import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AfterViewInit, Component, OnInit,OnDestroy } from '@angular/core';
import { IApiUserRes } from 'src/app/model/usermodel';
import { Emitters } from 'src/app/emitters/emitter';
import { UserModule } from '../user.module';
import { Store, select } from '@ngrx/store';
import { ServiceService } from '../../../service/service.service';
import Swal from 'sweetalert2';
import { retrieveProfile } from 'src/app/components/user/state/user.action';
import {userProfileSelector } from 'src/app/components/user/state/user.selectors';
import { IApiAppointment } from 'src/app/model/appoinment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit, AfterViewInit,OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public showModal: boolean = false;
  public showAddress: boolean = false;
  public showdetail: boolean = false;
  public Time: boolean = false;
  availableTimeSlots: { label: string;  confirmed?: boolean; selected: boolean ;disabled?: boolean}[] = [];
  appointments: IApiAppointment[] = []; // Adjust the type as needed

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
    private service: ServiceService,
    private http: HttpClient,
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
  initializeComponent(): void {
    this.loadAppoinment();
  }


  loadAppoinment(): void {
  this.service.loadAppoinment().subscribe({
    next: (response: IApiAppointment) => {
      
      if (response.success) {
        const data = response.data ? [response] : [];
        console.log(data,"responne load appoinmnet");
        this.updateTimeSlotsWithAppointments(data);
        // console.log(data,"responne load appoinmnet");
      } else {
        console.error('Error loading users:', response.message);
      }
    },
    error: (error: Error) => {
      console.error('Error loading appointments', error);
    }
  });
}

editModal() {
    console.log("openModal function called");
    this.showModal = !this.showModal;
    this.showdetail=true
  }


  ngAfterViewInit(): void {
    Emitters.authEmitter.emit(true)
    console.log(this.userData$, ' userdata$');
    this.updateTimeSlotsWithAppointments(this.appointments);
  }

  ngOnInit(): void {
    console.log('dispatching profile');
    this.store.dispatch(retrieveProfile());
    this.scheduleTime();
    this.loadAppoinment();
    this.Time=false;
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('image',this.selectedFile,this.selectedFile.name)
console.log("submit",this.selectedFile);


this.http.post(`/profile/upload`, formData).subscribe({
  next: () => {
    Emitters.authEmitter.emit(true); // Notify that the upload was successful
    this.store.dispatch(retrieveProfile()); // Trigger a state update
    Swal.fire('Success', 'Saved', 'success'); // Show success notification
  },
  error: (err) => {
    Swal.fire("Error", err.error.message, 'error'); // Show error notification
  }
});

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
  this.http.post<IApiUserRes>('/profile/update', user).subscribe({
    next: (response: IApiUserRes) => {
      Emitters.authEmitter.emit(true); // Notify about the auth update
      this.store.dispatch(retrieveProfile()); // Trigger profile retrieval
      Swal.fire('Success', 'Saved', 'success'); // Show success notification
    },
    error: (err) => {
      Swal.fire("Error", err.error.message, "error"); // Show error notification
    }
  });
  
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

  scheduleTime() {
    this.loadAppoinment();
    this.Time = true;
  
    const timeSlots = Array.from({ length: 24 }, (_, index) => {
      const startHour = index % 12 || 12;
      const endHour = (startHour + 1) % 12 || 12;
      const period = index < 12 ? 'AM' : 'PM';
  
      return {
        label: `${startHour}:00 ${period} - ${endHour}:00 ${period}`,
        selected: false,
        confirmed: false,
      };
    });
  
    this.availableTimeSlots = timeSlots;
  }
  

  closeTime(){
    this.Time=false
  }



  private updateTimeSlotsWithAppointments(appointments: IApiAppointment[]): void {
    console.log('Received Appointments:', appointments);
    const dataArr = appointments.length > 0 ? appointments[0].data : [];


    this.availableTimeSlots.forEach(timeSlot => {
      console.log('Checking time:', timeSlot.label);
      console.log(dataArr, "appointment");

    const appointment = dataArr.find(data => data.time === timeSlot.label);
  
      
    if (appointment) {
      // Appointment is scheduled
      timeSlot.selected = true;
      if (appointment.userId) {
        // Appointment has a userId, mark it as confirmed
        timeSlot.confirmed = true;
      }
    }
  })
    };
    

 
  
  selectTimeSlot(selectedSlot: { label: string; selected: boolean ; disabled?: boolean }): void {
    if (!selectedSlot.disabled) {
      console.log('Selected Time Slot:', selectedSlot.label);

      selectedSlot.selected = true;

    selectedSlot.selected = true;
   
   
    this.http.post('/callprovider/save-time-slot', { time: selectedSlot.label })
    .subscribe({
      next: () => {
        console.log('Time slot saved successfully');
        this.Time = false; // Set this.Time to false after success
      },
      error: (error) => {
        console.error('Error saving time slot:', error);
      }
    });
  
  
    
  }
}
ngOnDestroy(): void {
  
  this.subscriptions.unsubscribe();
}
}