import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, } from '@angular/core';
import { User } from 'src/app/model/usermodel';
import { IApiAppointment, Appointment } from 'src/app/model/appoinment';
import { ServiceService } from '../../../service/service.service';
import { Chat, Messages } from 'src/app/model/message';
import { SocketIoService } from 'src/app/service/socket-io.service';
import { Router } from '@angular/router';

interface Conversation {
  _id: string;
  message: string;
  conversationId: string;
  members: string[];

}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {
  @Input() conversation!: Conversation;
  @Input() currentUserId!: string;

  waitingForLink: boolean = false;
  public chat: boolean = false;
  user: User | null = null;
  messageInput: string = '';
  firstName: string = "";
  chats: Chat[] = [];
  messages: any[] = [];
  public appointmentsData: Appointment[] = [];
  public appointmentDetails: { receiverid: string; firstName: string; lastName: string }[] = [];
  activeChatReceiverid: string | undefined;
  activeChatUserId!: string | undefined;
  reciver:string|undefined
  public matchingAppointmentTime: string | null = null;
  socket: any;
  receivedData: any = null; 
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private socketService: SocketIoService,
    private service: ServiceService,
  ) {
    const storedId = localStorage.getItem('id');
    if (storedId !== null) {
      this.activeChatUserId = storedId;
      socketService.connectSocket(this.activeChatUserId);
    }

  }

  ngOnInit(): void {

    const storedId = localStorage.getItem('id');
    console.log(storedId, 'storeId');

    if (storedId !== null) {
      this.activeChatUserId = storedId;
      this.socketService.connectSocket(this.activeChatUserId);
    }

    this.loadAllAppoinment()

    this.socketService.listen('recieve-message').subscribe((data) => {
      console.log('Received data from receive-message:', data);
      this.updateMessage(data)
    });
  
    this.socketService.listen('link-event').subscribe((linkValue: string) => {
      if (linkValue) {
        this.waitingForLink = true;
        // Handle the received link as needed
        console.log('Received Link:', linkValue);
      }
    });

    
  this.socketService.listen('recieve-video').subscribe((data) => {
    console.log("....................................");
    
    console.log('Received data from receive-video:', data);
    this.receivedData = data;

  });

  }

  updateMessage(res: Chat): void {
    if (res == null) return;
    console.log(res, 'data from update message');
    this.chats = [res];
    console.log('Updated chat messages:', this.chats);
  }



  sendMessage(): void {
    console.log(this.messageInput, "inpu");

    let sendmessage: any | undefined;
    if (this.activeChatUserId !== undefined && this.activeChatReceiverid !== undefined) {
      sendmessage = {
        sender: this.activeChatUserId,
        receiver: this.activeChatReceiverid,
        messages: this.messageInput
      };
      console.log(sendmessage);

    }

    if (sendmessage) {
      if (this.activeChatUserId !== undefined && this.activeChatReceiverid !== undefined) {
        const newMessage: Messages = {
          text: this.messageInput,
          timestamp: new Date().toISOString(),
          // Add other properties as needed
        };

        this.chats.push({
          sender: this.activeChatUserId,
          receiver: this.activeChatReceiverid,
          messages: [newMessage]  // Ensure it's an array with the new message
        });
      }


      this.socketService.emit('chatMessage', sendmessage);

      this.messageInput = '';
    }

  }

  nextAppointmentTime: string | null = null;
  ngOnDestroy(): void {
    this.socketService.disconnectSocket()
  }

  // Update your loadAllAppoinment() method
  loadAllAppoinment(): void {
    this.service.loadAllAppoinment().subscribe({
      next: (response: IApiAppointment) => {
        console.log(response);

        if (response.success) {
          this.appointmentsData = response.data ? response.data : [];
          console.log(this.appointmentsData, "response load appointment");


          // Check if the current time matches any appointment time
          const currentTime = new Date();

          let formattedCurrentTime: string;
          const currentHours = currentTime.getHours();
          if (currentHours >= 12) {
            // After 12 PM
            formattedCurrentTime =
              (currentHours - 12).toString() + ':' + (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes() + ' PM';
          } else {
            // Before 12 PM
            formattedCurrentTime =
              currentHours.toString() + ':' + (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes() + ' AM';
          }


          this.appointmentsData.forEach(appointment => {
            // console.log('Original Start Time:', appointment.time);
            function isCallProvider(obj: any): obj is {
              _id?: string;
              firstName?: string;
              lastName?: string;
            } {
              return typeof obj === 'object' && obj !== null;
            }
            if (isCallProvider(appointment.callprovider)) {
              const receiverid = appointment.callprovider?._id || '';
              const firstName = appointment.callprovider?.firstName || '';
              const lastName = appointment.callprovider?.lastName || '';

              const senserId = appointment.userId

              this.activeChatUserId = senserId
              this.appointmentDetails.push({ receiverid, firstName, lastName });

              // Rest of your logic...
            }
            if (isCallProvider(appointment.userId)) {
              const receiverid = appointment.userId?._id || '';
              const firstName = appointment.userId?.firstName || '';
              const lastName = appointment.userId?.lastName || '';

              const senserId = appointment.callprovider
              this.activeChatUserId = senserId

              this.appointmentDetails.push({ receiverid, firstName, lastName });
            }
            const startEndTimes = appointment.time.split(' - ').map(time => {
              // Log the time for debugging
              // console.log('Processing Time:', time);
              // Convert 24-hour format to 12-hour format using formatTime24To12 method
              return this.formatTime24To12(time);
            });


            const [startTime, endTime] = startEndTimes;
            // console.log('Formatted Current Time:', formattedCurrentTime);
            // console.log('Formatted Appointment Start Time:', startTime);
            // console.log('Formatted Appointment End Time:', endTime);

            const isMatching = formattedCurrentTime >= startTime 
            && formattedCurrentTime <= endTime
            // console.log('Is Matching:', isMatching);
            // console.log('Is Matching:', isMatching);
            // console.log('Current Time:', currentTime);
            // console.log('Start Time:', startTime);
            // console.log('End Time:', endTime);
            // console.log(
            //   'Comparison Result:',
            //   formattedCurrentTime >= startTime,
            //   formattedCurrentTime <= endTime
            // );
            // Save the matching appointment time
            if (isMatching) {
              this.matchingAppointmentTime = appointment.time;
              console.log('Matching Appointment:', this.matchingAppointmentTime);
            } else if (formattedCurrentTime > startTime || formattedCurrentTime < startTime) {
              // Set the next appointment time only if the current time is before the appointment start time
              this.nextAppointmentTime = startTime;
              // console.log('Next Appointment:', this.nextAppointmentTime);
            } else {
              // Handle the case where neither isMatching nor the condition in else if is true
              console.log('No matching or next appointment found.');
            }

          });
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

  // Add this method to handle the "Start Appointment" button click
  startAppointment(): void {
    console.log('Starting Appointment:', this.matchingAppointmentTime);
  }
  formatTime24To12(time24: string): string {
    const [hours, minutes] = time24.split(':');

    let hours12 = parseInt(hours, 10);

    if (hours12 > 12) {
      hours12 -= 12;
    } else if (hours12 === 12) {
      hours12 = 12;
    }

    return `${hours12}:${minutes}`;
  }
  // formatTime24To12(time24: string): string {
  //   return time24;
  // }

  openChat(userId: string | undefined): void {
    if (userId) {
      this.chat = true;
      this.activeChatReceiverid = userId;

      this.http.get<any>(`/user/gethistory/${this.activeChatUserId}/${this.activeChatReceiverid}`).subscribe(
        (response: any) => {
          console.log(response, "history");
          this.chats = response.chat;
          // this.updateMessage(response.chat); 
        }
      );


    }
  }
  createRoom(time:string){
// console.log(time);
this.http.get<any>(`/user/getvideo/${this.activeChatUserId}/${time}`).subscribe(
  (response: any) => {
    console.log(response,"...........");
    this.reciver = response; 
    
    this.router.navigate([`/user/videocall/${response}`]);
  }
);
    
  }

  link(){
  console.log("hi");
  
    window.open(this.receivedData);
  }
  

}


