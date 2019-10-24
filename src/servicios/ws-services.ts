import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

var ws_url = "http://localhost:3000/";

export class wsServices {

constructor(private http: HttpClient) { }
  
  // se realizan todos los requests necesarios para la comunicacion con el backend
  
  getConfig(id: string): Observable<Object> {
    return this.http.get(ws_url+"getGameConfig/"+id);
  }
  // request de status
  getStatus(id: string): Observable<Object> {
    return this.http.get(ws_url+"getGameStatus/"+id);
  }
  // request de movimiento
  positionMarked(j, k, id) {
  return this.http.post(ws_url+"positionMarked",{"row":j,"column":k,"id":id});
  }
  // request de nuevo juego
  createNewGame(gameConfig: any) {
  return this.http.post(ws_url+"newGame",gameConfig);
  }
  // request de turno automatico
  turnoAI(id) {
    return this.http.post(ws_url+"moveAI",{"id":id});
    }
  }