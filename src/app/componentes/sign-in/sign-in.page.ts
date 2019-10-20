import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService} from "../../../servicios/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  public email: string;
  public password: string;
  public iAm: string;

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onChange(type){
    if(type==1){
      this.iAm = "Teacher";
    }else{
      this.iAm = "Student Manager";
    }
  }

  onSubmitSignIn(){
    this.authService.register(this.email,this.password).then(authService =>{
      console.log(authService)
      this.router.navigate(['/login']);
    }).catch(err => console.log(err))
  }

  goBack(){
    this.router.navigate(['/login']);
  }
}
