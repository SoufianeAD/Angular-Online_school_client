import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Homework} from '../../../models/Homework.module';
import {Subscription} from 'rxjs';
import {FileService} from '../../../services/file.service';
import {HomeworkService} from '../../../services/homework.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homework-list',
  templateUrl: './homework-list.component.html',
  styleUrls: ['./homework-list.component.scss']
})
export class HomeworkListComponent implements OnInit {

  createForm: FormGroup;
  homeworks: Homework[] = [];
  documentsSubscription: Subscription;

  constructor(private fileService: FileService,
              private homeworkService: HomeworkService,
              public router: Router) { }

  ngOnInit(): void {
    this.documentsSubscription = this.homeworkService.homeworkSubject.subscribe(
      (homewroks: Homework[]) => {
        this.homeworks = homewroks;
        this.homeworks.reverse();
      }
    );
    this.homeworkService.getHomeworks();
  }

  onDetails(homework: Homework): void {
    this.homeworkService.currentHomework = homework;
    this.router.navigate((['student/homework/details']));
  }
}
