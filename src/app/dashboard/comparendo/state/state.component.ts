import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Comparendo } from '../comparendo.modelo';
import { Inmovilizacion } from '../inmovilizacion.modelo';
import { ComparendoService } from '../../../services/comparendo.service';
import { LoginService } from '../../../services/login.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { MpersonalComparendoService } from '../../../services/mpersonalComparendo.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { MunicipioService } from '../../../services/municipio.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { MparqPatioService } from '../../../services/mparqPatio.service';
import { MparqGruaService } from '../../../services/mparqGrua.service';
import { CfgComparendoEstadoService } from '../../../services/cfgComparendoEstado.service';
import { MflInfraccionService } from '../../../services/mflInfraccion.service';
import { CfgTipoInfractorService } from '../../../services/cfgTipoInfractor.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../services/cfgLicenciaConduccionCategoria.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html'
})
export class StateComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public comparendo: Comparendo;
  public inmovilizacion: Inmovilizacion;
  public errorMessage;
  public respuesta;
  public consecutivo: any = null;
  public funcionario: any;
  public vehiculo: any;
  public ciudadano: any;
  public testigo: any = [{ 'identificacion':null }];
  public validado = false;
  public placa: any;
  public identificacion: any;
  public propietariosVehiculo: any;
  public isCiudadano = false;
  public isEmpresa = false;
  public agentesTransito: any;
  public agenteTransitoSelected: any;
  public municipios: any;
  public municipioSelected: any;
  public municipioNacimientoSelected: any;
  public infractorTipos: any;
  public infractorTipoSelected: any;
  public categorias: any;
  public categoriaSelected: any;
  public patios: any;
  public patioSelected: any;
  public gruas: any;
  public gruaSelected: any;
  public comparendoEstados: any;
  public comparendoEstadoSelected: any; 
  public infracciones: any;
  public infraccionSelected: any;
  public tipoIdentificacionSelected: any;
  public tiposIdentificacion: any;

