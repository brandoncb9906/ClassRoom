import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService} from "../../../servicios/auth.service";
import { wsServices } from "../../../servicios/ws-services";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  public nombre: string;
  public apellido1: string;
  public apellido2: string;
  public email: string;
  public password: string;
  public iAm: string;

  constructor(public router: Router, private authService: AuthService, private wsService: wsServices) { }

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
      /** wsService */
      this.router.navigate(['/login']);
    }).catch(err => console.log(err))
  }

  goBack(){
    this.router.navigate(['/login']);
  }
}
