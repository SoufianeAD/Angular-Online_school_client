import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import ObjectID from 'bson-objectid';
import {File} from '../models/File.module';
import {Converter} from '../models/Converter';
import {Document} from '../models/Document.module';
import {FeedBack} from "../models/FeedBack.module";


@Injectable({
  providedIn: 'root'
})
export class FileService {

  files: File[] = [];
  fileSubject = new Subject<File[]>() ;
  url = 'http://localhost:8080/file';
  constructor(private  http: HttpClient) { }

  emitFileSubject() {
    this.fileSubject.next(this.files);
  }

  createNewFile(file: File) {
    this.files.push(file);
    this.emitFileSubject();
    return this.http.post<File>(this.url + '/add' , file );
  }
  getFiles() {
    this.http.get<File[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.files = data;
        this.emitFileSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getFileById(id: number) {
    const file = this.files.find(
      (f) => {
        return f.id === id;
      }
    );
    return file;
  }
  deleteFile(id: number) {
    const index = this.files.indexOf(this.getFileById(id));
    this.files.splice(index, 1);
    this.emitFileSubject();
    return this.http.delete(this.url + '/delete/' + id);
  }

  updateFile(file: File) {
    this.http
      .put<any>(this.url + '/update', file)
      .subscribe(
        () => {
          this.getFiles();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getFileList() {
    this.getFiles();
    return this.files;
  }

  getFilesByDocument(document: Document) {
   return this.http.get<File[]>(this.url + '/getByDocumentId/' + document.id);
  }

  getFilesByFeedBack(feedBack: FeedBack) {
    return this.http.get<File[]>(this.url + '/getByFeedBackId/' + feedBack.id);
  }

}
