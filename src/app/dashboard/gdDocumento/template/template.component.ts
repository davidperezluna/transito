import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { GdDocumentoService } from '../../../services/gdDocumento.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() documento: any = null;
public errorMessage;

public funcionarios: any;
public date: any;
 
public datos = {
  'observaciones': null,
  'idFuncionario': null,
  'idDocumento': null
};

constructor(
  private _DocumentoService: GdDocumentoService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.date = new Date();
    this._FuncionarioService.select().subscribe(
      response => {
        this.funcionarios = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onRegister(){
    this.datos.idDocumento = this.documento.id;

    let token = this._loginService.getToken();

		this._DocumentoService.assign(this.datos, token).subscribe(
			response => {
        if(response.status == 'success'){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.ready.emit(true);
          });
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
		});
  }
}