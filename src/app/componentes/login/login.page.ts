import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../../servicios/auth.service";
import { Router } from "@angular/router";
import { wsServices } from "../../../servicios/ws-services";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, public router: Router, private wsService: wsServices) { }

  email: string;
  password: string;
  public user: any;
  public name: any;
  public tipo: any;

  ngOnInit() {
    this.email = 'brandon@gmail.com';
    this.password = '123456';
  }

  onSubmitLogin()
  {
    this.authService.login(this.email,this.password)
    .then(res => {
      console.log("Get Tipo: " + this.email);
      
      this.wsService.getTipo(this.email)
      .then(r => {
        console.log(r.data.response.data.output.tipo);
        if(r.data.response.data.output.tipo == 'profesor'){
          this.router.navigate(['/teacher-home']);
        }
        else{
          this.router.navigate(['/manager-student-home']);
        }
        //r.data.response.data.output.tipo
        
      })
      .catch(console.error);
    })
    .catch(err => alert('Los datos son incorrectos o no existe el usuario'));
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
