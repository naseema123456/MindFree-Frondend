import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { appUsers ,User } from 'src/app/model/usermodel';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  ngOnInit(): void {
    this.loadUsers();

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
