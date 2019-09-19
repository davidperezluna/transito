import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CvCdoComparendo } from '../cvCdoComparendo.modelo';
import { CvCdoComparendoService } from '../../../../../services/cvCdoComparendo.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { PnalCfgCdoConsecutivoService } from '../../../../../services/pnalCfgCdoConsecutivo.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { CfgTipoInfractorService } from '../../../../../services/cfgTipoInfractor.service';
import { UserLcCfgCategoriaService } from '../../../../../services/userLcCfgCategoria.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { UserEmpresaService } from '../../../../../services/userEmpresa.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { PqoCfgPatioService } from '../../../../../services/pqoCfgPatio.service';
import { PqoCfgGruaService } from '../../../../../services/pqoCfgGrua.service';
import { PqoInmovilizacionService } from '../../../../../services/pqoInmovilizacion.service';
import { VhloCfgRadioAccionService } from '../../../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgTransportePasajeroService } from '../../../../../services/vhloCfgTransportePasajero.service';
import { VhloCfgTransporteEspecialService } from '../../../../../services/vhloCfgTransporteEspecial.service';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../../services/vhloCfgServicio.service';
import { FroInfraccionService } from '../../../../../services/froInfraccion.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-cvcdocomparendo',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public comparendo: CvCdoComparendo;
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
  public inmovilizacionOld: any;

  public searchByIdentificacion = false;
  public isEmpresa = false;
  
  public agentesTransito: any;
  public agenteTransitoSelected: any = null;

  public municipios: any;
  public organismosTransito: any;
  public organismosTransitoNacional: any;

  public infracciones: any;

  public servicios: any;
  public clases: any;
  public radiosAccion: any;
  public modalidadesTransporte: any;
  public transportesPasajero: any;
  public transportesEspecial: any;

  public infractorTipos: any;
  public infraccion: any = null;
  public categorias: any;
  public patios: any;
  public gruas: any;
  public tiposIdentificacion: any;
  public comparendoEstados: any;

  public apiUrl = environment.apiUrl;

  public search = {
    'idFuncionario': null,
    'numero': null,
  }

  public infractor = {
    'idTipoIdentificacion': null,
    'idCategoriaLicenciaConduccion': null,
    'idTipoInfractor': null,
    'identificacion': null,
    'licenciaConduccion': null,
    'fechaExpedicion': null,
    'fechaVencimiento': null,
    'nombres': null,
    'direccion': null,
    'edad': null,
    'telefono': null,
    'idMunicipio': null,
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

  public inmovilizacion = {
    'idPatio': null,
    'idGrua': null,
  };

constructor(
  private _ComparendoService: CvCdoComparendoService,
  private _FuncionarioService: PnalFuncionarioService,
  private _ConsecutivoService: PnalCfgCdoConsecutivoService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _MunicipioService: CfgMunicipioService,
  private _UserCiudadanoService: UserCiudadanoService,
  private _EmpresaService: UserEmpresaService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _PqoCfgPatioService: PqoCfgPatioService,
  private _PqoCfgGruaService: PqoCfgGruaService,
  private _InmovilizacionService: PqoInmovilizacionService,
  private _RadioAccionService: VhloCfgRadioAccionService,
  private _ModalidadTransporteService: VhloCfgModalidadTransporteService,
  private _TransportePasajeroService: VhloCfgTransportePasajeroService,
  private _TransporteEspecialService: VhloCfgTransporteEspecialService,
  private _ClaseService: VhloCfgClaseService,
  private _ServicioService: VhloCfgServicioService,
  private _FroInfraccionService: FroInfraccionService,
  private _TipoInfractorService: CfgTipoInfractorService,
  private _CfgLicenciaConduccionCategoriaService: UserLcCfgCategoriaService,
  private _LoginService: LoginService,
  ){}
  
  ngOnInit() {
    swal({
      title: 'Cargando agentes!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.placa = {
      'placa': this.placa,
    };

    this.identificacion = {
      'numeroIdentificacion': this.identificacion,
    };

    this.comparendo = new CvCdoComparendo(null,null,null,null,null,null,null,null,null,null,null,null,false,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

    this._FuncionarioService.selectAgentes().subscribe(
      response => {
        this.agentesTransito = response;

        swal.close();
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
    swal({
      title: 'Guardando comparendo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });
    
    let token = this._LoginService.getToken();

    let datos = {
      'comparendo': this.comparendo,
      'inmovilizacion': this.inmovilizacion,
      'infractor': this.infractor,
      'propietario': this.propietario,
      'empresa': this.empresa,
      'testigo': this.testigo,
    }
    
		this._ComparendoService.register(datos,token).subscribe(
			response => {
        if(response.code == 200){
          this.comparendo = response.data;
          this.consecutivo = null;

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
            text: 'El comparendo '+ this.comparendo.consecutivo +' ya se encuentra registrado',
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

  onSearchComparendo(){
    if (this.search.idFuncionario) {
     let token = this._LoginService.getToken();

      swal({
        title: 'Buscando consecutivo',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });

      this._FuncionarioService.show({ 'id': this.search.idFuncionario }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.funcionario = response.data;
            this.comparendo.idFuncionario = this.funcionario.id;
  
            this._ConsecutivoService.searchByNumeroAndFuncionario(this.search, token).subscribe(
              response => {
                if (response.code == 200) {
                  swal.close();

                  this.consecutivo = response.data;
                  this.comparendo.idConsecutivo = this.consecutivo.id;
  
                  this.consecutivo = response.data;

                  this._InmovilizacionService.findByComparendo({ 'numero':this.consecutivo.numero }, token).subscribe(
                    response => {
                      if (response.code == 200) {
                        this.inmovilizacionOld = response.data;
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

                  this._MunicipioService.select().subscribe(
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
              
                  this._OrganismoTransitoService.selectSedes().subscribe(
                    response => {
                      this.organismosTransito = response;
                    },
                    error => {
                      this.errorMessage = <any>error;
              
                      if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                      }
                    }
                  );

                  this._OrganismoTransitoService.select().subscribe(
                    response => {
                      this.organismosTransitoNacional = response;
                    },
                    error => {
                      this.errorMessage = <any>error;
              
                      if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                      }
                    }
                  );
              
                  this._PqoCfgPatioService.select().subscribe(
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
              
                  this._PqoCfgGruaService.select().subscribe(
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
              
                  this._FroInfraccionService.select().subscribe(
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
              
                  this._TipoInfractorService.select().subscribe(
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
              
                  this._TransporteEspecialService.select().subscribe(
                    response => {
                      this.transportesEspecial = response;
                    },
                    error => {
                      this.errorMessage = <any>error;
              
                      if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                      }
                    }
                  );
              
                  this._ServicioService.select().subscribe(
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
              
                  this._ClaseService.select().subscribe(
                    response => {
                      this.clases = response;
                    },
                    error => {
                      this.errorMessage = <any>error;
              
                      if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                      }
                    }
                  );
              
                  this._TipoIdentificacionService.select().subscribe(
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
  
  onSearchPropietario(){
    let token = this._LoginService.getToken();

    let datos = { 
      'identificacion': this.propietario.identificacion, 
      'idTipoIdentificacion': 1,
    }

    this._UserCiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.status == "success") {
          this.ciudadano = response.data.ciudadano;

          this.propietario.nombres = this.ciudadano.primerNombre + ' ' + this.ciudadano.primerApellido;
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

  onSearchEmpresa() {
    let token = this._LoginService.getToken();

    this._EmpresaService.showByNit(token, { 'nit':this.empresa.nit}).subscribe(
      response => {
        if (response.status == "success") {
          this.empresa.nombre = response.data.nombre;
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

  onSearchInfractor() {
    let token = this._LoginService.getToken();

    let datos = { 
      'identificacion': this.infractor.identificacion, 
      'idTipoIdentificacion': 1,
    }

    this._UserCiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.status == "success") {
          this.ciudadano = response.data.ciudadano;

          this._UserCiudadanoService.calculateAge({ 'fechaNacimiento': this.ciudadano.fechaNacimiento }, token).subscribe(
            response => {
              this.infractor.edad = response.data;

              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert("Error en la petición");
                }
              }
            }
          );

          this.infractor.nombres = this.ciudadano.primerNombre + ' ' + this.ciudadano.primerApellido;

          if (this.ciudadano.ciudadano.direccion) {
            this.infractor.direccion = this.ciudadano.ciudadano.direccion;
          }
          if (this.ciudadano.ciudadano.telefono) {
            this.infractor.telefono = this.ciudadano.ciudadano.telefono;
          }
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

  onChangedInfraccion(e) {
    if (e) {
      let token = this._LoginService.getToken();
      this._FroInfraccionService.show({'id':e}, token).subscribe(
        response => {
          this.infraccion = response.data;

          this._FroInfraccionService.calculateValue({'idInfraccion': this.infraccion.id}, token).subscribe(
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

    let token = this._LoginService.getToken();

    let datos = { 
      'identificacion': this.testigo.identificacion, 
      'idTipoIdentificacion': 1,
    }

    this._UserCiudadanoService.searchByIdentificacion(datos, token).subscribe(
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