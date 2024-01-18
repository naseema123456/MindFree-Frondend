import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { appUsers ,User } from 'src/app/model/usermodel';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: appUsers[] = [];
  filteredUsers: appUsers[] = []; // Initialize here
  searchText: string = '';

  constructor(
    private service: ServiceService,
    private router: Router,
    private http: HttpClient,
    ) { }

    initializeComponent(): void {
      this.loadUsers();
    }
  ngOnInit(): void {
    this.initializeComponent();

  }

  loadUsers(): void {
    this.service.loadUsers().subscribe(
      (response: appUsers) => {
        if (response.success) {
          this.users = response.data ? [response] : [];
          this.filteredUsers = [...this.users]; 
          console.log(this.users);
        } else {
          console.error('Error loading users:', response.message);
        }
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }


  editUser(user:User,userId:string){
    this.router.navigate(['/admin/editUser',userId])
  }


  addUser(){
    this.router.navigate(['/admin/addUser',])
  }
  Blocked(isBlocked: boolean,_id:string): void {
 
    const data = { isBlocked: isBlocked ,_id:_id};
    console.log(data.isBlocked,data._id);
    
    this.http.post('/admin/Blocked',data, { withCredentials: true }).subscribe(
      (response) => {
     
        console.log(response,"............");
   
        Swal.fire({
          icon: 'success',
          title: 'User updated successfully',
          showConfirmButton: false,
          timer: 1500, // Adjust the timer as needed
        });
        this.initializeComponent();
     
      },
      (err) => {
        Swal.fire("Error", err.error.message, "error");
      }
    );
  }


  search(): void {
    console.log('Search called with searchText:', this.searchText);
    console.log('Users:', this.users);
  
    if (!this.searchText) {
      this.filteredUsers = [...this.users];
      return;
    }
  
    const flatUsers = this.users
      .flatMap((userGroup) => userGroup.data) // Use flatMap to flatten the nested array
      .filter((user): user is User => !!user);
  
    this.filteredUsers = flatUsers
      .filter((user) =>
        user.firstName.toLowerCase().includes(this.searchText.toLowerCase())
      )
      .map((user) => ({
        success: true, // Set based on your logic
        message: 'Found', // Set based on your logic
        data: [user], // Wrap the user in an array
      }));
  }
  
}
