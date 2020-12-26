import { Component, OnInit } from '@angular/core';
import {Document} from '../../../models/Document.module';
import {Subscription} from 'rxjs';
import {FileService} from '../../../services/file.service';
import {DocumentService} from '../../../services/document.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];
  documentsSubscription: Subscription;

  constructor(private fileService: FileService,
              private documentService: DocumentService,
              public router: Router) { }

  ngOnInit(): void {
    this.documentsSubscription = this.documentService.documentSubject.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
    this.documentService.getDocuments();
  }

  onDetails(document: Document): void {
    this.documentService.currentDocument = document;
    this.router.navigate((['student/document/details']));
  }

}
