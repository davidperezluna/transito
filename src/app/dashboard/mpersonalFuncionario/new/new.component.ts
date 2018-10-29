import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { MpersonalFuncionario } from '../mpersonalFuncionario.modelo';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { MpersonalTipoContratoService } from '../../../services/mpersonalTipoContrato.service';
import { CfgCargoService } from '../../../services/cfgCargo.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { LoginService } from '../../../services/login.service';
import { DatePipe  } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public funcionario: MpersonalFuncionario;
public formConfirm = false;
public formPdf = false;
public pdf: any;
public primerNombre: any;
public segundoNombre: any;
public primerApellido: any;
public segundoApellido: any;
public tiposContrato: any;
public tipoContratoSelected: any;
public cargos: any;
public cargoSelected: any;
public tiposIdentificacion: any;
public tipoIdentificacionSelected: any;
public tipoNombramientoSelected: any;
public sedesOperativas: any;
public sedeOperativaSelected: any;
public errorMessage;
public respuesta: any = null;

constructor(
  private _FuncionarioService: MpersonalFuncionarioService,
  private _TipoContratoService: MpersonalTipoContratoService,
  private _CargoService: CfgCargoService,
  private _TipoIdentificacionService: TipoIdentificacionService,
  private _SedeOperativaService: SedeOperativaService,
  private _loginService: LoginService,
  private router: Router
  ){}

  ngOnInit() {
    
    this.funcionario = new MpersonalFuncionario(null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    this._TipoContratoService.select().subscribe(
      response => {
        this.tiposContrato = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._CargoService.select().subscribe(
      response => {
        this.cargos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
      response => {
        this.tiposIdentificacion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
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

  onCancelarConfirm(){
    this.formConfirm = false;
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    this.funcionario.sedeOperativaId = this.sedeOperativaSelected;
    this.funcionario.tipoContratoId = this.tipoContratoSelected;
    this.funcionario.cargoId = this.cargoSelected;

    if(this.funcionario.activo == 'true'){
      this._FuncionarioService.register(this.funcionario,token).subscribe(
        response => {
          this.respuesta = response;
          this.formConfirm = false;
          this.formPdf = true;
          
          if(this.respuesta.status == 'success'){
            this.ready.emit(true);
            swal({
              title: 'Perfecto!',
              text: 'Registro exitoso!',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }else{
            swal({
              title: 'Error!',
              text: 'El funcionario ya se encuentra registrado',
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
    }else{
      this.formConfirm = true;
      this.formPdf = false;
    }
  }

  onConfirm(){
    let token = this._loginService.getToken();
    
    if(this.funcionario.inhabilidad == 'true'){
      this._FuncionarioService.register(this.funcionario,token).subscribe(
        response => {
          this.respuesta = response;
          this.formConfirm = false;
          this.formPdf = true;
          
          if(this.respuesta.status == 'success'){
            this.ready.emit(true);
            swal({
              title: 'Perfecto!',
              text: 'Registro exitoso!',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }else{
            swal({
              title: 'Error!',
              text: 'El funcionario ya se encuentra registrado',
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
    }else{
      this.formConfirm = false;
      this.formPdf = false;
    }
  }

  onSearch() {
    let token = this._loginService.getToken();
    let datos = {
      'identificacion':this.funcionario.identificacion
    } 
    
    this._FuncionarioService.searchCiudadano(datos,token).subscribe(
      response => {
        if(response.status == 'success'){
          this.primerNombre = response.data.usuario.primerNombre;
          this.segundoNombre = response.data.usuario.segundoNombre;
          this.primerApellido = response.data.usuario.primerApellido;
          this.segundoApellido = response.data.usuario.segundoApellido;
        }else{
          swal({
            title: 'Alerta',
            text: response.message,
            type: 'warning',
            showCancelButton: true,
            focusConfirm: true,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Registrar',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i> Cancelar',
            cancelButtonAriaLabel: 'Thumbs down',
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/dashboard/ciudadano']);
            }
          });
         
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