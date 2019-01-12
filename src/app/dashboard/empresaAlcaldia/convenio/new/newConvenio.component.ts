import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Convenio } from './convenio.modelo';
// import { Empresa } from '../new/empresa.modelo';

import { VhloTpConvenioService } from '../../../../services/vhloTpConvenio.service';
import { LoginService } from '../../../../services/login.service';
import { EmpresaService } from '../../../../services/empresa.service';

import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-convenio',
  templateUrl: './new.component.html'
})
export class NewConvenioComponent implements OnInit {
@Output() readyConvenio = new EventEmitter<any>();
@Input() empresa:any = null;
public convenio: Convenio;
public errorMessage;
public respuesta;
public cerrarFormulario=true;
public empresasTransportePublico: any;




public btnVisible=false;
public formNewConvenio = false;
public formIndexConvenio = true;

// los que vienen desde el base de datos
constructor(
  private _VhloTpConvenioService: VhloTpConvenioService,
  private _loginService: LoginService,
  private _EmpresaService: EmpresaService,
 
){}

  ngOnInit() {
    this.convenio = new Convenio(null,null,null,null,null,null,null,null);

    this._EmpresaService.getEmpresaTransportePublicoSelect().subscribe( 
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
  // la función cancelar
  onCancelar(){
    this.readyConvenio.emit(true);
   
  }
  // enviar a guarda
  onEnviar(){

    let token = this._loginService.getToken();
    this.convenio.empresa = this.empresa.id;
    console.log(this.convenio);

    this._VhloTpConvenioService.register(this.convenio,token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.readyConvenio.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El convenio ya se encuentra registrado',
            type: 'error',
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
  // final del enviar

}