constructor(
  private _ComparendoService: ComparendoService,
  private _loginService: LoginService,
  private _MpersonalFuncionarioService: MpersonalFuncionarioService,
  private _MpersonalComparendoService: MpersonalComparendoService,
  private _SedeOperativaService: SedeOperativaService,
  private _MunicipioService: MunicipioService,
  private _VechiculoService: VehiculoService,
  private _CiudadanoService: CiudadanoService,
  private _ciudadanoVehiculoService: CiudadanoVehiculoService,
  private _TipoIdentificacionService: TipoIdentificacionService,
  private _MparqPatioService: MparqPatioService,
  private _MparqGruaService: MparqGruaService,
  private _CfgComparendoEstadoService: CfgComparendoEstadoService,
  private _MflInfraccionService: MflInfraccionService,
  private _CfgTipoInfractorService: CfgTipoInfractorService,
  private _CfgLicenciaConduccionCategoriaService: CfgLicenciaConduccionCategoriaService,
  ){}

  ngOnInit() {
   this.placa = {
     'placa' : this.placa,
   }; 
   this.identificacion = {
     'numeroIdentificacion' : this.identificacion,
   }; 
    this.comparendo = new Comparendo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.inmovilizacion = new Inmovilizacion(null, null, null);

    this._MpersonalFuncionarioService.selectAgentes().subscribe(
      response => {
        this.agentesTransito = response;
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

  onCancelar(){
    this.validado = false;
  }

  onEnviar(){
    let token = this._loginService.getToken();
    this.comparendo.municipioId = this.municipioSelected;
    this.comparendo.infraccionId = this.infraccionSelected;
    this.comparendo.estadoId = this.comparendoEstadoSelected;
    this.comparendo.tipoInfractorId = this.infractorTipoSelected;
    this.comparendo.vehiculoId = this.vehiculo.id;
    this.comparendo.ciudadanoId = this.ciudadano.id;
    this.comparendo.testigoId = this.testigo.id;

    this.inmovilizacion.gruaId = this.gruaSelected;
    this.inmovilizacion.patioId = this.patioSelected;

    let datos = {
      'comparendo': this.comparendo,
      'inmovilizacion': this.inmovilizacion
    }
    
		this._ComparendoService.register(datos,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.validado = false;
        }else{
          swal({
            title: 'Error!',
            text: 'la comparendo '+ this.comparendo.consecutivo +' ya se encuentra registrado',
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

  onChangedMpersonalFuncionario(e){
    if (e) {
     let token = this._loginService.getToken();
     this._MpersonalFuncionarioService.show(token,e).subscribe(
        response => {
          this.funcionario = response.data;
          this.comparendo.consecutivo = this.funcionario.sedeOperativa.codigoDivipo;
          this.comparendo.funcionarioId = this.funcionario.id;
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
  }

  onValidarConsecutivo(){
    let token = this._loginService.getToken();

    let datos = {'consecutivo':this.comparendo.consecutivo, 'funcionarioId': this.comparendo.funcionarioId}
    this._MpersonalComparendoService.searchByConsecutivoAndFuncionario(datos,token).subscribe(
      response => {
        if(response.status == 'success'){
          this.validado = true;
          this.consecutivo = response.data;
          this.comparendo.consecutivoId = this.consecutivo.id;
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          this._MunicipioService.getMunicipioSelect().subscribe(
            response => {
              this.municipios = response;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

          this._MparqPatioService.select().subscribe(
            response => {
              this.patios = response;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

          this._MparqGruaService.select().subscribe(
            response => {
              this.gruas = response;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

          this._CfgComparendoEstadoService.select().subscribe(
            response => {
              this.comparendoEstados = response;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

          this._MflInfraccionService.select().subscribe(
            response => {
              this.infracciones = response;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

          this._CfgTipoInfractorService.select().subscribe(
            response => {
              this.infractorTipos = response;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

          this._CfgLicenciaConduccionCategoriaService.select().subscribe(
            response => {
              this.categorias = response;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
        }else{
          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
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

  onKeyPlaca(){
    swal({
      title: 'Cargando Datos del Vehiculo!',
      text: 'Solo tardará unos segundos por favor espere.',
      timer: 2500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });
  
    let token = this._loginService.getToken();
    this._VechiculoService.showVehiculoPlaca(token, this.placa).subscribe(
      response => {
        if (response.status == "success") {
          this.vehiculo = response.data;
          this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token, this.vehiculo.placa.numero).subscribe(
            response => {
              this.propietariosVehiculo = response.data;

              this.propietariosVehiculo.forEach(element => {
                if (element.ciudadano) {
                  this.isCiudadano = true;
                }
                if (element.empresa) {
                  this.isEmpresa = true;
                }
              });

              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert("Error en la petición");
                }
              }
            });

          
        }else {
          swal({
            title: 'Atención!',
            text: response.msj,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
          this.vehiculo = false;
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
  
  onSearchInfractor(){
    swal({
      title: 'Cargando Datos del Ciudadano!',
      text: 'Solo tardará unos segundos por favor espere.',
      timer: 1000,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });

    let token = this._loginService.getToken();
    this._CiudadanoService.searchByIdentificacion(token,this.identificacion).subscribe(
      response => {
        if (response.status == "success") {
          this.ciudadano = response.data;
        }else{
          swal({
            title: 'Atención!',
            text: response.msj,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
          
          this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
            response => {
              this.tiposIdentificacion = response;
            }, 
            error => {
              this.errorMessage = <any>error;
    
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
          this._MunicipioService.getMunicipioSelect().subscribe(
            response => {
              this.municipios = response;
            }, 
            error => {
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
          this.ciudadano = false;
        }
        console.log(this.vehiculo);
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición"); 
          }
        }

    }); 
  }

  onSearchTestigo() {
    swal({
      title: 'Cargando Datos del Ciudadano!',
      text: 'Solo tardará unos segundos por favor espere.',
      timer: 1000,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });

    let token = this._loginService.getToken();
    this._CiudadanoService.searchByIdentificacion(token, { 'numeroIdentificacion': this.testigo.identificacion} ).subscribe(
      response => {
        if (response.status == "success") {
          this.testigo = response.data;
        }else {
          swal({
            title: 'Atención!',
            text: response.msj,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
        console.log(this.vehiculo);
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

    });
  }

}