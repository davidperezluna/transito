import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloTpConvenio } from '../vhloTpConvenio.modelo';

import { VhloTpConvenioService } from '../../../services/vhloTpConvenio.service';
import { UserEmpresaService } from '../../../services/userEmpresa.service';
import { LoginService } from '../../../services/login.service';

import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() empresa:any = null;
public convenio: VhloTpConvenio;
public errorMessage;
public cerrarFormulario=true;
public empresasTransportePublico: any;

public formNewConvenio = false;
public formIndexConvenio = true;

constructor(
  private _VhloTpConvenioService: VhloTpConvenioService,
  private _LoginService: LoginService,
  private _EmpresaService: UserEmpresaService,
 
){}

  ngOnInit() {
    this.convenio = new VhloTpConvenio(null,null,null,null,null,null,null,null);

    this._EmpresaService.selectTransportePublico().subscribe( 
      response => {
        this.empresasTransportePublico = response;
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

  onEnviar(){
    let token = this._LoginService.getToken();

    this.convenio.empresa = this.empresa.id;
    
    console.log(this.convenio);

    this._VhloTpConvenioService.register(this.convenio, token).subscribe(
      response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          })
        }
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
    }); 
  }
}