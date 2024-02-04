import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(

    private http: HttpClient,
    private router: Router
  ) { }


  logout() {
    console.log('hiiiiii');

    // Log the user outid
    localStorage.removeItem('userToken');
    localStorage.removeItem('id');
    this.router.navigate(['/user/login']);

  }
}
