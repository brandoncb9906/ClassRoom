import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/servicios/notes.service';
import { Note } from '../interfaces/note';
import * as moment from "moment"; 
import { wsServices } from "../../servicios/ws-services";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public note: Note;

  constructor(private route: ActivatedRoute, private notesService: NotesService,
     private navCtrl: NavController, private wsService: wsServices) { 

    // Initialise a placeholder note until the actual note can be loaded in
    this.note = {
      id: '',
      title: '',
      date: moment().toISOString(),
      content: '',
      inDB: true,
    };

  }

  ngOnInit() {

    // Get the id of the note from the URL
    let noteId = this.route.snapshot.paramMap.get('id');
    console.log(`noteId = ${noteId}`);

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if(this.notesService.loaded){
      console.log("notes service is loaded, setting note");
      this.note = this.notesService.getNote(noteId);
      console.log(`this.note = ${JSON.stringify(this.note)}`);
      console.log("Full list of notes: " + JSON.stringify(this.notesService.notes));
    } else {
      console.log("notes service is not loaded, setting note");
      this.notesService.load().then(() => {
        console.log("NotesService loaded, finding note");
        this.note = this.notesService.getNote(noteId);
        console.log(`this.note = ${JSON.stringify(this.note)}`);
        console.log("Full list of notes: " + JSON.stringify(this.notesService.notes));
      });
    }

  }

  noteChanged(){
    console.log("note.date >>> " + this.note.date);
    this.notesService.save();
    console.log(this.note);
  }

  onChange() {
    console.log(`Selected date: ${this.note.date}`);
  }

  deleteNote(){
    this.notesService.deleteNote(this.note);
    this.navCtrl.navigateBack('/teacher-admi-group');
  }

  goBack(){
    console.log("this.note " + this.note);
    if (!this.note.inDB) {
      this.wsService.insertarTarea(this.note)
      .then(res => {
        this.note.inDB = res.status === 200;
      })
      .catch(console.error);
    }
    this.navCtrl.navigateBack("/teacher-admi-group");
  }
}