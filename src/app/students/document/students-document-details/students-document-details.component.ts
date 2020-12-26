import { Component, OnInit } from '@angular/core';
import {Document} from '../../../models/Document.module';
import {File} from '../../../models/File.module';
import {Subject} from 'rxjs';
import {DocumentService} from '../../../services/document.service';
import {FileService} from '../../../services/file.service';

@Component({
  selector: 'app-students-document-details',
  templateUrl: './students-document-details.component.html',
  styleUrls: ['./students-document-details.component.scss']
})
export class StudentsDocumentDetailsComponent implements OnInit {

  currentDocument: Document;
  files: File[] = [];
  filesSubject = new Subject<File[]>();
  constructor(private documentService: DocumentService,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.refresh();
  }

  emit() {
    this.filesSubject.next(this.files);
  }

  refresh() {
    this.currentDocument = this.documentService.currentDocument;
    this.fileService.getFilesByDocument(this.currentDocument).subscribe(
      (files) => {
        alert(files);
        this.files = files;
        this.files.reverse();
      }, (error) => {
        console.log('error' + error);
      }
    );
    this.emit();
  }

  onDownload(file: string): void {
    const link = document.createElement('a');
    link.setAttribute('target', 'blank');
    link.setAttribute('href', 'localhost:8080/document/download/' + file);
    link.setAttribute('download', file);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
