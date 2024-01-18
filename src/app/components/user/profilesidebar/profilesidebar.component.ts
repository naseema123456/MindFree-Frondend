import { Component, OnInit } from '@angular/core';
import {userProfileSelector } from 'src/app/components/user/state/user.selectors';
import { Store, select } from '@ngrx/store'
import { UserModule } from '../user.module';
import { IApiAppointment,Appointment } from 'src/app/model/appoinment';
import { ServiceService } from '../../../service/service.service';

@Component({
  selector: 'app-profilesidebar',
  templateUrl: './profilesidebar.component.html',
  styleUrls: ['./profilesidebar.component.css']
})
export class ProfilesidebarComponent implements OnInit{


  public role: string = '';
  public appointmentsData: Appointment[] = [];

  constructor(
    private service: ServiceService,
    private store: Store<{userdetails:UserModule}>
  ){}


  userData$ = this.store.pipe(select(userProfileSelector)).subscribe( cleanedData => {
    console.log('hello');
    console.log(cleanedData, 'cleanedData');

    this.role = cleanedData.userdetails['data']['data'].role;
   
    
  })
  ngOnInit(): void {
    this.loadAllAppoinment()
  }
  loadAllAppoinment(): void {
    this.service.loadAllAppoinment().subscribe({
      next: (response: IApiAppointment) => {
        if (response.success) {
         this.appointmentsData  = response.data ? response.data : [];
          console.log(  this.appointmentsData , "response load appointment");
          // Process the data or update your component state as needed
        } else {
          console.error('Error loading appointments:', response.message);
          // Handle the error scenario appropriately (e.g., show a message to the user)
        }
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        // Handle the error scenario appropriately (e.g., show a message to the user)
      },
      complete: () => {
        // Optional: Any cleanup or finalization logic after the observable is complete
      }
    });
  }
  
  

}
