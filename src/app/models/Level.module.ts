import {NgModule} from '@angular/core';
import ObjectID from 'bson-objectid';
import {School} from './School.module';
import {Homework} from './Homework.module';

@NgModule()
export class Level {

  id: ObjectID;
  title: string;
  school: School;
  constructor(){}
}
