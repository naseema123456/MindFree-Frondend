import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApiAllMsg } from 'src/app/model/notification';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

modal=false
  responseData: any = null;
  selectedData: any = null;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<IApiAllMsg>('/admin/getMessages').subscribe(
      (response: IApiAllMsg) => {
        this.responseData = response.data;
        console.log(this.responseData );
   
      },
      (error) => {
        console.error(error);
        // Handle error if needed
      }
    );
  }
  showModal(id:string){  
    this.selectedData = this.responseData.find((item: { _id: string; }) => item._id === id);
    console.log(this.selectedData,"selectedData");
    
this.modal=true
  }

  closeModal(){
    this.modal=false
  }
}
