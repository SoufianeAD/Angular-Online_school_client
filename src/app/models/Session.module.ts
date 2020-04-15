import {NgModule} from '@angular/core';
import ObjectID from 'bson-objectid';
import {ClassRoom} from './ClassRoom.module';
import {Professor} from './Professor.module';

@NgModule()
export class Session{
  id: ObjectID;
  start: Date;
  end: Date;
  date: Date;
  idSession: string;
  password: string;
  classRoom: ClassRoom;
  professor: Professor;
  constructor(){}
}
