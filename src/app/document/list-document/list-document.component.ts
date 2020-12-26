import { Component, OnInit } from '@angular/core';
import {FileService} from '../../services/file.service';
import {DocumentService} from '../../services/document.service';
import {Document} from '../../models/Document.module';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.scss']
})
export class ListDocumentComponent implements OnInit {

  createForm: FormGroup;
  documents: Document[] = [];
  documentsSubscription: Subscription;

  constructor(private fileService: FileService,
              private documentService: DocumentService,
              public router: Router) { }

  ngOnInit(): void {
    this.init();
    this.documentsSubscription = this.documentService.documentSubject.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
    this.documentService.getDocuments();
  }

  init(): void {
    this.createForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  onDetails(document: Document): void {
    this.documentService.currentDocument = document;
    this.router.navigate((['document/details']));
  }

  onSubmit() {
    const document = new Document();
    document.title = this.createForm.get('title').value;
    /*document.classRoom = ;
    document.professor = ;*/
    alert(JSON.stringify(document));
    this.documentService.createNewDocument(document).subscribe(
      (data) => {
        this.documentService.getDocuments();
        this.documentService.currentDocument = data;
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
    this.createForm.setValue({
      title: ''
    });
  }

  onDelete(document: Document) {
    this.documentService.deleteDocument(document.id);
  }

}
