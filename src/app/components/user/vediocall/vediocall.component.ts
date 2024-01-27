import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SocketIoService } from 'src/app/service/socket-io.service';
import { ActivatedRoute } from '@angular/router';
declare var JitsiMeetExternalAPI:any

@Component({
  selector: 'app-vediocall',
  templateUrl: './vediocall.component.html',
  styleUrls: ['./vediocall.component.css']
})
export class VediocallComponent implements OnInit,AfterViewInit {
  domin:string="meet.jit.si"
  room:any
  user:any
  api:any
  option:any
  inputValue: string = '';
  isAudioMuted=true;
  isVideoMuted=true
  form: FormGroup;
  id: string | undefined;
  activeChatUserId:string|undefined

  constructor(
    private route: ActivatedRoute,
    private socketIoService: SocketIoService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router:Router
  ){
 
    const storedId = localStorage.getItem('id');
    if (storedId !== null) {
      this.activeChatUserId = storedId;
      socketIoService.connectSocket(this.activeChatUserId);
    }
 
    this.form = this.fb.group({
      inputValue: ['', [Validators.required]],
  
    });
  }

ngOnInit(): void {

  this.route.params.subscribe(params => {
    this.id = params['id']; // Replace 'id' with your parameter's name
    console.log('ID from URL:', this.id);
  });
  this.room='jitsiMeetingApiExample';
  this.user={
    name:'coding wall'
  }
}
ngAfterViewInit(): void {
  this.option={
    roomName:this.room,
    width:900,
    height:500,
    configOverWrite:{proJoinPageEnable:false},
    interfaceConfigOverWrite:{
      TILE_VIEW_MAX_COLUMNA:8
    },
    parentNode:document.querySelector('#jitsi-iframe'),
    userInfo:{
      displayName:this.user.Name
    }
  }
  this.api=new JitsiMeetExternalAPI(this.domin,this.option)
  this.api.addEventListeners({
    redyToClose:this.handleClose,
    participantLeft:this.handleParticipantLeft,
    participantJoined:this.handleParticipantJoined,
    videoConferenceJoined:this.handleVideoConferenceJoined,
    videoConferenceLeft:this.handleVideoConferenceLeft,
    audioMuteStatusChanged:this.handleAudioMuteStatusChanged,
    videoMuteStatusChanged:this.handleVideoMuteStatusChanged
  })
}

handleClose=()=>{
console.log("handleClose");

}
handleParticipantLeft=async(participant:any)=>{
  const data=await this.getparticipant()
  
}
handleParticipantJoined=async(participant:any)=>{
  const data=await this.getparticipant()
}
handleVideoConferenceJoined=async(participant:any)=>{
  const data=await this.getparticipant()
}
handleVideoConferenceLeft=()=>{
this.router.navigate(['/user/profile'])
}
handleAudioMuteStatusChanged=(audio:any)=>{
console.log('handleAudioMuteStatusChanged',audio);

}
handleVideoMuteStatusChanged=(video:any)=>{
console.log('handleVideoMuteStatusChanged',video);

}
getparticipant(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(this.api.getParticipantsInfo())
    },500)
  })
}
executeCommant(command: string) {
  this.api.executeCommand(command);
  if(command=='hangup'){
    this.router.navigate(['/user/profile'])
  }
  if(command=='toggleAudio'){
    this.isAudioMuted=!this.isAudioMuted
  }
  if(command=='toggleVideo'){
    this.isVideoMuted=!this.isVideoMuted

}
}


// onSubmit() {
//   const inputValue = this.joinForm.get('inputValue')?.value;
//   console.log('Input Value:', inputValue);
//   }
onSubmit() {
  let sendvideo: any | undefined;
  const inputValue = this.form.value.inputValue;
  console.log('Form Value:', inputValue);

  // Emit an event with Socket.IO
  sendvideo= {
    link: inputValue,
    id: this.id,
    userId:this.activeChatUserId
  }
  this.socketIoService.emit('link-event', sendvideo)


}

}
