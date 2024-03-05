import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { type Socket, io } from 'socket.io-client'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  // emitUserCall(arg0: { to: string; offer: any; }) {
  //   throw new Error('Method not implemented.');
  // }
  private socket!: Socket;
  // onUserDisconnected$: any;


  connectSocket (id: string): void {
    this.socket = io(environment.baseUrl, { query: { id } })
  }

  listen (eventName: string): Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on(eventName, (data) => {
        subscribe.next(data)
        console.log(data,"listen data");
      })
    })
  }

  emit (eventName: string, data: string): void {
    console.log('Emitting data:', data);
    this.socket.emit(eventName, data)
  }

  // emitJoinRoom( userId: string): void {
  //   console.log("emitJoinRoom");
    
  //   this.socket.emit('join-room', userId);
  // }
  // emitBlinkingSignal(): void {
  //   this.socket.emit('blinking-signal');
  // }

  disconnectSocket (): void {
    this.socket.disconnect()
  }
}