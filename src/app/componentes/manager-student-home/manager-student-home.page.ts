import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-manager-student-home',
  templateUrl: './manager-student-home.page.html',
  styleUrls: ['./manager-student-home.page.scss'],
})
export class ManagerStudentHomePage implements OnInit {
  
  public user: any = {};

  constructor(public authService: AuthService, private alertController: AlertController,
    private menuCtrl: MenuController) {
    this.authService.aFauth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.user.nombre = user.displayName;
      this.user.email = user.email;
      this.user.foto = user.photoURL;
    });
  }

  ngOnInit() {}

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
