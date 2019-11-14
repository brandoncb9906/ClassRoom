import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, NavController} from '@ionic/angular';
import { NotesService } from 'src/servicios/notes.service';
import { wsServices } from "../../../servicios/ws-services";

@Component({
  selector: 'app-teacher-admi-group',
  templateUrl: './teacher-admi-group.page.html',
  styleUrls: ['./teacher-admi-group.page.scss'],
})
export class TeacherAdmiGroupPage implements OnInit {

  constructor(public notesService: NotesService,
    private alertController: AlertController, 
    private navCtrl: NavController,
    private router: Router,
    private wsService: wsServices){
      
  }

  ngOnInit() {
    this.notesService.notes = [];
    this.wsService.getTareas("").then(res => {
      console.log("Get Tareas"+JSON.stringify(res.data.response.data));
      this.notesService.notes = res.data.response.data.map(n => ({
        id: "" + n.id_tarea,
        title: n.nombreTarea,
        date: n.fechaEntrega,
        content: n.enunciado,
        inDB: true,
      }));
      this.notesService.save();
      console.log(`After processing: ${JSON.stringify(this.notesService.notes)}`);
      
      //notesService.notes = res.data.response.data.map(n => n.nombreGrupo);
    })
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

  /*async addHomeWork(){
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
  }*/

  goEstudiantes(){
    this.router.navigate(['/estudiantes']);
  }
  estudiantes
  goBack(){
    this.router.navigate(['/teacher-groups']);
  }
}
