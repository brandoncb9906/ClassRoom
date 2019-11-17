import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { wsServices } from "../../../servicios/ws-services";
import { TareasEncargado } from '../../../app/interfaces/TareasEncargado';
import * as moment from "moment"; 

@Component({
  selector: 'app-manager-student-home',
  templateUrl: './manager-student-home.page.html',
  styleUrls: ['./manager-student-home.page.scss'],
})
export class ManagerStudentHomePage implements OnInit {
  
  public user: any = {};
  public listaTareas: TareasEncargado[] = [];

  constructor(public authService: AuthService, private alertController: AlertController,
    private menuCtrl: MenuController, private wsService: wsServices) {
      this.listaTareas.push({
        nombre: '',
        apellido1: '',
        apellido2: '',
        nombreTarea: '',
        enunciado: '',
        fechaEntrega: moment().toISOString()
      });
    this.authService.aFauth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.user.nombre = user.displayName;
      this.user.email = user.email;
      this.user.foto = user.photoURL;
      console.log("CORREO A ENVIAR: " + this.user.email);
      this.wsService.getTareasEstudiante(this.user.email).then(res => {
        console.log("Get Tareas"+JSON.stringify(res.data.response.data));
        this.listaTareas = res.data.response.data.map(n => ({
          nombre: n.nombre,
          apellido1: n.apellido1,
          apellido2: n.apellido2,
          nombreTarea: n.nombreTarea,
          enunciado: n.enunciado,
          fechaEntrega: n.fechaEntrega  
        }));
        //this.notesService.save();
        console.log(`After processing: ${JSON.stringify(this.listaTareas)}`);
        
        //notesService.notes = res.data.response.data.map(n => n.nombreGrupo);
      })
    });

  }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  async onLogout(){
    const alert = await this.alertController.create({
      message: "Are you sure to <strong>log out</strong>?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          
        },{
          text: 'Yes',
          handler : () => {
            this.authService.logout();
          }
        }]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
}
