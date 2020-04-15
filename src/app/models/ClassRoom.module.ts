import {NgModule} from '@angular/core';
import ObjectID from 'bson-objectid';
import {School} from './School.module';

@NgModule()
export class ClassRoom {
  id: ObjectID;
  name: string;
  level: string;
  school: School;
  constructor(){}
}
