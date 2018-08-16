import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html'
})

export class ShowComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() funcionario:any = null;
public errorMessage;


constructor(
  private _loginService: LoginService,
  ){}

  ngOnInit() { }
  
  onCancelar(){
    this.ready.emit(true);
  }
}