import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { EstudianteService } from 'src/servicios/estudiante.service';
import { wsServices } from "../../../servicios/ws-services";

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {

  constructor(private router: Router,
    private alertController: AlertController,
    private estudianteService: EstudianteService,
    private wsService: wsServices) { }

    public datosEstudiante = {
      nombre: '',
      apellido1: '',
      apellido2: '',
      carnet: '',
      correoEncargado: ''
    }

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
    this.datosEstudiante.nombre = result.data.values.nombre;
    this.datosEstudiante.apellido1 = result.data.values.apellido1;
    this.datosEstudiante.apellido2 = result.data.values.apellido2;
    this.datosEstudiante.carnet = result.data.values.carnet;
    this.datosEstudiante.correoEncargado = result.data.values.correoEncargado;
    this.guardarEstudiante();
    console.log(result.data.values.name);
  }

  //Metodo para guardar estudiantes
  guardarEstudiante(){
    console.log("DATOS ESTUDIANTE");
    console.log(this.datosEstudiante.nombre);
    console.log(this.datosEstudiante.apellido1);
    console.log(this.datosEstudiante.apellido2);
    console.log(this.datosEstudiante.carnet);
    console.log(this.datosEstudiante.correoEncargado);
    this.wsService.insertarEstudiante(this.datosEstudiante);
  }

  goBack(){
    this.router.navigate(['/teacher-admi-group']);
  }
}
