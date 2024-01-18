import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { type Socket, io } from 'socket.io-client'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket!: Socket;


  connectSocket (id: string): void {
    this.socket = io(environment.baseUrl, { query: { id } })

  }

  listen (eventName: string): Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on(eventName, (data) => {
        subscribe.next(data)
      })
    })
  }

  emit (eventName: string, data: any): void {
    console.log('Emitting data:', data);
    this.socket.emit(eventName, data)
  }

  disconnectSocket (): void {
    this.socket.disconnect()
  }
}