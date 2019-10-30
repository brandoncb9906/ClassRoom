import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, NavController} from '@ionic/angular';
import { NotesService } from 'src/servicios/notes.service';


@Component({
  selector: 'app-teacher-admi-group',
  templateUrl: './teacher-admi-group.page.html',
  styleUrls: ['./teacher-admi-group.page.scss'],
})
export class TeacherAdmiGroupPage implements OnInit {

  constructor(public notesService: NotesService,
    private alertController: AlertController, 
    private navCtrl: NavController,
    private router: Router){

  }

  ngOnInit() {
  }

  addNote(){

    this.alertController.create({
      header: 'Nueva Tarea',
      message: '¿Cual es el titulo de la tarea?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            this.notesService.createNote(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });

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
