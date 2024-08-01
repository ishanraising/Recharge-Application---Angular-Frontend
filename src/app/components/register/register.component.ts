import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AppComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private http : HttpClient , private router : Router){}

  email = new FormControl("",[
    Validators.required,
    Validators.email
  ])
  password = new FormControl("",[
    Validators.required,
    Validators.minLength(4)
  ])
  accNo = new FormControl("",[
    Validators.required,
    Validators.maxLength(4),
    Validators.minLength(4),
    Validators.min(1111)
  ])
  mobNo = new FormControl("",[
    Validators.maxLength(10),
    Validators.minLength(10),
    Validators.required
  ])
  accBal = new FormControl("",[
    Validators.required,
    
  ])
  userName = new FormControl("",[
    Validators.required,
    
  ])
  registranFoam = new FormGroup({
    email : this.email,
    mobNo : this.mobNo,
    password :this.password,
    accNo:this.accNo,
    accBal : this.accBal,
    userName:this.userName
  })
  
  register(){
    const customer={
      emailId :this.registranFoam.value.email,
      password:this.registranFoam.value.password,
      accBal:this.registranFoam.value.accBal,
      accNo:this.registranFoam.value.accNo,
      mobNo:this.registranFoam.value.mobNo,
      custName:this.registranFoam.value.userName
    }
    

    console.log(this.registranFoam.value);
    this.http.post("http://localhost:8081/api/customer",customer).subscribe({
      next: (result) => {
        if(result!=null){
          console.log(result)
          this.router.navigate(["/login"])
        }else{
          alert("Something wrong")
        }
      },
      error: (err) => {
        console.error('Registration failed:', err);
        // Handle error response, e.g., show an error message
      }
    })

    

    
  }
}
