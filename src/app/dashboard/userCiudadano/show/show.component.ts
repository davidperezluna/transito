import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html'
})

export class ShowComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() ciudadano:any = null;
public errorMessage;

constructor(
  private _CiudadanoService: UserCiudadanoService,
  private _LoginService: LoginService,

  ){}

  ngOnInit(){ }

  onCancelar(){
    this.ready.emit(true);
  }
}