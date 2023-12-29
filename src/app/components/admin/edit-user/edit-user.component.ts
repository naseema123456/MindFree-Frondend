import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IApiUserRes,User } from 'src/app/model/usermodel';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  form: FormGroup;
  isSubmitted = false;
  user_id : string|number = ''; 
  isBlocked: boolean = false; 
  role : string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      isBlocked: ['', Validators.required],
      role: ['', Validators.required],
  
  
    });
 
  }


  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    // Retrieve userId from route parameters
    const user_id = this.route.snapshot.paramMap.get('userId');
    this.user_id = user_id !== null ? user_id : '';
   
      console.log('User ID in ngOnInit:', this.user_id );


      // Use userId in the HTTP request
      this.http.get<User>(`/admin/getUser/${this.user_id }`, { withCredentials: true }).subscribe(
        (response: User) => {
          console.log(response, "............");
          
          this.form.controls['isBlocked'].setValue(response.isBlocked);
          this.form.controls['role'].setValue(response.role);

        }
      );
   
  }


  onSubmit(): void {
    this.isSubmitted = true;
    let user = this.form.getRawValue();
    user.userId = this.user_id
  console.log('submit',user);


      this.http.post<IApiUserRes>('/admin/editUser', user, { withCredentials: true }).subscribe(
        (response:IApiUserRes) => {
          // console.log(response,"............");
          Swal.fire({
            icon: 'success',
            title: 'User updated successfully',
            showConfirmButton: false,
            timer: 1500, // Adjust the timer as needed
          });
  
          this.router.navigate(['/admin/users']);
        },
        (err) => {
          console.log(err);
          Swal.fire('Error', err.error.message, 'error');
        }
      );
    }
  }

