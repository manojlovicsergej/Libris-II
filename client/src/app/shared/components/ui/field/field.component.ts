import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  standalone : true
})
export class FieldComponent implements OnInit{
  @Input() fieldLabel: string;
  @Input() fieldLabelFor: string;

  constructor() {
    this.fieldLabel = '';
    this.fieldLabelFor = '';
  }

  ngOnInit(): void {}
}
