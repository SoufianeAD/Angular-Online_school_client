import {NgModule} from '@angular/core';
import ObjectID from 'bson-objectid';
import {Account} from './Account.module';
import {Level} from './Level.module';


@NgModule()
export class Student {
  id: number;
  cne: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  account: Account;
  level: Level;

  constructor(){}
}
