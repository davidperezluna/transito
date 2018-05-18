import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Sucursal } from '../sucursal.modelo';
import { SucursalService } from '../../../../services/sucursal.service';
import { LoginService } from '../../../../services/login.service';
import { DepartamentoService } from '../../../../services/departamento.service';
import { MunicipioService } from '../../../../services/municipio.service';

import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-sucursal',
  templateUrl: './new.component.html'
})
export class NewSucursalComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public sucursal: Sucursal;
public errorMessage;
public respuesta;

public municipios: any;


public municipioSelected: any;

// los que vienen desde el base de datos
constructor(
  private _SucursalService: SucursalService,
  private _loginService: LoginService,
  private _municipioService: MunicipioService,
 
){}

  ngOnInit() {
    this.sucursal = new Sucursal(null,null,null,null,null,null,null,null,null,null);

   

    this._municipioService.getMunicipioSelect().subscribe(
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
  onCancelar(){
    this.ready.emit(true);
  }
  // enviar a guarda
  onEnviar(){
    let token = this._loginService.getToken();
    this.sucursal.municipioId = this.municipioSelected;
    

    this._SucursalService.register(this.sucursal,token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
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

}