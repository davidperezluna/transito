import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Sucursal } from './sucursal.modelo';
// import { Empresa } from '../new/empresa.modelo';

import { SucursalService } from '../../../../services/sucursal.service';
import { LoginService } from '../../../../services/login.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';

import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-sucursal',
  templateUrl: './new.component.html'
})
export class NewSucursalComponent implements OnInit {
@Output() readySucursal = new EventEmitter<any>();
@Input() empresa:any = null;
public sucursal: Sucursal;
public errorMessage;
public respuesta;
public cerrarFormulario=true;
public municipios: any;
public municipioSelected: any;
public btnVisible=false;
public formNewSucursal = false;
public formIndexSucursal = true;

// los que vienen desde el base de datos
constructor(
  private _SucursalService: SucursalService,
  private _municipioService: CfgMunicipioService,
  private _loginService: LoginService,
 
){}

  ngOnInit() {
    this.sucursal = new Sucursal(null,null,null,null,null,null,null,null,null,null,null);

    this._municipioService.select().subscribe(
      response => {
        this.municipios = response;
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
    this.readySucursal.emit(true);
   
  }
  // enviar a guarda
  onEnviar(){

    this.sucursal.municipioId = this.municipioSelected;
    this.sucursal.empresaId = this.empresa.id;
    
    // let token = this._loginService.getToken();


  let token = this._loginService.getToken();

    this._SucursalService.register(this.sucursal,token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.readySucursal.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El sucursal ya se encuentra registrado',
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

  onNewSucursal(){
    this.formNewSucursal = true;
    this.btnVisible=true;
    this.formIndexSucursal = false;
    // this.table.destroy();
  }
  cancelarNewFormulario1()
{
  this.btnVisible=false;
  this.formNewSucursal=false
}

}