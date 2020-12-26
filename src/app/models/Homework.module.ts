import {NgModule} from '@angular/core';
import ObjectID from 'bson-objectid';
import {ClassRoom} from './ClassRoom.module';
import {Professor} from './Professor.module';
import {Document} from './Document.module';


@NgModule()
export class Homework extends  Document{
  delivringDateTime: Date;
  constructor(){
    super();
  }
}
