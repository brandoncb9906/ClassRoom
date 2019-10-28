import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class wsServices {

  ws_url = "http://localhost:3000/";

constructor() { }
  
  // se realizan todos los requests necesarios para la comunicacion con el backend
  
  // Enviar datos para el registro

  enviarRegistro(datos: any){
    
  }


  }