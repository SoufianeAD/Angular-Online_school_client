import { Injectable } from '@angular/core';

import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import ObjectID from 'bson-objectid';
import {Administrator} from '../models/Administrator.module';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  administrators: Administrator[] = [];
  administratorSubject = new Subject<Administrator[]>() ;
  url = 'http://localhost:8080/administrator';
  constructor(private  http: HttpClient) { }


  emitAdministratorSubject() {
    this.administratorSubject.next(this.administrators);
  }


  createNewAdministrator(administrator: Administrator) {
    this.administrators.push(administrator);
    this.emitAdministratorSubject();
    return this.http.post<boolean>(this.url + '/add' , administrator ).subscribe(
      (data) => {
        this.getAdministrators();
        console.log('create');
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }
  getAdministrators() {
    this.http.get<Administrator[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.administrators = data;
        this.emitAdministratorSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getAdministratorById(id: ObjectID) {
    const administrator = this.administrators.find(
      (ad) => {
        return ad.id === id;
      }
    );
    return administrator;
  }
  deleteAdministrator(id: ObjectID) {
    const index = this.administrators.indexOf(this.getAdministratorById(id));
    this.administrators.splice(index, 1);
    this.emitAdministratorSubject();
    this.http.delete(this.url + '/delete/' + id)
      .subscribe(
        ()  => {
          this.getAdministrators();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }

  updateAdministrator(administrator: Administrator) {
    this.http
      .put<any>(this.url + '/update', administrator)
      .subscribe(
        () => {
          this.getAdministrators();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getAdministratorList() {
    this.getAdministrators();
    return this.administrators;
  }
}
