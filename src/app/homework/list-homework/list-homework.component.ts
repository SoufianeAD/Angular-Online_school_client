import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {FileService} from '../../services/file.service';
import {Router} from '@angular/router';
import {Homework} from '../../models/Homework.module';
import {HomeworkService} from '../../services/homework.service';

@Component({
  selector: 'app-list-homework',
  templateUrl: './list-homework.component.html',
  styleUrls: ['./list-homework.component.scss']
})
export class ListHomeworkComponent implements OnInit {

  createForm: FormGroup;
  homeworks: Homework[] = [];
  documentsSubscription: Subscription;

  constructor(private fileService: FileService,
              private homeworkService: HomeworkService,
              public router: Router) { }

  ngOnInit(): void {
    this.init();
    this.documentsSubscription = this.homeworkService.homeworkSubject.subscribe(
      (homewroks: Homework[]) => {
        this.homeworks = homewroks;
      }
    );
    this.homeworkService.getHomeworks();
  }

  init(): void {
    this.createForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  onDetails(homework: Homework): void {
    this.homeworkService.currentHomework = homework;
    this.router.navigate((['homework/details']));
  }

  onSubmit() {
    const homework = new Homework();
    homework.title = this.createForm.get('title').value;
    // delivring date && time
    /*homework.classRoom = ;
    homework.professor = ;*/
    alert(JSON.stringify(document));
    this.homeworkService.createNewHomework(homework).subscribe(
      (data) => {
        this.homeworkService.getHomeworks();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
    this.createForm.setValue({
      title: ''
    });
  }

  onDelete(homework: Homework) {
    this.homeworkService.deleteHomework(homework.id);
  }

}
