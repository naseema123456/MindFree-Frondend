// import { Component, OnInit } from '@angular/core';
// import Peer from 'peerjs';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-vedio',
//   templateUrl: './vedio.component.html',
//   styleUrls: ['./vedio.component.css']
// })
// export class VedioComponent implements OnInit {
//   private peer!: Peer;
//   peerIdShare!:string ;
//   peerId:string | undefined;
//   private lazyStream:any;
//   currentPeer:any;
//   private peerList:Array<any> | undefined=[]

//   constructor(
//     private route: ActivatedRoute,
//   ) {
//     this.peer = new Peer();
//   }

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.peerId = params['id']
//       this.peerIdShare = params['reciver']
//       ;})
//     this.getPeerId()
//   }
// private getPeerId=()=>{
//   // this.peer.on('open',  (id)=>{
//   //   this.peerId=id
//   // })
//   this.peer.on('call',(call)=>{
//     navigator.mediaDevices.getUserMedia({
//       video:true,
//       audio:true
//     }).then((stream)=>{
//       this.lazyStream=stream

//       call.answer(stream);
//       call.on('stream',(remoteStream)=>{
//         if(!this.peerList?.includes(call.peer)){
//           this.streamRemoteVideo(remoteStream);
//           this.currentPeer=call.peerConnection
//           this.peerList?.push(call.peer)
//         }
//       })
//     }).catch(err=>{
//       console.log(err.message+"Unable to connect");
      
//     })
//   })
// }


// connectedWithPeer():void{
//   this.callPeer(this.peerIdShare)
// }

// private callPeer(id:string):void{
//   navigator.mediaDevices.getUserMedia({
//     video:true,
//     audio:true
//   }).then((stream)=>{
//     this.lazyStream=stream

//     console.log(id,stream);
    
//     const call=this.peer?.call(id,stream)

//     call.on('stream',(remoteStream)=>{
//       if(!this.peerList?.includes(call?.peer)){
//         this.streamRemoteVideo(remoteStream);
//         this.currentPeer=call?.peerConnection;
//         this.peerList?.push(call?.peer)
//       }
//     })
//   }).catch(err=>{
//     console.log(err+"Unable to connect");
    
//   })
// }
 
// private streamRemoteVideo(stream:any):void{
//   const video=document.createElement('video');
//   video.classList.add('video');
//   video.srcObject=stream
//   video.play();

//   document.getElementById('remote-video')?.append(video)
// }
// connectWithPeer():void{
//   this.callPeer(this.peerIdShare)

// }

// }



// vedio.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import Peer from 'peerjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vedio',
  templateUrl: './vedio.component.html',
  styleUrls: ['./vedio.component.css']
})
export class VedioComponent implements OnInit, OnDestroy {
  private peer!: Peer;
  peerIdShare!: string;
  bookingId: any;
  peerId: string | undefined;
  private lazyStream: any;
  currentPeer: any;
  private peerList: Array<any> | undefined = [];
  id:any

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute) {
    this.peer = new Peer();
   
  }

  ngOnInit(): void {
    const Uid=localStorage.getItem("id")
    this.route.queryParams.subscribe(params => {
      this.bookingId = this.route.snapshot.paramMap.get('id');
      console.log(this.bookingId,"booking")
      this.http.get<any>(`/user/video/${this.bookingId}`).subscribe(
        (response: any) => {
          console.log(Uid,"useID");
          console.log(Uid===response[0].userId,"cheking");
          
          if(Uid==response[0].userId){
            console.log("user");
            
            this. peerId=response[0].userId

            this.peerIdShare=response[0].callprovider
          }else{
            console.log("callprovider");
            
            this. peerId=response[0].callprovider

            this.peerIdShare=response[0].userId
          }
          console.log(this.peerId,"peerid",this.peerIdShare,"peeridshare");
          
          console.log('ngOnInit called');
         this.getPeerId();
         })
    });
  }

  ngOnDestroy(): void {
    this.peer.destroy();
  }

  private getPeerId = () => {
    console.log("hi");
    console.log('Before binding call event');
   console.log(this.peer.on,"...");
   
   this.peer.on('call', (call) => {
    console.log('Received a call:', call);
    // Handle the call...
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        this.lazyStream = stream;
        console.log('User media stream obtained:', stream);
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          console.log('Received remote stream:', remoteStream);
          console.log(call);
          
          if (!this.peerList?.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream);
            this.currentPeer = call.peerConnection;
            this.peerList?.push(call.peer);
            console.log('Stream processed and added to the peer list.');
          }
        });
      }).catch(err => {
        console.error(err.message + ' Unable to connect. Please check your camera and microphone permissions.');
      });
    });
  }

  connectedWithPeer(): void {
    this.callPeer(this.peerIdShare);
  }

  private callPeer(id: string): void {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      this.lazyStream = stream;

      console.log(id, stream)
      const call = this.peer?.call(id, stream);

      console.log(call.on);
      
      call.on('stream', (remoteStream) => {
        console.log('Before streamRemoteVideo');
        if (!this.peerList?.includes(call?.peer)) {
          this.streamRemoteVideo(remoteStream);
          this.currentPeer = call?.peerConnection;
          this.peerList?.push(call?.peer);
        }
        console.log('After streamRemoteVideo');
      });
    }).catch(err => {
      console.error(err + ' Unable to connect. Please check your camera and microphone permissions.');
    });
  }

  private streamRemoteVideo(stream: MediaStream | null): void {
    console.log('Inside streamRemoteVideo');
  
    if (stream) {
      console.log('Stream is not null');
      const video = document.createElement('video');
      video.classList.add('video');
      video.srcObject = stream;
      video.play();
  
      document.getElementById('remote-video')?.append(video);
    } else {
      console.log('Stream is null');
    }
  }
  

  connectWithPeer(): void {
    this.callPeer(this.peerIdShare);
  }
}
