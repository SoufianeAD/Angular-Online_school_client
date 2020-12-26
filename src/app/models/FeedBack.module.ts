import {NgModule} from '@angular/core';
import {Student} from './Student.module';
import {Homework} from './Homework.module';

@NgModule()
export class FeedBack {

  id: number;
  delivredDateTime: Date;
  homework: Homework;
  student: Student;
  constructor(){}
}
