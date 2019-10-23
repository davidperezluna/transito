import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserEmpresa } from '../../usuario/userEmpresa/userEmpresa.modelo';
import { SvEvaluacion } from './svEvaluacion.modelo';
import { SvRevision } from "./svRevision.modelo";
import { SvEvaluacionService } from '../../../../services/svEvaluacion.service';
import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { SvRevisionService } from '../../../../services/svRevision.service';
import { SvCfgCategoriaService } from '../../../../services/svCfgCategoria.service';
import { SvCfgParametroService } from '../../../../services/svCfgParametro.service';
import { SvCalificacionService } from '../../../../services/svCalificacion.service';
import { LoginService } from '../../../../services/login.service';
import { environment } from 'environments/environment';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './svEvaluacion.component.html',
})
export class SvEvaluacionComponent implements OnInit {
  @Output() ready2 = new EventEmitter<any>();
  @Input() msvCategoria;

  public errorMessage;
  
  public apiUrl = environment.apiUrl + 'seguridadvial/svevaluacion';
  
  public idUsuario;
  public msvEvaluaciones;

  public formNewEmpresa = false;
  public formNewRevision = false;

  public formNew = false;
  public formEdit = false;
  public formShow = false;

  public formEditRevision = false;
  public formIndex = true;
  public newEmpresa = false;
  public empresaEncontrada = false;
  public empresaNoEncontrada = false;

  public table: any;
  public nit: any;
  public empresas: any;
  
  public miEmpresa: UserEmpresa;
  public revision: SvRevision;
  public miRevision = false;
  
  public revisiones: any;
  public msvEvaluacion: SvEvaluacion;
  public categoriaSelected: any = null;
  public msvCategorias: any;
  public categoria = false;

  public evaluacion: any = null;

  public resumen = {}; 
  public datos = {
    'parametro': null,
    'parametro2': null
  };

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
    'datosValorAgregado': null,
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
  
  public datosTablaValorAgregado = {
    'valorAgregado': false,
    
    'variable1': null,
    'criterio1': null,
    'aplica1': null,
    'evidencia1': null,
    'responde1': null,
    'valor1': 25,
    'valorObtenido1': null,
    'observacion1': null,

    'variable2': null,
    'criterio2': null,
    'aplica2': null,
    'evidencia2': null,
    'responde2': null,
    'valor2': 25,
    'valorObtenido2': null,
    'observacion2': null,

    'variable3': null,
    'criterio3': null,
    'aplica3': null,
    'evidencia3': null,
    'responde3': null,
    'valor3': 25,
    'valorObtenido3': null,
    'observacion3': null,

    'variable4': null,
    'criterio4': null,
    'aplica4': null,
    'evidencia4': null,
    'responde4': null,
    'valor4': 25,
    'valorObtenido4': null,
    'observacion4': null,
  };

  public botonEnviarFortalecimiento = false;
  public botonEnviarComportamiento = false;
  public botonEnviarVehiculoSeguro = false;
  public botonEnviarInfraestructuraSegura = false;
  public botonEnviarAtencionVictimas = false;
  public botonEnviarValorAgregado = false;

  public mostrarTablaEvaluacion = false;
  public mostrarTablaValoresAgregados = true;
  public puntajeEvaluacion = 0;

  constructor(
    private _EvaluacionService: SvEvaluacionService,
    private _EmpresaService: UserEmpresaService,
    private _RevisionService: SvRevisionService,
    private _loginService: LoginService,
    private _MsvCategoriaService: SvCfgCategoriaService,

    private _MsvParametroService: SvCfgParametroService,
    private _MsvCalificacionService: SvCalificacionService,
  ) { }

  ngOnInit() {
    let token = this._loginService.getToken();

    let identity = this._loginService.getIdentity();
    this.idUsuario = identity.sub;

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
    this._EvaluacionService.index().subscribe(
      response => {
        this.msvEvaluaciones = response.data;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._MsvCategoriaService.select().subscribe(
      response => {
        this.msvCategorias = response;
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

  onNewEmpresa() {
    this.formNewEmpresa = true;
    this.formNew = false;
    this.formEdit = false;
    this.formShow = false;
    this.formIndex = false;
    this.formNewRevision = false;
  }

  onNewRevision() {
    this.formNewEmpresa = false;
    this.formNew = false;
    this.formEdit = false;
    this.formIndex = false;
    this.formNewRevision = true;
  }

  onShow(revision: any) {
    this.revision = revision;
    this.formShow = true;
    this.formNewEmpresa = false;
    this.formNew = false;
    this.formEdit = false;
    this.formIndex = false;
    this.formNewRevision = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
      this.formIndex = true;
      this.newEmpresa = false;
      this.formNewRevision = false;
      this.formEditRevision = false;
      this.ngOnInit();
      this.onKeyValidateEvaluacion();
    }
  }

  deletemsvEvaluacion(id: any) {
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
        this._EvaluacionService.delete({'id': id }, token).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: response.message,
              type: 'success',
              confirmButtonColor: '#15d4be',
            });
            this.ngOnInit();
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
    })
  }

