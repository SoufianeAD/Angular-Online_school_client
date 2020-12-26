import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import ObjectID from 'bson-objectid';

import {Document} from '../models/Document.module';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];
  documentSubject = new Subject<Document[]>() ;
  currentDocument: Document = null;
  url = 'http://localhost:8080/document';
  constructor(private  http: HttpClient) { }

  emitDocumentSubject() {
    this.documentSubject.next(this.documents);
  }

  createNewDocument(document: Document) {
    this.documents.push(document);
    this.emitDocumentSubject();
    return this.http.post<Document>(this.url + '/add' , document );
  }
  getDocuments() {
    this.http.get<Document[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.documents = data;
        this.emitDocumentSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getDocumentById(id: number) {
    const document = this.documents.find(
      (doc) => {
        return doc.id === id;
      }
    );
    return document;
  }
  deleteDocument(id: number) {
    const index = this.documents.indexOf(this.getDocumentById(id));
    this.documents.splice(index, 1);
    this.emitDocumentSubject();
    this.http.delete(this.url + '/delete/' + id)
      .subscribe(
        ()  => {
          this.getDocuments();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }

  updateDocument(document: Document) {
    this.http
      .put<any>(this.url + '/update', document)
      .subscribe(
        () => {
          this.getDocuments();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getDocumentList() {
    this.getDocuments();
    return this.documents;
  }

  uploadFile(file: any) {
    console.log('it\'s a send file');
    this.http
      .post<any>( this.url + '/upload', file)
      .subscribe(
        () => {
          console.log(' file sent !');
        },
        (error) => {
          console.log('Erreur while sending file : ' + error);
        }
      );
  }

  downloadFile(fileName: string) {
    return this.http.get<any>(this.url + '/download/' + fileName);
  }

}
