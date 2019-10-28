import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.page.html',
  styleUrls: ['./teacher-home.page.scss'],
})
export class TeacherHomePage implements OnInit {

  instituteList = []
  public usuario: any = {};
  public instituteActual: any;

  constructor(public router: Router, public authService: AuthService, 
    private menuCtrl: MenuController,
    private alertController: AlertController) {

    this.instituteList.push("Escuela Santa Clara");
    this.authService.aFauth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.email = user.email;
      this.usuario.foto = user.photoURL;
    });

  }

  ngOnInit() {
  }
  
  toggleMenu(){
    this.menuCtrl.toggle();
  }


  async addInstitution(){ // Muestra una alerta para agregar el nombre de una institucion
    const alert = await this.alertController.create({
      header: "Agregar Institución",
      subHeader: "Digite el nombre de la institución: ",
      inputs: [
        {name: 'name',
        type: 'text',
        placeholder: 'Nombre'
        }],
      buttons: ['Cancelar','Aceptar']
    });
    await alert.present();
    let result = await alert.onDidDismiss();

    this.instituteList.push(result.data.values.name);
    console.log(result.data.values.name);
  }

  async onLogout(){
    const alert = await this.alertController.create({
      message: "Desea <strong>salir</strong>?",
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

  goToInstitute(){
    this.router.navigate(['/teacher-groups']);
    console.log(this.instituteActual);
  }
}
