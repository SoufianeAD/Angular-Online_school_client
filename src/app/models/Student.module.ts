import {NgModule} from '@angular/core';
import ObjectID from 'bson-objectid';
import {Account} from './Account.module';


@NgModule()
export class Student {
  id: ObjectID;
  cne: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  account: Account;

  constructor(){}
}
