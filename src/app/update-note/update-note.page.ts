import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';
import { Note } from '../modal/Note';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.page.html',
  styleUrls: ['./update-note.page.scss'],
})
export class UpdateNotePage implements OnInit, AfterViewInit {
  note: Note = {
    id: '',
    title: '',
    content: '',
    ft:'',
    createdAt: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private fbService: FirebaseService, private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.fbService.getNote(id).subscribe(noteData => {
        this.note = noteData;
      });
    }
  }

  updateNote() {
    this.fbService.updateNote(this.note).then(() => {
     this.router.navigate(['/']);
    }, err => {
    });
  }
}
