import {NgModule} from '@angular/core';
import {ClassRoom} from './ClassRoom.module';
import {Professor} from './Professor.module';


@NgModule()
export class Document {

  id: number;
  title: string;
  dateTime: Date;
  classRoom: ClassRoom;
  professor: Professor;
  constructor(){}
}
