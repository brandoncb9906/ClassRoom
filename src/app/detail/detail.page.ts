import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/servicios/notes.service';
import { Note } from '../interfaces/note';
import * as moment from "moment"; 

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public note: Note;
  public date = moment().format("YYYY-MM-DD");

  constructor(private route: ActivatedRoute, private notesService: NotesService, private navCtrl: NavController) { 

    // Initialise a placeholder note until the actual note can be loaded in
    this.note = {
      id: '',
      title: '',
      date: this.date,
      content: ''
    };

  }

  ngOnInit() {

    // Get the id of the note from the URL
    let noteId = this.route.snapshot.paramMap.get('id');

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if(this.notesService.loaded){
      this.note = this.notesService.getNote(noteId)
    } else {
      this.notesService.load().then(() => {
        this.note = this.notesService.getNote(noteId)
      });
    }

  }

  noteChanged(){
    console.log("this.date >>> " +  this.date);
    console.log("note.date >>> " + this.note.date);
    this.date = moment().format("YYYY-MM-DD")
    this.notesService.save();
    console.log(this.note);

  }

  deleteNote(){
    this.notesService.deleteNote(this.note);
    this.navCtrl.navigateBack('/teacher-admi-group');
  }

}