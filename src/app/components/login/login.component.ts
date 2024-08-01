import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { routes } from '../../app.routes';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppComponent,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  
  constructor(private http : HttpClient , private router : Router){}
   users : any = [];
   oldPass : string=""
    

  email = new FormControl("",[
    Validators.required,
    Validators.email
  ])
  password = new FormControl("",[
    Validators.required,
    Validators.minLength(4)
  ])

  loginForm=new FormGroup({
    email:this.email,
    password:this.password
  
  })

 


  login(){
    // console.log(this.loginForm.value)
    if(this.loginForm.valid){
     const email = this.loginForm.value.email
     const password = this.loginForm.value.password
     const params = new HttpParams()
     .set('email', this.email ? String(this.email) : '') // Convert to string if defined, otherwise set to empty string
     .set('password', this.password ? String(this.password) : '');
    this.http.get("http://localhost:8081/api/customer",{params}).subscribe({
      next : (result)=>{
        console.log(result);
        this.users = result;
        if(result != null){
        this.router.navigate(["/recharge"])
        }else{
          alert("Something went wrong try again")
        }
        
      },
      error : (err)=> {
        console.log(err);
        console.log((err.message));
        alert(err.message)
      }

    })
    
  }else{
    alert("--")
  }
}
}
