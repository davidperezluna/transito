import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Vehiculo} from '../vehiculo.modelo';
declare var swal: any;
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public vehiculo: Vehiculo;

  constructor() { }

  ngOnInit() {
    this.vehiculo = new Vehiculo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  }
  onCancelar(){
      this.ready.emit(true);
  }
  onEnviar(){
    console.log(this.vehiculo);  
    swal({
        title: 'Eliminado!',
        text: 'Su registro ha sido eliminado.',
        type: 'success',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
    });
    this.ready.emit(true);
  }

}