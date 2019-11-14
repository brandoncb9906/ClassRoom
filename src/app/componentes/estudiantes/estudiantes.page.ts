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
    private wsService: wsServices) {

      /*this.wsService.getGrupos("").then(res => {
        console.log("Get Grupos"+JSON.stringify(res.data));
        this.groupsList = res.data.response.data.map(n => n.nombreGrupo);
      })*/
     }

    public flag = false;

    public datosEstudiante = {
      nombre: '',
      apellido1: '',
      apellido2: '',
      carnet: '',
      correoEncargado: ''
    }

  ngOnInit() {
    this.estudianteService.estudiantes = [];
    this.wsService.getEstudiantes("").then(res => {
      console.log("Get Estudiantes"+JSON.stringify(res.data.response.data));
      this.estudianteService.estudiantes = res.data.response.data.map(n => ({
        id: "" + n.id_estudiante,
        nombre: n.nombre,
        apellido1: n.apellido1,
        apellido2: n.apellido2,
        carnet: n.carnet_estudiante[0],
        correoEncargado: n.correo_encargado,
      }));
      //this.notesService.save();
      console.log(`After processing: ${JSON.stringify(this.estudianteService.estudiantes)}`);
      
      //notesService.notes = res.data.response.data.map(n => n.nombreGrupo);
    })
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
              this.flag = true;
              this.estudianteService.createNote(data.nombre,data.apellido1,data.apellido2,data.carnet,data.correoEncargado);
            }
          }
        ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    if(this.flag){
      this.datosEstudiante.nombre = result.data.values.nombre;
      this.datosEstudiante.apellido1 = result.data.values.apellido1;
      this.datosEstudiante.apellido2 = result.data.values.apellido2;
      this.datosEstudiante.carnet = result.data.values.carnet;
      this.datosEstudiante.correoEncargado = result.data.values.correoEncargado;
      this.guardarEstudiante();
    }
  }

  //Metodo para guardar estudiantes
  guardarEstudiante(){
    this.wsService.insertarEstudiante(this.datosEstudiante);
  }

  goBack(){
    this.router.navigate(['/teacher-admi-group']);
  }
}
