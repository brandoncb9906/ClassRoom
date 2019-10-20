import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../../servicios/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, public router: Router) { }

  email: string;
  password: string;
  public user: any;
  public name: any;

  ngOnInit() {
  }

  onSubmitLogin()
  {
    this.authService.login(this.email,this.password).then(res => {
      this.router.navigate(['/teacher-home']);
    }).catch(err => alert('Los datos son incorrectos o no existe el usuario'));
  }

  signIn(){
    this.router.navigate(['/sign-in']);
  }


  // metodo de logueo con google mediante la utilizacion de la autentificacion de firebase
  signInWithGoogle(num: any) {
    this.authService.signInWithGoogle()
    .then(
      data => {
        this.user = data.user.displayName;
        this.name = data.user.displayName;
        //this.createNewProfile(data.user.uid);
        if(num==1){
          this.router.navigate(['/teacher-home']);
        }
        else{
          this.router.navigate(['/manager-student-home']);
        }
      }
    );
  }

}
