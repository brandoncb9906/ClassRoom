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

    this.instituteList.push("TEC");
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
      header: "Create Institucion",
      subHeader: "Type the name of the institution: ",
      inputs: [
        {name: 'name',
        type: 'text',
        placeholder: 'Institucion Name'
        }],
      buttons: ['Cancel','OK']
    });
    await alert.present();
    let result = await alert.onDidDismiss();

    this.instituteList.push(result.data.values.name);
    console.log(result.data.values.name);
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

  goToInstitute(){
    this.router.navigate(['/teacher-groups']);
    console.log(this.instituteActual);
  }
}
