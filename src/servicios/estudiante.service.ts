import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Estudiante } from '../app/interfaces/estudiantes';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {

  public estudiantes: Estudiante[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) { 

  }

  load(): Promise<boolean> {

    // Return a promise so that we know when this operation has completed
    return new Promise((resolve) => {

      // Get the notes that were saved into storage
      this.storage.get('estudiantes').then((estudiantes) => {

        // Only set this.notes to the returned value if there were values stored
        if(estudiantes != null){
          this.estudiantes = estudiantes;
        }

        // This allows us to check if the data has been loaded in or not
        this.loaded = true;
        resolve(true);

      });

    });

  }

  save(): void {
    // Save the current array of notes to storage
    this.storage.set('estudiantes', this.estudiantes);
  }

  getNote(id): Estudiante {
    // Return the note that has an id matching the id passed in
    return this.estudiantes.find(estudiante => estudiante.id === id);
  }

  createNote(nombre, apellido1, apellido2, carnet, correoEncargado): void {

    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.estudiantes.map(estudiante => parseInt(estudiante.id)), 0) + 1;

    this.estudiantes.push({
      id: id.toString(),
      nombre: nombre,
      apellido1: apellido1,
      apellido2: apellido2,
      carnet: carnet,
      correoEncargado: correoEncargado
    });

    this.save();

  }

  deleteNote(estudiante): void {

    // Get the index in the array of the note that was passed in
    let index = this.estudiantes.indexOf(estudiante);

    // Delete that element of the array and resave the data
    if(index > -1){
      this.estudiantes.splice(index, 1);
      this.save();
    }

  }

}