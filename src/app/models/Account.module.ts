import {NgModule} from '@angular/core';
import ObjectID from 'bson-objectid';
import {School} from './School.module';

@NgModule()
export class Account {
  id: ObjectID;
  userName: string;
  password: string;
  school: School;
  constructor(){}
}
