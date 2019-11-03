import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TeacherHomePage } from '../../componentes/teacher-home/teacher-home.page';
import { AlertController } from '@ionic/angular';
import { wsServices } from "../../../servicios/ws-services";
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-teacher-groups',
  templateUrl: './teacher-groups.page.html',
  styleUrls: ['./teacher-groups.page.scss'],
})
export class TeacherGroupsPage implements OnInit {

  groupsList = []

  public data = {
    nombreGrupo: '',
    nombreProfe: '',
    codigoGrupo: ''
  }

  constructor(public router: Router, 
    private alertController: AlertController,
    private wsService: wsServices,
    public authService: AuthService) { 

      
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
        },
        {name: 'codigo',
        type: 'text',
        placeholder: 'Codigo'
        }],
      buttons: ['Cancelar','Aceptar']
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    this.data.nombreGrupo = result.data.values.name;
    this.data.codigoGrupo = result.data.values.codigo;
    this.guardarGrupos();
    this.groupsList.push(result.data.values.name);
    console.log(result.data.values.name);
  }

  goToGroup(b){
    console.log("GRUPOOOO" + b);
    this.wsService.sendNameG(b);
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
