import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserEmpresa } from '../userEmpresa/userEmpresa.modelo';
import { MsvEvaluacionService } from '../../services/msvEvaluacion.service';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { MsvRevisionService } from '../../services/msvRevision.service';
import {LoginService} from '../../services/login.service';
import { MsvEvaluacion } from './msvEvaluacion.modelo';
import { MsvCategoriaService } from '../../services/msvCategoria.service';
import { MsvRevision } from "../msvEvaluacion/msvRevision.modelo";

import { MsvParametroService } from '../../services/msvParametro.service';
import { MsvCalificacionService } from '../../services/msvCalificacion.service';
import { IfStmt } from '@angular/compiler/src/output/output_ast';
import { forEach } from '@angular/router/src/utils/collection';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './msvEvaluacion.component.html'
})
export class MsvEvaluacionComponent implements OnInit {
  @Output() ready2 = new EventEmitter<any>();
  @Input() msvCategoria;  
  public errorMessage;
  public msvEvaluaciones;
	public formNew = false;
	public formEdit = false;
	public formEditRevision = false;
  public formIndex = true;
  public newEmpresa = false;
  public revisionNew:boolean = false;
  public habilitarBotonRev:boolean = false;
  public revisionMensaje:boolean = false;
  public table:any;
  public isError:any; 
  public isExist:any; 
  public msj:any; 
  public nit:any; 
  public empresas:any;
  public miEmpresa:UserEmpresa;
  public miRevision = null;
  public revisiones: any;
  public msvEvaluacion: MsvEvaluacion;
  public revision: MsvRevision;
  public categoriaSelected: any = null;
  public msvCategorias:any;
  public categoria = false;
  public resumen = {};     public datos = {'parametro': null,
                  'parametro2': null}


  public showT = false;
  public msvParametros;
  public msvVariables;
  public msvVariablesLength;
  public tramiteNombreSelected: any;
  public criterio;
  public aplica;
  public evidencia;
  public datos2 = {
    'idEmpresa': null,
    'valorObtenidoFortalecimiento': null,
    'valorObtenidoComportamiento': null,
    'valorObtenidoVehiculoSeguro': null,
    'valorObtenidoInfraestructuraSegura': null,
    'valorObtenidoAtencionVictima': null,
    'valorObtenidoValorAgregado': null,
    'idRevision': null,
  };

  public datosFortalecimiento = {
    'parametros': null,
  };
  public datosComportamiento = {
    'parametros': null,
  };
  public datosVehiculoSeguro = {
    'parametros': null,
  };
  public datosInfraestructuraSegura = {
    'parametros': null,
  };
  public datosAtencionVictimas = {
    'parametros': null,
  };
  public datosValorAgregado = {
    'parametros': null,
  };  

  public botonEnviarFortalecimiento = false;
  public botonEnviarComportamiento = false;
  public botonEnviarVehiculoSeguro = false;
  public botonEnviarInfraestructuraSegura = false;
  public botonEnviarAtencionVictimas = false;
  public botonEnviarValorAgregado = false;
  
  public mostrarTablaEvaluacion = false;
  public puntajeEvaluacion = 0;
  public deshabilitarNuevaEvaluacion = true;

  constructor(
    private _EvaluacionService: MsvEvaluacionService,
    private _EmpresaService: UserEmpresaService,
    private _RevisionService: MsvRevisionService,
    private _loginService: LoginService,
    private _MsvCategoriaService: MsvCategoriaService,

    private _MsvParametroService: MsvParametroService,
    private _MsvCalificacionService: MsvCalificacionService,
    //private _MsvResultadoService: MsvResultadoService,
    ){}
    
