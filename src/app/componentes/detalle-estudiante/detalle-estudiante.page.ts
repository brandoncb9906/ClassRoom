import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/servicios/estudiante.service';
import { Estudiante } from 'src/app/interfaces/estudiantes';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-estudiante',
  templateUrl: './detalle-estudiante.page.html',
  styleUrls: ['./detalle-estudiante.page.scss'],
})
export class DetalleEstudiantePage implements OnInit {

  public estudiante: Estudiante;

  constructor(private route: ActivatedRoute, private estudianteService: EstudianteService, private navCtrl: NavController) { 

    // Initialise a placeholder note until the actual note can be loaded in
    this.estudiante = {
      id: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
      carnet: '',
      correoEncargado: ''
    };

  }

  ngOnInit() {

    // Get the id of the note from the URL
    let estudianteId = this.route.snapshot.paramMap.get('id');

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if(this.estudianteService.loaded){
      this.estudiante = this.estudianteService.getNote(estudianteId)
    } else {
      this.estudianteService.load().then(() => {
        this.estudiante = this.estudianteService.getNote(estudianteId)
      });
    }

  }

  noteChanged(){
    this.estudianteService.save();
  }

  deleteNote(){
    this.estudianteService.deleteNote(this.estudiante);
    this.navCtrl.navigateBack('/estudiantes');
  }
}
