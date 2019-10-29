import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const axios = require('axios');

@Injectable({
  providedIn: 'root'
})

export class wsServices {

  ws_url = "http://localhost:3000/";
  institucionActual: '';

constructor() { }
  
  // se realizan todos los requests necesarios para la comunicacion con el backend
  
  //Enviar datos para el registro
  //Metodo para enviar los datos al backend para insetar un profesor 
  insertarProfesor(req: any){
    axios.post(this.ws_url + 'agenda/addProfesor', {
      nombre: req.nombre,
      apellido1: req.apellido1,
      apellido2: req.apellido2,
      correo: req.email,
      tipo: req.iAm
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
      correo: req.email,
      tipo: req.iAm
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //Metodo para enviar los datos al backend para insetar una institucion
  insertarInstitucion(req: any){
    axios.post(this.ws_url + 'agenda/addInstitucion', {
      nombre: req.nombre,
      correo: req.usuario
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //Metodo para enviar los datos al backend para insetar una institucion
  insertarGrupos(req: any){
    axios.post(this.ws_url + 'agenda/addGrupo', {
      nombreGrupo: req.nombreGrupo,
      codigoGrupo: req.codigoGrupo
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //Metodo para enviar los datos al backend para guardar el nombre de la institucion
  sendNameI(req: any){
    console.log("NOMBRE?"+req)
    axios.post(this.ws_url + 'agenda/sendNameI', {
      nombre: req
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //Metodo para enviar los datos al backend para guardar el nombre del grupo
  sendNameG(req: any){
    console.log("NOMBRE?"+req)
    axios.post(this.ws_url + 'agenda/sendNameG', {
      nombre: req
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

}