  onKeyValidateEvaluacion() {
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
      ) {}
    })

    let token = this._loginService.getToken();

    this._EmpresaService.showByNitOrNombre(this.datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.empresaEncontrada = true;
          this.miEmpresa = response.data;

          this._RevisionService.showRevisionByEmpresa({'id': this.miEmpresa.id} , token).subscribe(
            response => {
              if (response.code == 200) {
                this.miRevision = true;
                this.revisiones = response.data;
              } else {
                swal({
                  title: 'Alerta!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert("Error en la petición");
                }
              }
            });
          swal.close();
        } else {
          this.empresaNoEncontrada = true;
          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      });
  }

  editmsvEvaluacion(msvEvaluacion: any) {
    this.msvEvaluacion = msvEvaluacion;
    this.formEdit = true;
    this.formIndex = false;
  }

  changedCategoria(e) {
    swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardará unos segundos por favor espere.',
      timer: 2000,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if ( result.dismiss === swal.DismissReason.timer) {}
    });

    if (e) {
      let timeoutId = setTimeout(() => {
        this.categoria = false;
      }, 100);

      let token = this._loginService.getToken();
      console.log(e);
      this._MsvCategoriaService.show({'id': e}, token).subscribe(
        response => {
          if (response.code == 200) {
            this.categoria = true;
            if (this.categoriaSelected) {
              this._MsvParametroService.getParametroByCategoriaId({'id': e}, token).subscribe(
                response => {
                  this.msvParametros = response.data;
                  if (this.datosFortalecimiento.parametros != null && this.categoriaSelected == 1) {
                    this.msvParametros = this.datosFortalecimiento.parametros;
                  }
                  if (this.datosComportamiento.parametros != null && this.categoriaSelected == 2) {
                    this.msvParametros = this.datosComportamiento.parametros;
                  }
                  if (this.datosVehiculoSeguro.parametros != null && this.categoriaSelected == 3) {
                    this.msvParametros = this.datosVehiculoSeguro.parametros;
                  }
                  if (this.datosInfraestructuraSegura.parametros != null && this.categoriaSelected == 4) {
                    this.msvParametros = this.datosInfraestructuraSegura.parametros;
                  }
                  if (this.datosAtencionVictimas.parametros != null && this.categoriaSelected == 5) {
                    this.msvParametros = this.datosAtencionVictimas.parametros;
                  }
                  if (this.datosValorAgregado.parametros != null && this.categoriaSelected == 6) {
                    this.msvParametros = this.datosValorAgregado.parametros;
                  }
                  if (this.msvParametros) {
                    //entra aquí si encuentra Parametro                    
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

  onEnviar(categoriaSelected) {
    console.log(this.datos2.idRevision);
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
          let dataFortalecimiento = {
            'parametros': [],
            'empresa': this.miEmpresa.id, 
            'revision': this.datos2.idRevision
          };

          dataFortalecimiento.parametros.push(this.datosFortalecimiento.parametros);
          
          this._MsvCalificacionService.register(dataFortalecimiento, token).subscribe(
            response => {
              if (response.code == 200) {
                this.ready2.emit(true);

                //para recargar lista
                this._MsvCategoriaService.editEstadoCategoria({'id':this.categoriaSelected}, token). subscribe(
                  response => {
                    if (response.code == 200) {
                      this._MsvCategoriaService.select().subscribe(
                        response => {
                          this.msvCategorias = null;
                          this.msvCategorias = response;
                          console.log(this.msvCategorias);
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
                );

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
          let dataComportamiento = {
            'parametros': [],
            'empresa': this.miEmpresa.id,
            'revision': this.datos2.idRevision
          };

          dataComportamiento.parametros.push(this.datosComportamiento.parametros);

          this._MsvCalificacionService.register(dataComportamiento, token).subscribe(
            response => {
              if (response.code == 200) {
                this.ready2.emit(true);

                //para recargar lista
                this._MsvCategoriaService.editEstadoCategoria({ 'id': this.categoriaSelected }, token).subscribe(
                  response => {
                    if (response.code == 200) {
                      this._MsvCategoriaService.select().subscribe(
                        response => {
                          this.msvCategorias = null;
                          this.msvCategorias = response;
                          console.log(this.msvCategorias);
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
                );
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
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
          let dataVehiculoSeguro = {
            'parametros': [],
            'empresa': this.miEmpresa.id,
            'revision': this.datos2.idRevision
          };

          dataVehiculoSeguro.parametros.push(this.datosVehiculoSeguro.parametros);

          this._MsvCalificacionService.register(dataVehiculoSeguro, token).subscribe(
            response => {
              if (response.code == 200) {
                this.ready2.emit(true);

                //para recargar lista
                this._MsvCategoriaService.editEstadoCategoria({ 'id': this.categoriaSelected }, token).subscribe(
                  response => {
                    if (response.code == 200) {
                      this._MsvCategoriaService.select().subscribe(
                        response => {
                          this.msvCategorias = null;
                          this.msvCategorias = response;
                          console.log(this.msvCategorias);
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
                );

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
          let dataInfraestructuraSegura = {
            'parametros': [],
            'empresa': this.miEmpresa.id,
            'revision': this.datos2.idRevision
          };

          dataInfraestructuraSegura.parametros.push(this.datosInfraestructuraSegura.parametros);

          this._MsvCalificacionService.register(dataInfraestructuraSegura, token).subscribe(
            response => {
              if (response.code == 200) {
                this.ready2.emit(true);

                //para recargar lista
                this._MsvCategoriaService.editEstadoCategoria({ 'id': this.categoriaSelected }, token).subscribe(
                  response => {
                    if (response.code == 200) {
                      this._MsvCategoriaService.select().subscribe(
                        response => {
                          this.msvCategorias =null;
                          this.msvCategorias = response;
                          console.log(this.msvCategorias);
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
                );

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
          let dataAtencionVictimas = {
            'parametros': [],
            'empresa': this.miEmpresa.id,
            'revision': this.datos2.idRevision
          };

          dataAtencionVictimas.parametros.push(this.datosAtencionVictimas.parametros);

          this._MsvCalificacionService.register(dataAtencionVictimas, token).subscribe(
            response => {
              if (response.code == 200) {
                this.ready2.emit(true);

                //para recargar lista
                this._MsvCategoriaService.editEstadoCategoria({ 'id': this.categoriaSelected }, token).subscribe(
                  response => {
                    if (response.code == 200) {
                      this._MsvCategoriaService.select().subscribe(
                        response => {
                          this.msvCategorias = null;
                          this.msvCategorias = response;
                          console.log(this.msvCategorias);
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
                );

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
        if (categoriaSelected == 6) { 
          this.botonEnviarValorAgregado = true;
          this.mostrarTablaValoresAgregados = false;
                swal({
                  title: 'Perfecto!',
                  text: 'Registros creados con éxito',
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
            }
         
      }
    })
  }

  calcularTotal(e, parametro, idCategoria) {
    if (idCategoria == 1) {
      if (e) {
        this.datos2.valorObtenidoFortalecimiento += parametro.valor / parametro.numeroCriterios;
      } else {
        this.datos2.valorObtenidoFortalecimiento -= parametro.valor / parametro.numeroCriterios;
      }
    } if (idCategoria == 2) {
      if (e) {
        this.datos2.valorObtenidoComportamiento += parametro.valor / parametro.numeroCriterios;
      } else {
        this.datos2.valorObtenidoComportamiento -= parametro.valor / parametro.numeroCriterios;
      }
    } if (idCategoria == 3) {
      if (e) {
        this.datos2.valorObtenidoVehiculoSeguro += parametro.valor / parametro.numeroCriterios;
      } else {
        this.datos2.valorObtenidoVehiculoSeguro -= parametro.valor / parametro.numeroCriterios;
      }
    } if (idCategoria == 4) {
      if (e) {
        this.datos2.valorObtenidoInfraestructuraSegura += parametro.valor / parametro.numeroCriterios;
      } else {
        this.datos2.valorObtenidoInfraestructuraSegura -= parametro.valor / parametro.numeroCriterios;
      }
    } if (idCategoria == 5) {
      if (e) {
        this.datos2.valorObtenidoAtencionVictima += parametro.valor / parametro.numeroCriterios;
      } else {
        this.datos2.valorObtenidoAtencionVictima -= parametro.valor / parametro.numeroCriterios;
      }
    } if (idCategoria == 6) {
      if (e) {
        this.datos2.valorObtenidoValorAgregado += 100 / 4;
      } else {
        this.datos2.valorObtenidoValorAgregado -= 100 / 4;
      }
    }
  }

  onFinalizar() {
    let token = this._loginService.getToken();

    this.datos2.idEmpresa = this.miEmpresa.id;
    this.datos2.datosValorAgregado = this.datosTablaValorAgregado;
    swal({
      title: '¡Atención!',
      text: '¿Desea guardar la información para la empresa?',
      type: 'info',
      confirmButtonText: 'Confirmar',

    }).then((result) => {
      if (result.value) {

        this._EvaluacionService.register(this.datos2, token).subscribe(
          response => {
            if (response.code == 200) {
              this.ready2.emit(true);
              this.evaluacion = response.data;
              this.onKeyValidateEvaluacion();
              swal({
                title: 'Perfecto!',
                html: response.message,
                type: 'success',
                confirmButtonText: 'Aceptar'
              });

              this.mostrarTablaEvaluacion = false;
            } else {
              this.evaluacion = null;

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

  iniciarEvaluacion(revision) {
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

  onVisualizarEvaluacion(revision: any) {
    this.revision = revision;
    let token = this._loginService.getToken();

    
  }
}