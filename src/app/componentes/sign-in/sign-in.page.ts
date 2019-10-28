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

  public datos = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    password: '',
    iAm: ''
  }


  constructor(public router: Router, private authService: AuthService,
    private wsService: wsServices) { }

  ngOnInit() {
  }

  //Metodo para cambiar el tipo
  onChange(type: any){
    if(type==1){
      this.datos.iAm = 'Profesor';
    }
    if(type==2){
      this.datos.iAm = 'Encargado';
    }
  
  }

  //Metodo para registrar al usuario en el firebase y en la base de datos
  onSubmitSignIn(){
    this.authService.register(this.datos.email,this.datos.password).then(authService =>{
      console.log(authService)
      if(this.datos.iAm == 'Profesor'){
        console.log("profesoooor")
        //LLamar a metodo de insertar profesor
        this.wsService.insertarProfesor(this.datos);
      }
      if(this.datos.iAm == 'Encargado'){
        console.log("encargadooo")
        //LLamar a metodo de insertar encargado
        this.wsService.insertarEncargado(this.datos);
      }
      this.router.navigate(['/login']);
    }).catch(err => console.log(err))
  }

  goBack(){
    this.router.navigate(['/login']);
  }
}
