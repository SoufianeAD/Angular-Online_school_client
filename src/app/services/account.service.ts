import { Injectable } from '@angular/core';

import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import ObjectID from 'bson-objectid';

import {Account} from '../models/Account.module';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: Account[] = [];
  accountSubject = new Subject<Account[]>() ;
  url = 'http://localhost:8080/account';
  constructor(private  http: HttpClient) { }

  emitAccountSubject() {
    this.accountSubject.next(this.accounts);
  }

  createNewAccount(account: Account) {
    this.accounts.push(account);
    this.emitAccountSubject();
    return this.http.post<boolean>(this.url + '/add' , account ).subscribe(
      (data) => {
        this.getAccounts();
        console.log('create');
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }
  getAccounts() {
    this.http.get<Account[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.accounts = data;
        this.emitAccountSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getAccountById(id: ObjectID) {
    const account = this.accounts.find(
      (ac) => {
        return ac.id === id;
      }
    );
    return account;
  }
  deleteAccount(id: ObjectID) {
    const index = this.accounts.indexOf(this.getAccountById(id));
    this.accounts.splice(index, 1);
    this.emitAccountSubject();
    this.http.delete(this.url + '/delete/' + id)
      .subscribe(
        ()  => {
          this.getAccounts();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }

  updateAccount(account: Account) {
    this.http
      .put<any>(this.url + '/update', account)
      .subscribe(
        () => {
          this.getAccounts();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getAccountList() {
    this.getAccounts();
    return this.accounts;
  }
}
