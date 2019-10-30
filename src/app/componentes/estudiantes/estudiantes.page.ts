import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { EstudianteService } from 'src/servicios/estudiante.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {

  constructor(private router: Router,
    private alertController: AlertController,
    private estudianteService: EstudianteService) { }

  ngOnInit() {
  }

  async addEstudiante(){ // Muestra una alerta para agregar un estudiante
    const alert = await this.alertController.create({
      header: "Agregar Estudiante",
      subHeader: "Digite los datos del estudiante: ",
      inputs: [
        {name: 'nombre',
        type: 'text',
        placeholder: 'Nombre'
        },
        {name: 'apellido1',
        type: 'text',
        placeholder: 'Primer Apellido'
        },
        {name: 'apellido2',
        type: 'text',
        placeholder: 'Segundo Apellido'
        },
        {name: 'carnet',
        type: 'text',
        placeholder: 'Carnet'
        },
        {name: 'correoEncargado',
        type: 'text',
        placeholder: 'Correo Encargado'
        }],
        buttons: [
          {
            text: 'Cancelar'
          },
          {
            text: 'Aceptar',
            handler: (data) => {
              this.estudianteService.createNote(data.nombre,data.apellido1,data.apellido2,data.carnet,data.correoEncargado);
            }
          }
        ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result.data.values.name);
  }

  goBack(){
    this.router.navigate(['/teacher-admi-group']);
  }
}
