import { Injectable } from '@angular/core';

import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import ObjectID from 'bson-objectid';
import {Professor} from '../models/Professor.module';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  professors: Professor[] = [];
  professorSubject = new Subject<Professor[]>() ;
  url = 'http://localhost:8080/professor';
  constructor(private  http: HttpClient) { }

  emitProfessorSubject() {
    this.professorSubject.next(this.professors);
  }

  createNewProfessor(professor: Professor) {
    this.professors.push(professor);
    this.emitProfessorSubject();
    return this.http.post<boolean>(this.url + '/add' , professor ).subscribe(
      (data) => {
        this.getProfessors();
        console.log('create');
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }
  getProfessors() {
    this.http.get<Professor[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.professors = data;
        this.emitProfessorSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getProfessorById(id: ObjectID) {
    const professor = this.professors.find(
      (p) => {
        return p.id === id;
      }
    );
    return professor;
  }
  deleteProfessor(id: ObjectID) {
    const index = this.professors.indexOf(this.getProfessorById(id));
    this.professors.splice(index, 1);
    this.emitProfessorSubject();
    this.http.delete(this.url + '/delete/' + id)
      .subscribe(
        ()  => {
          this.getProfessors();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }

  updateProfessor(professor: Professor) {
    this.http
      .put<any>(this.url + '/update', professor)
      .subscribe(
        () => {
          this.getProfessors();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getProfessorList() {
    this.getProfessors();
    return this.professors;
  }
}
