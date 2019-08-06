import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PqoCfgPatio } from '../pqoCfgPatio.modelo';
import { PqoCfgPatioService } from '../../../../../services/pqoCfgPatio.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-pqocfgpatio',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public patio: PqoCfgPatio;
  public errorMessage;

  public funcionario: any = null;

  public file: any = null;
  public fileSelected: File = null;

constructor(
  private _PatioService: PqoCfgPatioService,
  private _FuncionarioService: PnalFuncionarioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.patio = new PqoCfgPatio(null, null, null, null, null, null, null, null, null, false, null, null);

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.funcionario = response.data;
          this.patio.idOrganismoTransito = this.funcionario.organismoTransito.id;
        } else {
          swal({
            title: 'Error!',
            text: 'Su usuario no tiene autorización para realizar facturación!',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      }
    );
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];

      this.file = new FormData();
      this.file.append('file', this.fileSelected);
    }
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    if (this.fileSelected) {
      this._PatioService.register(this.file, this.patio, token).subscribe(
        response => {
          if (response.status == 'success') {
            this.ready.emit(true);
            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            })
          } else {
            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        }
      );
    } else {
      swal({
        title: 'Error!',
        text: 'Debe adjuntar el documento de autorización.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } 
  }

}