  ngOnInit() {
    let token = this._loginService.getToken();
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    this._EvaluacionService.getEvaluacion().subscribe(
				response => {
          this.msvEvaluaciones = response.data;
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
          }, 100);
				}, 
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
      );

    this._MsvCategoriaService.getCategoriaSelect().subscribe(
      response => {
        this.msvCategorias = response;
        let timeoutId = setTimeout(() => {
          this.iniciarTabla();
        }, 100);
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }
  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }
  
  onNew(){
    this.newEmpresa = true;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.newEmpresa = false;
      this.revisionNew = false;
      this.ngOnInit();
    }
  }

  deletemsvEvaluacion(id:any){
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();
        this._EvaluacionService.deleteEvaluacion(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.ngOnInit();
              }, 
            error => {
              this.errorMessage = <any>error;

              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

        
      }
    })
  }

  onKeyValidateEvaluacion(){
    
    swal({
      title: 'Buscando Empresa!',
      text: 'Solo tardará unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    
    this.revisionMensaje = false;
    this.revisionNew = false;
    let token = this._loginService.getToken();

    this._EmpresaService.showByNitOrNombre(this.datos, token).subscribe(
      response => {
        if (response.status == 'success' ) {
          this.msj = response.msj;
          this.isError = false;
          this.miEmpresa = response.data;
          this.habilitarBotonRev = true;
          this._RevisionService.showRevision(token, this.miEmpresa.id).subscribe(
            response => {
              if (response.status == 'success' ) {
                this.msj = response.msj;
                this.isError = false;
                this.revisiones = response.data;                 
                this.isExist = true;
                swal.close();        
              }
              //si no existe revision coloca en true la variable para mostrar mensaje
              if(this.revisiones == false){
                this.revisionMensaje = true;
                }        
            error => { 
                this.errorMessage = <any>error;
                if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert("Error en la petición"); 
                }
              }
          }); 
          
          this.isExist = true;
          
          swal.close();
        }
        if(response.code == 401){
          this.msj = response.msj;
          this.isError = true;
          this.isExist = false;
          swal.close();
        }
        if(response.code == 400){
          this.msj = response.msj;
          this.isError = true;
          this.isExist = false;
          
          swal.close();
        }

      error => { 
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición"); 
          }
        }
    });
    //let $empresaid = 

  }

  onKeyValidateRevision(){
    swal({
      title: 'Buscando Fechas de Revisión!',
      text: 'Solo tardará unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    let token = this._loginService.getToken();
    
    this._RevisionService.showRevision(token,this.miEmpresa.id).subscribe(
      response => {
        if (response.code == 200 ) {
          this.msj = response.msj;
          this.isError = false;
          this.isExist = true;
          this.revisiones=response.data;
          this.miRevision = true;
          
          swal.close();
        }
        if(response.code == 401){
          this.msj = response.msj;
          this.isError = true;
          this.isExist = false;
          swal.close();
        }
        if(response.code == 400){
          this.msj = response.msj;
          this.isError = true;
          this.isExist = false;
          
          swal.close();
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

  onNewRevision(){
    this.revisionNew = true;
  }

  editmsvEvaluacion(msvEvaluacion:any) {
    this.msvEvaluacion = msvEvaluacion;
    this.formEdit = true;
    this.formIndex = false;
  }

  changedCategoria(e){
    swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardará unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    if (e) {
      let timeoutId = setTimeout(() => {
        this.categoria = false;
      }, 100);

      let token = this._loginService.getToken();
      this._MsvCategoriaService.showCategoria(token, e).subscribe(
        response => {
          if (response.status == 'success') {
            this.categoria = true; 
            if (this.categoriaSelected) {
              this._MsvParametroService.getParametroByCategoriaId(token, e).subscribe(
                response => {
                  this.msvParametros = response.data;
                  
                  if(this.datosFortalecimiento.parametros != null && this.categoriaSelected == 1){
                    this.msvParametros = this.datosFortalecimiento.parametros;
                  }
                  if(this.datosComportamiento.parametros != null && this.categoriaSelected == 2){
                    this.msvParametros = this.datosComportamiento.parametros;
                  }
                  if(this.datosVehiculoSeguro.parametros != null && this.categoriaSelected == 3){
                    this.msvParametros = this.datosVehiculoSeguro.parametros;
                  }
                  if(this.datosInfraestructuraSegura.parametros != null && this.categoriaSelected == 4){
                    this.msvParametros = this.datosInfraestructuraSegura.parametros;
                  }
                  if(this.datosAtencionVictimas.parametros != null && this.categoriaSelected == 5){
                    this.msvParametros = this.datosAtencionVictimas.parametros;
                  }
                  if(this.datosValorAgregado.parametros != null && this.categoriaSelected == 6){
                    this.msvParametros = this.datosValorAgregado.parametros;
                  }
                  if (this.msvParametros) {
                    //entra aquí si encuentra Parametro                    
                    this.showT = true;
                  } else {
                    swal({
                      type: 'error',
                      title: 'Oops...',
                      text: '¡La categoria no tiene parametros!'
                    })
                  }
                }
              );
            }
          }
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) { 
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    }
  }


  //********************************************************************************* */
  /* onEnviar() {
    let token = this._loginService.getToken();
    this._MsvCalificacionService.newCalificacion(token, this.msvParametros, this.miEmpresa.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready2.emit(true);
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
  } */

  onEnviar(){
    let token = this._loginService.getToken();
    swal({
      title: '¡Atención!',
      text: "Al enviar los datos usted no podrá realizar modificaciones, ¿Desea continuar?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        if (this.categoriaSelected == 1) {
          this.datosFortalecimiento.parametros = this.msvParametros;
          this.botonEnviarFortalecimiento = true;
          this._MsvCalificacionService.newCalificacion(token, this.datosFortalecimiento.parametros , this.miEmpresa.id).subscribe(
            response => {
              if (response.status == 'success') {
                this.ready2.emit(true);
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
        }
        if (this.categoriaSelected == 2) {
          this.datosComportamiento.parametros = this.msvParametros;
          this.botonEnviarComportamiento = true;
          this._MsvCalificacionService.newCalificacion(token, this.datosComportamiento.parametros, this.miEmpresa.id).subscribe(
            response => {
              if (response.status == 'success') {
                this.ready2.emit(true);
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
        }
        if (this.categoriaSelected == 3) {
          this.datosVehiculoSeguro.parametros = this.msvParametros;
          this.botonEnviarVehiculoSeguro = true;
          this._MsvCalificacionService.newCalificacion(token, this.datosVehiculoSeguro.parametros, this.miEmpresa.id).subscribe(
            response => {
              if (response.status == 'success') {
                this.ready2.emit(true);
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
        }
        if (this.categoriaSelected == 4) {
          this.datosInfraestructuraSegura.parametros = this.msvParametros;
          this.botonEnviarInfraestructuraSegura = true;
          this._MsvCalificacionService.newCalificacion(token, this.datosInfraestructuraSegura.parametros, this.miEmpresa.id).subscribe(
            response => {
              if (response.status == 'success') {
                this.ready2.emit(true);
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
        }
        if (this.categoriaSelected == 5) {
          this.datosAtencionVictimas.parametros = this.msvParametros;
          this.botonEnviarAtencionVictimas = true;
          this._MsvCalificacionService.newCalificacion(token, this.datosAtencionVictimas.parametros, this.miEmpresa.id).subscribe(
            response => {
              if (response.status == 'success') {
                this.ready2.emit(true);
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
        }
        if (this.categoriaSelected == 6) {
          this.datosValorAgregado.parametros = this.msvParametros;
          this.botonEnviarValorAgregado = true;
          this._MsvCalificacionService.newCalificacion(token, this.datosValorAgregado.parametros, this.miEmpresa.id).subscribe(
            response => {
              if (response.status == 'success') {
                this.ready2.emit(true);
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
        }
      } 
    })  
  }

  calcularTotal(e, parametro, idCategoria) {
    if (idCategoria == 1) {
      if (e) {
        this.datos2.valorObtenidoFortalecimiento += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos2.valorObtenidoFortalecimiento -= parametro.valor / parametro.numeroVariables;
      }
    } if (idCategoria == 2) {
      if (e) {
        this.datos2.valorObtenidoComportamiento += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos2.valorObtenidoComportamiento -= parametro.valor / parametro.numeroVariables;
      }
    } if (idCategoria == 3) {
      if (e) {
        this.datos2.valorObtenidoVehiculoSeguro += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos2.valorObtenidoVehiculoSeguro -= parametro.valor / parametro.numeroVariables;
      }
    } if (idCategoria == 4) {
      if (e) {
        this.datos2.valorObtenidoInfraestructuraSegura += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos2.valorObtenidoInfraestructuraSegura -= parametro.valor / parametro.numeroVariables;
      }
    } if (idCategoria == 5) {
      if (e) {
        this.datos2.valorObtenidoAtencionVictima += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos2.valorObtenidoAtencionVictima -= parametro.valor / parametro.numeroVariables;
      }
    } if (idCategoria == 6) {
      if (e) {
        this.datos2.valorObtenidoValorAgregado += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos2.valorObtenidoValorAgregado -= parametro.valor / parametro.numeroVariables;
      }
    }
  }

  onFinalizar() {
    let token = this._loginService.getToken();

    this.datos2.idEmpresa = this.miEmpresa.id;

    swal({
      title: '¡Atención!',
      text: '¿Desea guardar la información para la empresa?',
      type: 'info',
      confirmButtonText: 'Confirmar',

    }).then((result) => {
      if (result.value) {
        this._EvaluacionService.register(this.datos2, token).subscribe(
          response => {
            this.puntajeEvaluacion = response.puntajeEvaluacion;
            //this.deshabilitarNuevaEvaluacion+this.datos2.idRevision = true;
            //this.deshabilitarNuevaEvaluacion = true;
            var html =
              response.message + '</b><br>' +
              response.message2;
            if (response.status == 'success') {
              this.ready2.emit(true);
              swal({
                title: 'Perfecto!',
                html: html,
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.mostrarTablaEvaluacion = false;
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
      }
    });
  }

  editRevision(revision: any) {
    this.revision = revision;
    this.formEditRevision = true;
    this.formIndex = false;
  }

  iniciarEvaluacion(revision){
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardará unos segundos por favor espere.',
      timer: 1000,
      onOpen: () => {
        swal.showLoading();
      }
    });
    this.mostrarTablaEvaluacion = true;
    this.datos2.idRevision = revision.id;
  }
}