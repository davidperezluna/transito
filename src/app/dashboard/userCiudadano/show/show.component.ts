import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  providers: [DatePipe]
})

export class ShowComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() ciudadano:any = null;
public errorMessage;

constructor(){}

  ngOnInit(){ }

  onCancelar(){
    this.ready.emit(true);
  }
}