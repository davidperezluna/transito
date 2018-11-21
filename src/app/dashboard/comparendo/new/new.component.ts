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
import { VhloCfgRadioAccionService } from '../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgTransportePasajeroService } from '../../../services/vhloCfgTransportePasajero.service';
import { VhloCfgTransporteEspecialService } from '../../../services/vhloCfgTransporteEspecial.service';
import { ClaseService } from '../../../services/clase.service';
import { ServicioService } from '../../../services/servicio.service';
import { MflInfraccionService } from '../../../services/mflInfraccion.service';
import { CfgTipoInfractorService } from '../../../services/cfgTipoInfractor.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../services/cfgLicenciaConduccionCategoria.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public comparendo: Comparendo;
  public inmovilizacion: Inmovilizacion;
  public errorMessage;

  public horas = [
    '00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'
  ];

  public minutos = [
    '00', '10', '20', '30', '40', '50'
  ];

  public consecutivo: any = null;
  public edad: any = null;
  public funcionario: any;
  public vehiculo: any;
  public ciudadano: any = null;
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
  public municipioMatriculadoSelected: any;

  public infracciones: any;
  public infraccionSelected: any;

  public sedesOperativas: any;
  public servicios: any;
  public tiposVehiculo: any;
  public radiosAccion: any;
  public modalidadesTransporte: any;
  public transportesPasajero: any;
  public transportesEspecial: any;

  public infractorTipos: any;
  public infractorTipoSelected: any;
  public infraccion: any = null;

  public categorias: any;
  public categoriaSelected: any;

  public patios: any;
  public patioSelected: any;

  public gruas: any;
  public gruaSelected: any;

  public comparendoEstados: any;
  public comparendoEstadoSelected: any; 

  public tipoIdentificacionSelected: any;
  public tiposIdentificacion: any;

  public infractor = {
    'idTipoIdentificacion': null,
    'idCategoriaLicenciaConduccion': null,
    'identificacion': null,
    'licenciaConduccion': null,
    'fechaExpedicion': null,
    'fechaVencimiento': null,
    'nombres': null,
    'direccion': null,
    'edad': null,
    'telefono': null,
    'municipio': null,
    'correo': null,
  };

  public propietario = {
    'idTipoIdentificacion': null,
    'identificacion': null,
    'nombres': null,
  };

  public empresa = {
    'nombre': null,
    'nit': null,
    'tarjeta': null,
  };

  public testigo = {
    'nombres': null,
    'identificacion': null,
    'direccion': null,
    'telefono': null,
  };

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
  private _RadioAccionService: VhloCfgRadioAccionService,
  private _ModalidadTransporteService: VhloCfgModalidadTransporteService,
  private _TransportePasajeroService: VhloCfgTransportePasajeroService,
  private _TransporteEspecialService: VhloCfgTransporteEspecialService,
  private _ClaseService: ClaseService,
  private _ServicioService: ServicioService,
  private _MflInfraccionService: MflInfraccionService,
  private _CfgTipoInfractorService: CfgTipoInfractorService,
  private _CfgLicenciaConduccionCategoriaService: CfgLicenciaConduccionCategoriaService,
  ){}

  ngOnInit() {
    this.placa = {
      'placa': this.placa,
    };

    this.identificacion = {
      'numeroIdentificacion': this.identificacion,
    };

    this.comparendo = new Comparendo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
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

    this._RadioAccionService.select().subscribe(
      response => {
        this.radiosAccion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ModalidadTransporteService.select().subscribe(
      response => {
        this.modalidadesTransporte = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TransportePasajeroService.select().subscribe(
      response => {
        this.transportesPasajero = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ServicioService.getServicioSelect().subscribe(
      response => {
        this.servicios = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ClaseService.getClaseSelect().subscribe(
      response => {
        this.tiposVehiculo = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
      response => {
        this.tiposIdentificacion = response;
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

  onCancelar(){
    this.validado = false;
  }

  onEnviar(){
    let token = this._loginService.getToken();
    this.comparendo.municipioId = this.municipioSelected;
    this.comparendo.infraccionId = this.infraccionSelected;
    this.comparendo.tipoInfractorId = this.infractorTipoSelected;
    
    this.inmovilizacion.gruaId = this.gruaSelected;
    this.inmovilizacion.patioId = this.patioSelected;

    let datos = {
      'comparendo': this.comparendo,
      'inmovilizacion': this.inmovilizacion,
      'infractor': this.infractor,
      'propietario': this.propietario,
      'empresa': this.empresa,
      'testigo': this.testigo,
    }
    console.log(this.comparendo);
    
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

  onChangedMpersonalFuncionario(e){
    if (e) {
     let token = this._loginService.getToken();

      swal({
        title: 'Buscando consecutivo',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });

     this._MpersonalFuncionarioService.show(token,e).subscribe(
        response => {
          if (response.status == 'success') {
            this.funcionario = response.data;
            this.comparendo.funcionarioId = this.funcionario.id;
  
            this._MpersonalComparendoService.searchLastByFuncionario({ 'funcionario': this.funcionario }, token).subscribe(
              response => {
                if (response.status == 'success') {
                  swal.close();

                  this.consecutivo = response.data;
                  this.comparendo.consecutivoId = this.consecutivo.id;
  
                  this.consecutivo = response.data;
                }else{
                  swal({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                  });
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
          }else{
            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
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
            }
          );
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

          this._CiudadanoService.calculateAge({'fechaNacimiento':this.ciudadano.fechaNacimiento}, token).subscribe(
            response => {
              this.edad = response.data;

              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert("Error en la petición");
                }
              }
            }
          );

        }else{
          swal({
            title: 'Atención!',
            text: response.msj,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
          
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

  onChangedInfraccion(e) {
    if (e) {
      let token = this._loginService.getToken();
      this._MflInfraccionService.show({'id':e}, token).subscribe(
        response => {
          this.infraccion = response.data;

          this._MflInfraccionService.calculateValue({'idInfraccion': this.infraccion.id}, token).subscribe(
            response => {
              this.infraccion.valor = response.data;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
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