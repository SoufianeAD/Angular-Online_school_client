import {NgModule} from '@angular/core';
import ObjectID from 'bson-objectid';
import {Student} from './Student.module';
import {Session} from './Session.module';

@NgModule()
export class Absence {

  id: ObjectID;
  student: Student;
  session: Session;

  constructor(){}
}
