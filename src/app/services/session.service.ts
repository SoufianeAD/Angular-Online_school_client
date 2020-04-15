import { Injectable } from '@angular/core';

import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import ObjectID from 'bson-objectid';
import {Session} from '../models/Session.module';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessions: Session[] = [];
  sessionSubject = new Subject<Session[]>() ;
  url = 'http://localhost:8080/session';
  constructor(private  http: HttpClient) { }

  emitSessionSubject() {
    this.sessionSubject.next(this.sessions);
  }

  createNewSession(session: Session) {
    this.sessions.push(session);
    this.emitSessionSubject();
    return this.http.post<boolean>(this.url + '/add' , session ).subscribe(
      (data) => {
        this.getSession();
        console.log('create');
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }
  getSession() {
    this.http.get<Session[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.sessions = data;
        this.emitSessionSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getSessionById(id: ObjectID) {
    const session = this.sessions.find(
      (s) => {
        return s.id === id;
      }
    );
    return session;
  }
  deleteSession(id: ObjectID) {
    const index = this.sessions.indexOf(this.getSessionById(id));
    this.sessions.splice(index, 1);
    this.emitSessionSubject();
    this.http.delete(this.url + '/delete/' + id)
      .subscribe(
        ()  => {
          this.getSession();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }

  updateSession(session: Session) {
    this.http
      .put<any>(this.url + '/update', session)
      .subscribe(
        () => {
          this.getSession();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getSessionList() {
    this.getSession();
    return this.sessions;
  }
}
