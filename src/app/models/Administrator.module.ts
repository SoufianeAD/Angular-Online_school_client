import ObjectID from 'bson-objectid';
import {School} from './School.module';
import {NgModule} from '@angular/core';
import {Account} from './Account.module';


@NgModule()
export class Administrator {
  id: ObjectID;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  account: Account;
  constructor(){}
}
