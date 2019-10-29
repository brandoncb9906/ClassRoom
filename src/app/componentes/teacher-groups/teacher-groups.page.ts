import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TeacherHomePage } from '../../componentes/teacher-home/teacher-home.page';
import { AlertController } from '@ionic/angular';
import { wsServices } from "../../../servicios/ws-services";

@Component({
  selector: 'app-teacher-groups',
  templateUrl: './teacher-groups.page.html',
  styleUrls: ['./teacher-groups.page.scss'],
})
export class TeacherGroupsPage implements OnInit {

  groupsList = []

  public data = {
    nombreGrupo: '',
    nombreInstucion: ''
  }

  constructor(public router: Router, 
    private alertController: AlertController,
    private wsService: wsServices) { 
     }

  ngOnInit() {
  }

  
  async addGroups(){ // Muestra una alerta para agregar el nombre de una institucion
    const alert = await this.alertController.create({
      header: "Agregar grupo",
      subHeader: "Digite el nombre del grupo: ",
      inputs: [
        {name: 'name',
        type: 'text',
        placeholder: 'Nombre'
        }],
      buttons: ['Cancelar','Aceptar']
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    this.data.nombreGrupo = result.data.values.name;
    this.guardarGrupos();
    this.groupsList.push(result.data.values.name);
    console.log(result.data.values.name);
  }

  goToGroup(){
    this.router.navigate(['/teacher-admi-group']);
  }

  //Metodo para guardar grupos
  guardarGrupos(){
    this.wsService.insertarGrupos(this.data);
  }

  goBack(){
    this.router.navigate(['/teacher-home']);
  }
}
