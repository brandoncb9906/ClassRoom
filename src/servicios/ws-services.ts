import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const axios = require('axios');

@Injectable({
  providedIn: 'root'
})

export class wsServices {

  ws_url = "http://localhost:3000/";

constructor() { }
  
  // se realizan todos los requests necesarios para la comunicacion con el backend
  
  //Enviar datos para el registro
  //Metodo para enviar los datos al backend para insetar un profesor 
  insertarProfesor(req: any){
    axios.post(this.ws_url + 'agenda/addProfesor', {
      nombre: req.nombre,
      apellido1: req.apellido1,
      apellido2: req.apellido2,
      correo: req.correo,
      tipo: req.tipo
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //Metodo para enviar los datos al backend para insetar un encargado
  insertarEncargado(req: any){
    axios.post(this.ws_url + 'agenda/addEncargado', {
      correo: req.correo
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  }