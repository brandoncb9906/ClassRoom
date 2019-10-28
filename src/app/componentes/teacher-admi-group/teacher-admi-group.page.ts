import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-teacher-admi-group',
  templateUrl: './teacher-admi-group.page.html',
  styleUrls: ['./teacher-admi-group.page.scss'],
})
export class TeacherAdmiGroupPage implements OnInit {

  constructor(public router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async addHomeWork(){
    const alert = await this.alertController.create({
      header: 'Tareas',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'name2',
          type: 'text',
          placeholder: 'Descripción'
        },
        {
          name: 'name3',
          type: 'date'
        }
      ],
      buttons: ['Cancelar','Aceptar']
    })
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result.data.values.name3);
  }

  goBack(){
    this.router.navigate(['/teacher-groups']);
  }
}
