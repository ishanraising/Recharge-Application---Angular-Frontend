import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recharge',
  standalone: true,
  imports: [AppComponent,ReactiveFormsModule],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.css'
})
export class RechargeComponent {
  constructor(private http:HttpClient,private route : Router){}
  email = new FormControl("",[
    Validators.required,
    Validators.email
  ])
  mobNo = new FormControl("",[
    Validators.maxLength(10),
    Validators.minLength(10),
    Validators.required
  ])
  service = new FormControl("",[
   Validators.required
  ])
  ammount = new FormControl("",[
    Validators.required,
    // Validators.min(20),
    // Validators.max(4000)
   ])

  rechargeFoam=new FormGroup({
    email : this.email,
    mobNo : this.mobNo,
    service : this.service,
    ammount :this.ammount
  })
  recharge(){
    if(this.rechargeFoam.valid){
      const email=this.rechargeFoam.value.email
      const ammount=this.rechargeFoam.value.ammount
      this.http.put(`http://localhost:8081/api/customer/recharge/${email}/${ammount}`,{}).subscribe({

        next : (result)=>{
          if(result != null){
            console.log(result)
            alert("Recharge Successful")
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
    }
  }
}
