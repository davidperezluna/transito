import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MpersonalFuncionario } from '../mpersonalFuncionario.modelo';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { MpersonalTipoContratoService } from '../../../services/mpersonalTipoContrato.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
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
  private _TipoIdentificacionService: TipoIdentificacionService,
  private _SedeOperativaService: SedeOperativaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.funcionario = new MpersonalFuncionario(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

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
              text: 'El registro se ha registrado con exito',
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
              text: 'El registro se ha registrado con exito',
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

   console.log(datos);
    
    this._FuncionarioService.searchCiudadano(datos,token).subscribe(
      response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.primerNombre = response.data.usuario.primerNombre;
          this.segundoNombre = response.data.usuario.segundoNombre;
          this.primerApellido = response.data.usuario.primerApellido;
          this.segundoApellido = response.data.usuario.segundoApellido;
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