import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { MsvRegistroIpatService } from '../../../services/msvRegistroIpat.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { MsvConsecutivoService } from '../../../services/msvConsecutivo.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { SvCfgGravedadAccidenteService } from '../../../services/svCfgGravedadAccidente.service';
import { MsvRegistroIpat } from '../msvRegistroIpat.modelo';

import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { SvCfgClaseAccidenteService } from '../../../services/svCfgClaseAccidente.service';
import { CfgChoqueConService } from '../../../services/cfgChoqueCon.service';
import { CfgObjetoFijoService } from '../../../services/cfgObjetoFijo.service';
import { SvCfgAreaService } from "../../../services/svCfgArea.service";
import { SvCfgSectorService } from "../../../services/svCfgSector.service";
import { SvCfgZonaService } from "../../../services/svCfgZona.service";
import { SvCfgDisenioService } from "../../../services/svCfgDisenio.service";
import { SvCfgEstadoTiempoService } from "../../../services/svCfgEstadoTiempo.service";
import { SvCfgGeometriaService } from "../../../services/svCfgGeometria.service";
import { SvCfgUtilizacionService } from "../../../services/svCfgUtilizacion.service";
import { SvCfgCalzadaCarrilService } from "../../../services/svCfgCalzadaCarril.service";
import { SvCfgMaterialService } from "../../../services/svCfgMaterial.service";
import { SvCfgEstadoViaService } from "../../../services/svCfgEstadoVia.service";
import { SvCfgCondicionViaService } from "../../../services/svCfgCondicionVia.service";
import { SvCfgIluminacionService } from "../../../services/svCfgIluminacion.service";
import { SvCfgEstadoIluminacionService } from "../../../services/svCfgEstadoIluminacion.service";
import { SvCfgVisualService } from "../../../services/svCfgVisual.service";
import { SvCfgVisualDisminuidaService } from "../../../services/svCfgVisualDisminuida.service";
import { SvCfgResultadoExamenService } from "../../../services/svCfgResultadoExamen.service";
import { SvCfgGradoExamenService } from "../../../services/svCfgGradoExamen.service";
import { SvCfgHospitalService } from "../../../services/svCfgHospital.service";
import { UserEmpresaService } from "../../../services/userEmpresa.service";
import { SvCfgFallaService } from "../../../services/svCfgFalla.service";
import { SvCfgLugarImpactoService } from "../../../services/svCfgLugarImpacto.service";
import { VhloCfgClaseService } from "../../../services/vhloCfgClase.service";
import { VhloCfgServicioService } from "../../../services/vhloCfgServicio.service";
import { SvCfgHipotesisService } from "../../../services/svCfgHipotesis.service";
import { SvCfgTipoVictimaService } from "../../../services/svCfgTipoVictima.service";
import { SvCfgGravedadVictimaService } from "../../../services/svCfgGravedadVictima.service";
import { SvCfgUnidadReceptoraService } from "../../../services/svCfgUnidadReceptora.service";

import { UserCfgTipoIdentificacionService } from "../../../services/userCfgTipoIdentificacion.service";
import { SvCfgNacionalidadService } from "../../../services/svCfgNacionalidad.service";
import { UserCfgGeneroService } from "../../../services/userCfgGenero.service";


import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
import { Utils } from 'ng2-bootstrap';
import { SvCfgAseguradoraService } from '../../../services/svCfgAseguradora.service';
import { SvCfgControlViaService } from '../../../services/svCfgControlVia.service';
import { SvCfgEntidadAccidenteService } from '../../../services/svCfgEntidadAccidente.service';
import { VhloCfgMarcaService } from '../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../services/vhloCfgLinea.service';
import { VhloCfgColorService } from '../../../services/vhloCfgColor.service';
import { VhloCfgModalidadTransporteService } from '../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgCarroceriaService } from '../../../services/vhloCfgCarroceria.service';
import { VhloCfgRadioAccionService } from '../../../services/vhloCfgRadioAccion.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() lugaresImpacto: any = null;
  public msvRegistroIpat: MsvRegistroIpat;
  public organismoTransito: any;
  public errorMessage;

  public nroIpat: any;
  public consecutivo: any = null;
  public ipatEncontrado: any = null;
  public ipats = false;

  public gravedades: any;
  public clasesAccidente: any;
  public choquesCon: any;
  public objetosFijos: any;
  public organismosTransito: any;
  public aseguradoras: any;
  public areas: any;
  public sectores: any;
  public zonas: any;
  public disenios: any;
  public estadosTiempo: any;
  public geometrias: any;
  public utilizaciones: any;
  public calzadasCarriles: any;
  public materiales: any;
  public estadosVia: any;
  public condicionesVia: any;
  public iluminaciones: any;
  public fallas: any;
  public estadosIluminacion: any;
  public visuales: any;
  public visualesDisminuidas: any;

  public estadosSemaforo: any;
  public senialesVerticales: any;
  public senialesHorizontales: any;
  public reductoresVelocidad: any;
  public delineadoresPiso: any;

  public resultadosExamen: any;
  public gradosExamen: any;
  public licenciasConduccion: any;
  public hospitales: any;
  public empresas: any;

  public inmovilizaciones: any;
  public tecnomecanicas: any;
  public soats: any;
  public propietariosVehiculo: any;
  public clases: any;
  public servicios: any;
  public modalidadesTransporte: any;
  public radioAciones: any;
  public hipotesis: any;
  public tiposVictima: any;
  public gravedadesVictima: any;

  public tiposIdentificacion: any;
  public nacionalidades: any;
  public generos: any;
  public municipios: any;
  public departamentos: any;
  public entidades: any;
  public unidades: any;
  public anios = [];

  public conductores= [];
  public vehiculos = [];
  public victimas = [];


  public tipoIdentificacionConductorSelected: any;
  public tipoIdentificacionPropietarioSelected: any;
  public tipoIdentificacionVictimaSelected: any;
  public tipoIdentificacionTestigoSelected: any;
  public tipoIdentificacionAgenteSelected: any;

  public nacionalidadConductorSelected: any;
  public nacionalidadVictimaSelected: any;

  public sexoConductorSelected: any;
  public sexoVictimaSelected: any;

  public ciudadResidenciaConductorSelected: any;
  public ciudadResidenciaTestigoSelected: any;
  public ciudadResidenciaVictimaSelected: any;

  //
  public tipoVictimaSelected: any;
  public gravedadVictimaSelected: any;
  public gravedadConductorSelected: any;

  //select vehiculo
  public nacionalidadVehiculoSelected: any;
  public marcaSelected: any;
  public lineaSelected: any;
  public colorSelected: any;
  public carroceriaSelected: any;
  public claseSelected: any;
  public servicioSelected: any;
  public modalidadTransporteSelected: any;
  public radioAccionSelected: any;
  public matriculadoEnSelected: any;

  public marcas: any;
  public lineas: any;
  public colores: any;
  public carrocerias: any;
  public radiosAccion: any;

  //array para vehiculos nuevos creados en ipat
  public vehiculosIpat = [];
  public vehiculoIpat = false;

  public fechaActual: any;

  public usuario = false;
  public vhl = false;
  
  //validacion campos individuales para vehiculo
  public vhlNacionalidad = false;
  public vhlMarca = false;
  public vhlColor = false;
  public vhlModelo = false;
  public vhlCarroceria = false;
  public vhlClase = false;
  public vhlServicio = false;
  public vhlModalidad = false;
  public vhlRadioAccion = false;
  public vhlPasajeros = false;
  public vhlMatriculadoEn = false;

  //validacion campos individuales conductor
  public cdnTipoIdentificacionConductor = false;
  public cdnPrimerNombreConductor = false;
  public cdnSegundoNombreConductor = false;
  public cdnPrimerApellidoConductor = false;
  public cdnSegundoApellidoConductor = false;
  public cdnFechaNacimientoConductor = false;
  public cdnSexoConductor = false;
  public cdnDireccionConductor = false;
  public cdnMunicipioConductor = false;
  public cdnTelefonoConductor = false;
  public cdn = false;
  
  public agente = false;
  public victima = false;
  public testigo = false;
  public msmConductor = false;
  public licencia = false;
  public numeroCorrespondio = false;

  public contConductores = 0;
  public contPasajeros = 0;
  public contPeatones = 0;
  public contHeridos = 0;
  public contMuertos = 0;
  public contAcompaniantes = 0;


/*   public resumen = {}; public datos = {
  }

  public datosVehiculo = {
    'vehiculos': [],
    'cDemandante': [],
    'cDemandado': [],
  } */

  constructor(
    private _MsvRegistroIpatService: MsvRegistroIpatService,

    private _UserCiudadanoService: UserCiudadanoService,
    private _FuncionarioService: PnalFuncionarioService,
    private _MsvConsecutivoService: MsvConsecutivoService,
    private _LoginService: LoginService,
    private _MunicipioService: CfgMunicipioService,
    private _GravedadService: SvCfgGravedadAccidenteService,
    private _ClaseAccidenteService: SvCfgClaseAccidenteService,
    private _ChoqueConService: CfgChoqueConService,
    private _ObjetoFijoService: CfgObjetoFijoService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _AseguradoraService: SvCfgAseguradoraService,
    private _AreaService: SvCfgAreaService,
    private _SectorService: SvCfgSectorService,
    private _ZonaService: SvCfgZonaService,
    private _DisenioService: SvCfgDisenioService,
    private _EstadoTiempoService: SvCfgEstadoTiempoService,
    private _GeometriaService: SvCfgGeometriaService,
    private _UtilizacionService: SvCfgUtilizacionService,
    private _CalzadaCarrilService: SvCfgCalzadaCarrilService,
    private _MaterialService: SvCfgMaterialService,
    private _EstadoViaService: SvCfgEstadoViaService,
    private _CondicionViaService: SvCfgCondicionViaService,
    private _IluminacionService: SvCfgIluminacionService,
    private _EstadoIluminacionService: SvCfgEstadoIluminacionService,
    private _VisualService: SvCfgVisualService,
    private _VisualDisminuidaService: SvCfgVisualDisminuidaService,
    private _ControlViaService: SvCfgControlViaService,
    private _ResultadoExamenService: SvCfgResultadoExamenService,
    private _GradoExamenService: SvCfgGradoExamenService,
    private _HospitalService: SvCfgHospitalService,
    private _EmpresaService: UserEmpresaService,
    private _FallaService: SvCfgFallaService,
    private _LugarImpactoService: SvCfgLugarImpactoService,
    private _ClaseService: VhloCfgClaseService,
    private _ServicioService: VhloCfgServicioService,
    private _HipotesisService: SvCfgHipotesisService,
    private _TipoVictimaService: SvCfgTipoVictimaService,
    private _GravedadVictimaService: SvCfgGravedadVictimaService,

    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _NacionalidadService: SvCfgNacionalidadService,
    private _GeneroService: UserCfgGeneroService,

    private _EntidadService: SvCfgEntidadAccidenteService,
    private _UnidadReceptoraService: SvCfgUnidadReceptoraService,

    private _MarcaService: VhloCfgMarcaService,
    private _LineaService: VhloCfgLineaService,
    private _ColorService: VhloCfgColorService,
    private _CarroceriaService: VhloCfgCarroceriaService,
    private _ModalidadTransporteService: VhloCfgModalidadTransporteService,
    private _RadioAccionService: VhloCfgRadioAccionService,

  ) { }

  ngOnInit() {
    this.msvRegistroIpat = new MsvRegistroIpat(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();
    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      responseFuncionario => {
        if (responseFuncionario.status == 'success') {
          this.organismoTransito = responseFuncionario.data.organismoTransito;

          swal({
            title: 'Buscando IPAT en ' + this.organismoTransito.nombre,
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
              swal.showLoading();
            }
          });
          this._ControlViaService.getSenialVerticalSelect().subscribe(
              response => {
                this.senialesVerticales = response;
              },
                error => {
                  this.errorMessage = <any>error;

                  if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
          );
          this._ControlViaService.getSenialHorizontalSelect().subscribe(
            response => {
              this.senialesHorizontales = response;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

          this._ControlViaService.getReductorVelocidadSelect().subscribe(
            response => {
              this.reductoresVelocidad = response;
            },  
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
          this._ControlViaService.getControlViaSemaforoSelect().subscribe(
            response => {
              this.estadosSemaforo = response;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

          this._MsvConsecutivoService.searchLastBySede({ 'organismoTransito': this.organismoTransito }, token).subscribe(
            response => {
              if (response.status == 'success') {
                swal.close();

                this.consecutivo = response.data;

                this._GravedadService.select().subscribe(
                  response => {
                    this.gravedades = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._ClaseAccidenteService.select().subscribe(
                  response => {
                    this.clasesAccidente = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._ChoqueConService.getChoqueConSelect().subscribe(
                  response => {
                    this.choquesCon = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._ObjetoFijoService.getObjetoFijoSelect().subscribe(
                  response => {
                    this.objetosFijos = response;
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
                this._AreaService.getAreaSelect().subscribe(
                  response => {
                    this.areas = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._AseguradoraService.getAseguradoraSelect().subscribe(
                  response => {
                    this.aseguradoras = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._SectorService.getSectorSelect().subscribe(
                  response => {
                    this.sectores = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._ZonaService.getZonaSelect().subscribe(
                  response => {
                    this.zonas = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._FallaService.getFallaSelect().subscribe(
                  response => {
                    this.fallas = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._DisenioService.getDisenioSelect().subscribe(
                  response => {
                    this.disenios = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._EstadoTiempoService.select().subscribe(
                  response => {
                    this.estadosTiempo = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._GeometriaService.getGeometriaSelect().subscribe(
                  response => {
                    this.geometrias = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._UtilizacionService.getUtilizacionSelect().subscribe(
                  response => {
                    this.utilizaciones = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._CalzadaCarrilService.getCalzadaCarrilSelect().subscribe(
                  response => {
                    this.calzadasCarriles = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._MaterialService.getMaterialSelect().subscribe(
                  response => {
                    this.materiales = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._EstadoViaService.getEstadoViaSelect().subscribe(
                  response => {
                    this.estadosVia = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._CondicionViaService.getCondicionViaSelect().subscribe(
                  response => {
                    this.condicionesVia = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._IluminacionService.getIluminacionSelect().subscribe(
                  response => {
                    this.iluminaciones = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._EstadoIluminacionService.getEstadoIluminacionSelect().subscribe(
                  response => {
                    this.estadosIluminacion = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._VisualService.getVisualSelect().subscribe(
                  response => {
                    this.visuales = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._VisualDisminuidaService.getVisualDisminuidaSelect().subscribe(
                  response => {
                    this.visualesDisminuidas = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._ControlViaService.getControlViaSemaforoSelect().subscribe(
                  response => {
                    this.estadosSemaforo = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._ControlViaService.getControlViaDelineadorPisoSelect().subscribe(
                  response => {
                    this.delineadoresPiso = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._ResultadoExamenService.getResultadoExamenSelect().subscribe(
                  response => {
                    this.resultadosExamen = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._GradoExamenService.getGradoExamenSelect().subscribe(
                  response => {
                    this.gradosExamen = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._LugarImpactoService.getLugarImpactoSelect().subscribe(
                  response => {
                    this.lugaresImpacto = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._HospitalService.getHospitalSelect().subscribe(
                  response => {
                    this.hospitales = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._EmpresaService.select().subscribe(
                  response => {
                    this.empresas = response;
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
                this._HipotesisService.getHipotesisSelect().subscribe(
                  response => {
                    this.hipotesis = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._TipoVictimaService.getTipoVictimaSelect().subscribe(
                  response => {
                    this.tiposVictima = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );

                this._GravedadVictimaService.getGravedadVictimaSelect().subscribe(
                  response => {
                    this.gravedadesVictima = response;
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
                
                this._NacionalidadService.getNacionalidadSelect().subscribe(
                  response => {
                    this.nacionalidades = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );

                this._GeneroService.select().subscribe(
                  response => {
                    this.generos = response;
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
                this._EntidadService.getEntidadAccidenteSelect().subscribe(
                  response => {
                    this.entidades = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._UnidadReceptoraService.getUnidadReceptoraSelect().subscribe(
                  response => {
                    this.unidades = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._MarcaService.getMarcaSelect().subscribe(
                  response => {
                    this.marcas = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._LineaService.select().subscribe(
                  response => {
                    this.lineas = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._ColorService.select().subscribe(
                  response => {
                    this.colores = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._CarroceriaService.select().subscribe(
                  response => {
                    this.carrocerias = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._CarroceriaService.select().subscribe(
                  response => {
                    this.carrocerias = response;
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

                this.fechaActual = new Date().getFullYear();
                for (let i = 1990; i <= (this.fechaActual); i++) {
                  let obj = {
                    value: i,
                    label: i
                  };
                  this.anios.push(obj);
                }
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
            }
          );
          /* ==================== */

        } else {
          swal({
            title: 'Alerta!',
            text: responseFuncionario.message,
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
      }
    );
  }

  onCancelar() {
    this.ready.emit(true);
  }

  enviarTramite() {
    let token = this._LoginService.getToken();

    this.msvRegistroIpat.tipoIdentificacionConductor = this.tipoIdentificacionConductorSelected;
    this.msvRegistroIpat.nacionalidadConductor = this.nacionalidadConductorSelected;
    this.msvRegistroIpat.sexoConductor = this.sexoConductorSelected;
    this.msvRegistroIpat.idGravedadConductor = this.gravedadConductorSelected;
    this.msvRegistroIpat.ciudadResidenciaConductor = this.ciudadResidenciaConductorSelected;

    this.msvRegistroIpat.tipoIdentificacionPropietario = this.tipoIdentificacionPropietarioSelected;

    this.msvRegistroIpat.tipoIdentificacionAgente = this.tipoIdentificacionAgenteSelected;

    this.msvRegistroIpat.tipoIdentificacionTestigo = this.tipoIdentificacionTestigoSelected;
    this.msvRegistroIpat.ciudadResidenciaTestigo = this.ciudadResidenciaTestigoSelected;

    this.msvRegistroIpat.tipoIdentificacionVictima = this.tipoIdentificacionVictimaSelected;

    this.msvRegistroIpat.nacionalidadVictima = this.nacionalidadVictimaSelected;
    this.msvRegistroIpat.nacionalidadVehiculo = this.nacionalidadVehiculoSelected;

    this.msvRegistroIpat.sexoVictima = this.sexoVictimaSelected;

    this.msvRegistroIpat.ciudadResidenciaVictima = this.ciudadResidenciaVictimaSelected;

    this.msvRegistroIpat.marca = this.marcaSelected;
    this.msvRegistroIpat.linea = this.lineaSelected;
    this.msvRegistroIpat.color = this.colorSelected;
    this.msvRegistroIpat.carroceria = this.carroceriaSelected;
    this.msvRegistroIpat.clase = this.claseSelected;
    this.msvRegistroIpat.servicio = this.servicioSelected;
    this.msvRegistroIpat.modalidadTransporte = this.modalidadTransporteSelected;
    this.msvRegistroIpat.matriculadoEn = this.matriculadoEnSelected;

    if(this.conductores.length == 0) {
        let dataConductores = {
        'identificacion': this.msvRegistroIpat.identificacionConductor,
        'tipo identificacion': this.msvRegistroIpat.tipoIdentificacionConductor,
        'nombres': this.msvRegistroIpat.nombresConductor,
        'apellidos': this.msvRegistroIpat.apellidosConductor,
        'nacionalidad': this.nacionalidadConductorSelected,
        'fecha nacimiento': this.msvRegistroIpat.fechaNacimientoConductor,
        'sexo': this.sexoConductorSelected,
        'gravedad': this.gravedadConductorSelected,
        'direccion': this.msvRegistroIpat.direccionResidenciaConductor,
        'ciudad residencia': this.ciudadResidenciaConductorSelected,
        'teléfono': this.msvRegistroIpat.telefonoConductor,
      };
      this.conductores.push(dataConductores);
    }

    if(this.vehiculos.length == 0) {
      let dataVehiculos = {
        'placa': this.msvRegistroIpat.placa,
        'nacionalidad': this.nacionalidadVehiculoSelected,
        'marca': this.marcaSelected,
        'linea': this.lineaSelected,
        'color': this.colorSelected,
        'modelo': this.msvRegistroIpat.modelo,
        'carroceria': this.carroceriaSelected,
        'clase vehiculo': this.claseSelected,
        'servicio': this.servicioSelected,
        'modalidad transporte': this.modalidadTransporteSelected,
        'capacidad carga(ton)': this.msvRegistroIpat.ton,
        'pasajeros': this.msvRegistroIpat.pasajeros,
        'matriculado en': this.matriculadoEnSelected,
      };
      this.vehiculos.push(dataVehiculos);
    }

    if(this.victimas.length == 0) {
      let dataVictimas = {
        'tipo victima': this.tipoVictimaSelected,
        'gravedad victima': this.gravedadVictimaSelected,
        'tipo documento': this.tipoIdentificacionVictimaSelected,
        'identificacion': this.msvRegistroIpat.identificacionVictima,
        'nombres': this.msvRegistroIpat.nombresVictima,
        'apellidos': this.msvRegistroIpat.apellidosVictima,
        'nacionalidad': this.nacionalidadVictimaSelected,
        'fecha nacimiento': this.msvRegistroIpat.fechaNacimientoVictima,
        'sexo': this.sexoVictimaSelected,
        'dirección residencia': this.msvRegistroIpat.direccionResidenciaVictima,
        'ciudad residencia': this.ciudadResidenciaVictimaSelected,
        'telefono': this.msvRegistroIpat.telefonoVictima,
        'placa de vehiculo al que pertenece': this.msvRegistroIpat.placaVehiculoVictima,
      };
      this.victimas.push(dataVictimas);
    }

    let data = [
      { 'datosLimitacion': this.msvRegistroIpat },
      { 'consecutivo': this.consecutivo },
      { 'dataConductores': this.conductores },
      { 'dataVehiculos': this.vehiculos },
      { 'dataVictimas': this.victimas },
    ];
    this._MsvRegistroIpatService.register(data, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
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

  onSearch() {
    swal({
      title: 'Buscando IPAT',
      text: 'Solo tardará unos segundos, por favor espere.',
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
  }


  /* delete(vehiculo: any): void {
    this.datosVehiculo.vehiculos = this.datosVehiculo.vehiculos.filter(h => h !== vehiculo);
    if (this.datosVehiculo.vehiculos.length === 0) {
      this.ipats = false;
    }
  } */

  /* btnNewVehiculo() {
    this.datosVehiculo.vehiculos.push(
      {
        'placa': this.consecutivo,
        'sedeOperativa': this.consecutivo
      }
    );

    this.ipatEncontrado = 1;
    this.ipats = true;
  }

  btnCancelarVehiculo() {
    this.ipatEncontrado = 1;
  } */

  onBuscarConductor() {
    let token = this._LoginService.getToken();
    if (this.msvRegistroIpat.identificacionConductor) {
      this._MsvRegistroIpatService.getBuscarConductor({ 'identificacion': this.msvRegistroIpat.identificacionConductor }, token).subscribe(

        response => {

          if (response.status == 'success') {
            this.usuario = true;
            if (response.data.tipoIdentificacion != null) {
              this.cdnTipoIdentificacionConductor = true;
              this.tipoIdentificacionConductorSelected = [response.data.tipoIdentificacion.id];
            } else {
              this.cdnTipoIdentificacionConductor = false;
              this.tipoIdentificacionConductorSelected = [0];
            }
            if (response.data.segundoNombre == null) {
              this.cdnPrimerNombreConductor = true;
              this.cdnSegundoNombreConductor = true;
              this.msvRegistroIpat.nombresConductor = response.data.primerNombre;
            } else {
              this.cdnPrimerNombreConductor = true;
              this.cdnSegundoNombreConductor = true;
              this.msvRegistroIpat.nombresConductor = response.data.primerNombre + ' ' + response.data.segundoNombre;
            }
            if (response.data.segundoApellido == null) {
              this.cdnPrimerApellidoConductor = true;
              this.cdnSegundoApellidoConductor = true;
              this.msvRegistroIpat.apellidosConductor = response.data.primerApellido;
            } else {
              this.cdnPrimerApellidoConductor = true;
              this.cdnSegundoApellidoConductor = true;
              this.msvRegistroIpat.apellidosConductor = response.data.primerApellido + ' ' + response.data.segundoApellido;
            }
            //this.msvRegistroIpat.nacionalidadConductor = response.data.nacionalidad;
            if (response.data.fechaNacimiento != null){
              this.cdnFechaNacimientoConductor = true;
              this.msvRegistroIpat.fechaNacimientoConductor = response.data.fechaNacimiento;
            } else {
              this.cdnFechaNacimientoConductor = false;
              this.msvRegistroIpat.fechaNacimientoConductor = '';
            }
            if (response.data.genero != null){
              this.cdnSexoConductor = true;
              this.sexoConductorSelected = [response.data.genero.id];
            } else {
              this.cdnSexoConductor = false;
              this.sexoConductorSelected = [0];
            }
            if (response.data.direccion != null) {
              this.cdnDireccionConductor = true;
              this.msvRegistroIpat.direccionResidenciaConductor = response.data.direccion;
            } else {
              this.cdnDireccionConductor = false;
              this.msvRegistroIpat.direccionResidenciaConductor = '';
            }
            if (response.data.municipioResidencia != null) {
              this.cdnMunicipioConductor = true;
              this.ciudadResidenciaConductorSelected = [response.data.municipioResidencia.id];
            } else {
              this.cdnMunicipioConductor = false;
              this.ciudadResidenciaConductorSelected = [0];
            }
            if (response.data.telefono != null) {
              this.cdnTelefonoConductor = true;
              this.msvRegistroIpat.telefonoConductor = response.data.telefono;
            } else {
              this.cdnTelefonoConductor = false;
              this.msvRegistroIpat.telefonoConductor = '';
            }
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.usuario = false;
                this.tipoIdentificacionConductorSelected = [0];
                this.msvRegistroIpat.nombresConductor = '';
                this.msvRegistroIpat.apellidosConductor = '';
                this.nacionalidadConductorSelected = [0];
                this.msvRegistroIpat.fechaNacimientoConductor = '';
                this.sexoConductorSelected = [0];
                this.msvRegistroIpat.direccionResidenciaConductor = '';
                this.ciudadResidenciaConductorSelected = [0];
                this.msvRegistroIpat.telefonoConductor = '';
              }
            });
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert('Error en la petición');
            }
          }
        }
      );
    }
  }

  onBuscarVehiculo() {
    let token = this._LoginService.getToken();

    if (this.msvRegistroIpat.placa) {
      this._MsvRegistroIpatService.getBuscarVehiculo({ 'placa': this.msvRegistroIpat.placa }, token).subscribe(

        response => {
          if (response.status == 'success') {
            //this.vhl = true;
            if(response.data.nacionalidad.id != null) {
              this.vhlNacionalidad = true;
              this.nacionalidadVehiculoSelected = [response.data.nacionalidad.id];
            } else {
              this.vhlNacionalidad = false;
              this.nacionalidadVehiculoSelected = [0];
            }
            if(response.data.linea.marca.id != null) {
              this.vhlMarca = true;
              this.marcaSelected = [response.data.linea.marca.id];
              this.lineaSelected = [response.data.linea.id];
            } else {
              this.vhlMarca = false;
              this.marcaSelected = [0];
              this.lineaSelected = [0];
            }
            if(response.data.color != null) {
              this.vhlColor = true;  
              this.colorSelected = [response.data.color.id];
            } else {
              this.vhlColor = false;
              this.colorSelected = [0];
            }
            if(response.data.modelo != null) {
              this.vhlModelo = true;
              this.msvRegistroIpat.modelo = response.data.modelo;
            } else {
              this.vhlModelo = false;
              this.msvRegistroIpat.modelo = "";
            }
            if(response.data.carroceria != null) {
              this.vhlCarroceria = true;
              this.carroceriaSelected = [response.data.carroceria.id];
            } else {
              this.vhlCarroceria = false;
              this.carroceriaSelected = [0];
            }
            if(response.data.numeroPasajeros != null) {
              this.vhlPasajeros = true;  
              this.msvRegistroIpat.pasajeros = response.data.numeroPasajeros;
            } else {
              this.vhlPasajeros = false;
              this.msvRegistroIpat.pasajeros = "";
            }
            if (response.data.municipio != null){
              this.vhlMatriculadoEn = true;
              this.matriculadoEnSelected = [response.data.municipio.id];
            } else{
              this.vhlMatriculadoEn = false;
              this.matriculadoEnSelected = [0];
            }
            if (response.data.clase != null) {
              this.vhlClase = true;
              this.claseSelected = [response.data.clase.id];
            } else {
              this.vhlClase = false;
              this.claseSelected = [0];
            }
            if (response.data.servicio != null){
              this.vhlServicio = true;
              this.servicioSelected = [response.data.servicio.id];
            } else {
              this.vhlServicio = false;
              this.servicioSelected = [0];
            }
            if (response.data.modalidadTransporte != null) {
              this.vhlModalidad = true;
              this.modalidadTransporteSelected = [response.data.modalidadTransporte.id];
            } else {
              this.vhlModalidad = false;
              this.modalidadTransporteSelected = [0];
            }
            if (response.data.radioAccion != null) {
              this.vhlRadioAccion = true;
              this.radioAccionSelected = [response.data.radioAccion.id];
            } else {
              this.vhlRadioAccion = false;
              this.radioAccionSelected = [0];
            }
            //swal.close();
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.vhl = false;
                this.marcaSelected = [0];
                this.lineaSelected = [0];
                this.colorSelected = [0];
                this.msvRegistroIpat.modelo = '';
                this.carroceriaSelected = [0];
                this.msvRegistroIpat.pasajeros = '';
                this.matriculadoEnSelected = [0];
                this.claseSelected = [0];
                this.servicioSelected = [0];
                this.modalidadTransporteSelected = [0];
                this.radioAccionSelected = [0];
              }
            });
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert('Error en la petición');
            }
          }
        }
      );
    }
  }

  onBuscarLicenciaConductor() {
    let token = this._LoginService.getToken();
    if (this.msvRegistroIpat.numeroLicenciaConduccion) {
      this._MsvRegistroIpatService.getBuscarLicenciaConductor({ 'numero': this.msvRegistroIpat.numeroLicenciaConduccion }, token).subscribe(

        response => {
          if (response.status == 'success') {
            this.licencia = true;
            this.msvRegistroIpat.categoriaLicenciaConduccion = response.data.categoria.nombre;
            this.msvRegistroIpat.fechaExpedicionLicenciaConduccion = response.data.fechaExpedicion;
            this.msvRegistroIpat.fechaVencimientoLicenciaConduccion = response.data.fechaVencimiento;
            this.msvRegistroIpat.organismoTransito = response.data.sedeOperativa.nombre;
            //swal.close();
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
              alert('Error en la petición');
            }
          }
        }
      );
    }
  }

  onMismoConductor(msvRegistroIpat) {
    if (this.msvRegistroIpat.identificacionConductor != null && this.msvRegistroIpat.nombresConductor != '' && this.msvRegistroIpat.apellidosConductor != '') {
      this.msmConductor = true;
      this.tipoIdentificacionPropietarioSelected = [this.tipoIdentificacionConductorSelected];
      this.msvRegistroIpat.identificacionPropietario = this.msvRegistroIpat.identificacionConductor;
      this.msvRegistroIpat.nombresPropietario = this.msvRegistroIpat.nombresConductor;
      this.msvRegistroIpat.apellidosPropietario = this.msvRegistroIpat.apellidosConductor;
    } else {
      swal({
        title: 'Alerta!',
        text: 'Por favor, complete los datos del conductor.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onBuscarAgente() {
    let token = this._LoginService.getToken();
    if (this.msvRegistroIpat.identificacionAgente) {
      this._MsvRegistroIpatService.getBuscarAgente({ 'identificacionAgente': this.msvRegistroIpat.identificacionAgente }, token).subscribe(

        response => {
          if (response.status == 'success') {
            this.agente = true;
            if (response.data.ciudadano.tipoIdentificacion != null) {
            this.tipoIdentificacionAgenteSelected = [response.data.ciudadano.tipoIdentificacion.id];
            } else {
              this.tipoIdentificacionAgenteSelected = [0];
            }
            if (response.data.cargo.nombre != null){
              this.msvRegistroIpat.gradoAgente = response.data.cargo.nombre;
            } else {
              this.msvRegistroIpat.gradoAgente = '';
            }
            this.msvRegistroIpat.nombresAgente = response.data.ciudadano.primerNombre + ' ' + response.data.ciudadano.segundoNombre;
            this.msvRegistroIpat.apellidosAgente = response.data.ciudadano.primerApellido + ' ' + response.data.ciudadano.segundoApellido;
            if (response.data.numeroPlaca != null) {
              this.msvRegistroIpat.placaAgente = response.data.numeroPlaca;
            } else {
              this.msvRegistroIpat.placaAgente = '';
            }
            if (response.data.organismoTransito.nombre != null) {
             this.msvRegistroIpat.entidadAgente = response.data.organismoTransito.nombre;
            } else {
              this.msvRegistroIpat.entidadAgente = '';
            }
            //swal.close();
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.agente = false;
                this.tipoIdentificacionAgenteSelected = [0];
                this.msvRegistroIpat.gradoAgente = '';
                this.msvRegistroIpat.nombresAgente = '';
                this.msvRegistroIpat.apellidosAgente = '';
                this.msvRegistroIpat.placaAgente = '';
                this.msvRegistroIpat.entidadAgente = '';
              }
            });
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert('Error en la petición');
            }
          }
        }
      );
    }
  }

  onBuscarVictima() {
    let token = this._LoginService.getToken();
    if (this.msvRegistroIpat.identificacionVictima) {
      this._MsvRegistroIpatService.getBuscarVictima({ 'identificacionVictima': this.msvRegistroIpat.identificacionVictima }, token).subscribe(

        response => {
          if (response.status == 'success') {
            this.victima = true;
            this.tipoIdentificacionVictimaSelected = [response.data.tipoIdentificacion.id];
            this.msvRegistroIpat.nombresVictima = response.data.primerNombre + ' ' + response.data.segundoNombre;
            this.msvRegistroIpat.apellidosVictima = response.data.primerApellido + ' ' + response.data.segundoApellido;
            //this.msvRegistroIpat.nacionalidadVictima = response.data.nacionalidad;
            this.msvRegistroIpat.fechaNacimientoVictima = response.data.fechaNacimiento;
            this.sexoVictimaSelected = [response.data.ciudadano.genero.id];
            this.msvRegistroIpat.direccionResidenciaVictima = response.data.ciudadano.direccion;
            this.ciudadResidenciaVictimaSelected = [response.data.ciudadano.municipioResidencia.id];
            this.msvRegistroIpat.telefonoVictima = response.data.telefono;
            //swal.close();
            if (this.vehiculoIpat) {
              let i = 0;
              this.vehiculos.forEach(element => {
                i += 1;
                let obj = {
                  value: element.placa,
                  label: i + '_' + element.placa,
                };
                this.vehiculosIpat.push(obj);
              });
            } else {
              let obj = {
                value: this.msvRegistroIpat.placa,
                label: this.msvRegistroIpat.placa,

              };
              this.vehiculosIpat.push(obj);
            }
            console.log(this.vehiculosIpat);
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.victima = false;
                this.tipoIdentificacionVictimaSelected = [0];
                this.msvRegistroIpat.nombresVictima = '';
                this.msvRegistroIpat.apellidosVictima = '';
                //this.msvRegistroIpat.nacionalidadVictima = [0];
                this.msvRegistroIpat.fechaNacimientoVictima = '';
                this.sexoVictimaSelected = [0];
                this.msvRegistroIpat.direccionResidenciaVictima = '';
                this.ciudadResidenciaVictimaSelected = [0];
                this.msvRegistroIpat.telefonoVictima = '';
              }
            });
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert('Error en la petición');
            }
          }
        }
      );
    }
  }

  onBuscarTestigo() {
    let token = this._LoginService.getToken();
    if (this.msvRegistroIpat.identificacionTestigo) {
      this._MsvRegistroIpatService.getBuscarTestigo({ 'identificacionTestigo': this.msvRegistroIpat.identificacionTestigo }, token).subscribe(

        response => {
          if (response.status == 'success') {
            console.log(response.data);
            this.testigo = true;
            this.tipoIdentificacionTestigoSelected = [response.data.tipoIdentificacion.id];
            this.msvRegistroIpat.nombresTestigo = response.data.primerNombre + ' ' + response.data.segundoNombre;
            this.msvRegistroIpat.apellidosTestigo = response.data.primerApellido + ' ' + response.data.segundoApellido;
            this.msvRegistroIpat.direccionTestigo = response.data.direccionPersonal;
            this.ciudadResidenciaTestigoSelected = [response.data.municipioResidencia.id];
            this.msvRegistroIpat.telefonoTestigo = response.data.telefono;
            //swal.close();
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.testigo = false;
                this.tipoIdentificacionTestigoSelected = [0];
                this.msvRegistroIpat.nombresTestigo = '';
                this.msvRegistroIpat.apellidosTestigo = '';
                this.msvRegistroIpat.direccionTestigo = '';
                this.ciudadResidenciaTestigoSelected = [0];
                this.msvRegistroIpat.telefonoTestigo = '';
              }
            });
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert('Error en la petición');
            }
          }
        }
      );
    }
  }
  obtenerCorrespondio(e) {
    let token = this._LoginService.getToken();

    this._MsvRegistroIpatService.getCorrespondio(this.msvRegistroIpat, token).subscribe(
      response => {
        if (response.status == 'success') {
          /* if(this.msvRegistroIpat.correspondio != null) {
            this.numeroCorrespondio = true;
          } */
          this.msvRegistroIpat.correspondio = response.data;
        } else {
          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert('Error en la petición');
            }
          }
        }
      }
    );
  }

  registrarCiudadano() {
    let token = this._LoginService.getToken();
    if(this.msvRegistroIpat.identificacionConductor == null && this.msvRegistroIpat.nombresConductor == null && this.msvRegistroIpat.apellidosConductor) {
      swal({
        title: 'Alerta!',
        text: "Registre los campos del conductor",
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.msvRegistroIpat.tipoIdentificacionConductor = this.tipoIdentificacionConductorSelected;
      this.msvRegistroIpat.nacionalidadConductor = this.nacionalidadConductorSelected;
      this.msvRegistroIpat.sexoConductor = this.sexoConductorSelected;
      this.msvRegistroIpat.ciudadResidenciaConductor = this.ciudadResidenciaConductorSelected;

      var html = 'Se va a registrar el usuario:<br>' +
        'Nombres: <b>' + this.msvRegistroIpat.nombresConductor + ' ' + this.msvRegistroIpat.apellidosConductor +'</b><br>' +
        'Tipo Identificación: <b>' + this.tipoIdentificacionConductorSelected + '</b><br>' +
        'Identificación: <b>' + this.msvRegistroIpat.identificacionConductor + '</b><br>' +
        'Género: <b>' + this.sexoConductorSelected + '</b><br>' +
        'Teléfono: <b>' + this.msvRegistroIpat.telefonoConductor + '</b><br>';

      swal({
        title: 'Creación de persona natural',
        type: 'warning',
        html: html,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Agregar más conductores',
        cancelButtonText: 'Agregar un sólo conductor',
      }).then((result) => {
        if (result.value) {
          this._MsvRegistroIpatService.registerCiudadanoIpat(this.msvRegistroIpat, token).subscribe(
            response => {
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
                //datos de cada conductor
                let dataConductores = {
                  'identificacion': this.msvRegistroIpat.identificacionConductor,
                  'tipo identificacion': this.msvRegistroIpat.tipoIdentificacionConductor,
                  'nombres': this.msvRegistroIpat.nombresConductor,
                  'apellidos': this.msvRegistroIpat.apellidosConductor,
                  'nacionalidad': this.nacionalidadConductorSelected,
                  'fecha nacimiento': this.msvRegistroIpat.fechaNacimientoConductor,
                  'sexo': this.sexoConductorSelected,
                  'gravedad': this.gravedadConductorSelected,
                  'direccion': this.msvRegistroIpat.direccionResidenciaConductor,
                  'ciudad residencia': this.ciudadResidenciaConductorSelected,
                  'telefono': this.msvRegistroIpat.telefonoConductor,
                };
                this.conductores.push(dataConductores);

                this.usuario = false;
                this.msvRegistroIpat.identificacionConductor = '';
                this.tipoIdentificacionConductorSelected = [0];
                this.nacionalidadConductorSelected = [0];
                this.sexoConductorSelected = [0];
                this.gravedadConductorSelected = [0];
                this.ciudadResidenciaConductorSelected = [0];
                this.msvRegistroIpat.nombresConductor = '';
                this.msvRegistroIpat.apellidosConductor = '';
                this.msvRegistroIpat.fechaNacimientoConductor = '';
                this.msvRegistroIpat.direccionResidenciaConductor = '';
                this.msvRegistroIpat.telefonoConductor = '';

                this.contConductores +=   1;
                this.msvRegistroIpat.totalConductores = this.contConductores;
                if (this.gravedadConductorSelected = 'HERIDO') {
                  this.contHeridos += 1;
                  this.msvRegistroIpat.totalHeridos = this.contHeridos;
                  console.log(this.contHeridos);
                } if (this.gravedadConductorSelected = 'MUERTO') {
                  this.contMuertos += 1;
                  this.msvRegistroIpat.totalMuertos = this.contMuertos;
                  console.log(this.contMuertos);
                }
              } else {
                swal({
                  title: 'Alerta!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            });
        }
        else if (result.dismiss === swal.DismissReason.cancel) {
          this._MsvRegistroIpatService.registerCiudadanoIpat(this.msvRegistroIpat, token).subscribe(
            response => {
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
                let dataConductores = {
                  'identificacion': this.msvRegistroIpat.identificacionConductor,
                  'tipo identificacion': this.msvRegistroIpat.tipoIdentificacionConductor,
                  'nombres': this.msvRegistroIpat.nombresConductor,
                  'apellidos': this.msvRegistroIpat.apellidosConductor,
                  'nacionalidad': this.nacionalidadConductorSelected,
                  'fecha nacimiento': this.msvRegistroIpat.fechaNacimientoConductor,
                  'sexo': this.sexoConductorSelected,
                  'gravedad': this.gravedadConductorSelected,
                  'direccion': this.msvRegistroIpat.direccionResidenciaConductor,
                  'ciudad residencia': this.ciudadResidenciaConductorSelected,
                  'teléfono': this.msvRegistroIpat.telefonoConductor,
                };
                this.conductores.push(dataConductores);
                
                this.contConductores += 1;
                this.msvRegistroIpat.totalConductores = this.contConductores;

                if (this.gravedadConductorSelected = 'HERIDO') {
                  this.contHeridos += 1;
                  this.msvRegistroIpat.totalHeridos = this.contHeridos;
                  console.log(this.contHeridos);
                } if (this.gravedadConductorSelected = 'MUERTO') {
                  this.contMuertos += 1;
                  this.msvRegistroIpat.totalMuertos = this.contMuertos;
                  console.log(this.contMuertos);
                }

              } else {
                swal({
                  title: 'Alerta!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            });
          }
        });
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      }
  }

  registrarVehiculo() {
    let token = this._LoginService.getToken();

    if (this.msvRegistroIpat.placa == null) {
      swal({
        title: 'Alerta!',
        text: "Registre todos los campos del vehículo",
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.msvRegistroIpat.nacionalidadVehiculo = this.nacionalidadVehiculoSelected;
      this.msvRegistroIpat.marca = this.marcaSelected;
      this.msvRegistroIpat.linea = this.lineaSelected;
      this.msvRegistroIpat.color = this.colorSelected;
      this.msvRegistroIpat.carroceria = this.carroceriaSelected;
      this.msvRegistroIpat.clase = this.claseSelected;
      this.msvRegistroIpat.servicio = this.servicioSelected;
      this.msvRegistroIpat.modalidadTransporte = this.modalidadTransporteSelected;
      this.msvRegistroIpat.radioAccion = this.radioAccionSelected;

      var html = 'Se va a registrar el vehículo:<br>' +
        'Placa: <b>' + this.msvRegistroIpat.placa + '</b><br>' +
        'Marca: <b>' + this.marcaSelected + '</b><br>' +
        'Color: <b>' + this.colorSelected + '</b><br>' +
        'Modelo: <b>' + this.msvRegistroIpat.modelo + '</b><br>' +
        'Tipo vehículo: <b>' + this.claseSelected + '</b><br>';
        'Servicio: <b>' + this.servicioSelected + '</b><br>';
        'Modalidad transporte: <b>' + this.modalidadTransporteSelected + '</b><br>';

      swal({
        title: 'Creación de vehículo',
        type: 'warning',
        html: html,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Agregar más vehículos involucrados',
        cancelButtonText: 'Agregar un solo vehículo',
      }).then((result) => {
        if (result.value) {  
          this._MsvRegistroIpatService.registerVehiculoIpat(this.msvRegistroIpat, token).subscribe(
            response => {
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });

                let dataVehiculos = {
                  'placa': this.msvRegistroIpat.placa,
                  'nacionalidad': this.nacionalidadVehiculoSelected,
                  'marca': this.marcaSelected,
                  'linea': this.lineaSelected,
                  'color': this.colorSelected,
                  'modelo': this.msvRegistroIpat.modelo,
                  'carroceria': this.carroceriaSelected,
                  'clase vehiculo': this.claseSelected,
                  'servicio': this.servicioSelected,
                  'modalidad transporte': this.modalidadTransporteSelected,
                  'capacidad carga(ton)': this.msvRegistroIpat.ton,
                  'pasajeros': this.msvRegistroIpat.pasajeros,
                  'matriculado en': this.matriculadoEnSelected,
                };
                this.vehiculos.push(dataVehiculos);

                this.vehiculoIpat = true;
                this.vhl = false;
                this.msvRegistroIpat.placa = '';
                this.marcaSelected = [0];
                this.lineaSelected = [0];
                this.colorSelected = [0];
                this.msvRegistroIpat.modelo = '';
                this.carroceriaSelected = [0];
                this.claseSelected = [0];
                this.servicioSelected = [0];
                this.radioAccionSelected = [0];
                this.modalidadTransporteSelected = [0];
                this.msvRegistroIpat.pasajeros = '';
                this.msvRegistroIpat.matriculadoEn = '';
              } else {
                swal({
                  title: 'Alerta!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            });
        } else if (result.dismiss === swal.DismissReason.cancel) {
          this._MsvRegistroIpatService.registerVehiculoIpat(this.msvRegistroIpat, token).subscribe(
            response => {
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
                let dataVehiculos = {
                  'placa': this.msvRegistroIpat.placa,
                  'nacionalidad': this.nacionalidadVehiculoSelected,
                  'marca': this.marcaSelected,
                  'linea': this.lineaSelected,
                  'color': this.colorSelected,
                  'modelo': this.msvRegistroIpat.modelo,
                  'carroceria': this.carroceriaSelected,
                  'clase vehiculo': this.claseSelected,
                  'servicio': this.servicioSelected,
                  'modalidad transporte': this.modalidadTransporteSelected,
                  'capacidad carga(ton)': this.msvRegistroIpat.ton,
                  'pasajeros': this.msvRegistroIpat.pasajeros,
                  'matriculado en': this.matriculadoEnSelected,
                };
                this.vehiculos.push(dataVehiculos);
              } else {
                swal({
                  title: 'Alerta!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            });
        }
      });
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    }
  }

  registrarVictima() {
    let token = this._LoginService.getToken();

    if(this.msvRegistroIpat.identificacionVictima == null) {
      swal({
        title: 'Alerta!',
        text: "Registre todos los campos de la victima",
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.msvRegistroIpat.tipoIdentificacionVictima = this.tipoIdentificacionVictimaSelected;
      this.msvRegistroIpat.nacionalidadVictima = this.nacionalidadVictimaSelected;
      this.msvRegistroIpat.sexoVictima = this.sexoVictimaSelected;
      this.msvRegistroIpat.ciudadResidenciaVictima = this.ciudadResidenciaVictimaSelected;

      var html = 'Se va a registrar el usuario:<br>' +
        'Nombres: <b>' + this.msvRegistroIpat.nombresVictima + ' ' + this.msvRegistroIpat.apellidosVictima + '</b><br>' +
        'Tipo Identificación: <b>' + this.tipoIdentificacionVictimaSelected + '</b><br>' +
        'Identificación: <b>' + this.msvRegistroIpat.identificacionVictima + '</b><br>' +
        'Género: <b>' + this.sexoVictimaSelected + '</b><br>' +
        'Teléfono: <b>' + this.msvRegistroIpat.telefonoVictima + '</b><br>';

      swal({
        title: 'Creación de persona natural',
        type: 'warning',
        html: html,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Agregar más victimas',
        cancelButtonText: 'Agregar una sola victima',
      }).then((result) => {
        if (result.value) {
          this._MsvRegistroIpatService.registerVictimaIpat(this.msvRegistroIpat, token).subscribe(
            response => {
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });

                let dataVictimas = {
                  'tipo victima': this.tipoVictimaSelected,
                  'gravedad victima': this.gravedadVictimaSelected,
                  'tipo documento': this.tipoIdentificacionVictimaSelected,
                  'identificacion': this.msvRegistroIpat.identificacionVictima,
                  'nombres': this.msvRegistroIpat.nombresVictima,
                  'apellidos': this.msvRegistroIpat.apellidosVictima,
                  'nacionalidad': this.nacionalidadVictimaSelected,
                  'fecha nacimiento': this.msvRegistroIpat.fechaNacimientoVictima,
                  'sexo': this.sexoVictimaSelected,
                  'dirección residencia': this.msvRegistroIpat.direccionResidenciaVictima,
                  'ciudad residencia': this.ciudadResidenciaVictimaSelected,
                  'telefono': this.msvRegistroIpat.telefonoVictima,
                  'placa de vehiculo al que pertenece': this.msvRegistroIpat.placaVehiculoVictima,
                };
                this.victimas.push(dataVictimas);
                console.log(this.tipoVictimaSelected);
                if (this.tipoVictimaSelected = 'PASAJERO') {
                  this.contPasajeros += 1;
                  this.msvRegistroIpat.totalPasajeros = this.contPasajeros;
                  console.log(this.contPasajeros);
                } if (this.tipoVictimaSelected = 'PEATON'){
                  this.contPeatones += 1;
                  this.msvRegistroIpat.totalPeatones = this.contPeatones;
                  console.log(this.contPeatones); 
                } if (this.tipoVictimaSelected = 'ACOMPAÑANTE'){
                  this.contAcompaniantes += 1;
                  this.msvRegistroIpat.totalAcompaniantes = this.contAcompaniantes;
                  console.log(this.contAcompaniantes);
                } 
                if (this.gravedadVictimaSelected = 'HERIDO'){
                  this.contHeridos +=1;
                  this.msvRegistroIpat.totalHeridos = this.contHeridos;
                  console.log(this.contHeridos);
                } if (this.gravedadVictimaSelected = 'MUERTO'){
                  this.contMuertos+=1;
                  this.msvRegistroIpat.totalMuertos = this.contMuertos;
                  console.log(this.contMuertos);
                }

                this.victima = false;
                this.tipoVictimaSelected = [0];
                this.gravedadVictimaSelected = [0];
                this.msvRegistroIpat.identificacionVictima = '';
                this.msvRegistroIpat.tipoIdentificacionVictima = 0;
                this.msvRegistroIpat.nombresVictima = '';
                this.msvRegistroIpat.apellidosVictima = '';
                this.nacionalidadVictimaSelected = [0];
                this.msvRegistroIpat.fechaNacimientoVictima = '';
                this.sexoVictimaSelected = [0];
                this.msvRegistroIpat.direccionResidenciaVictima = '';
                this.ciudadResidenciaVictimaSelected = [0];
                this.msvRegistroIpat.telefonoVictima = '';
              } else {
                swal({
                  title: 'Alerta!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            });
          }
        else if (result.dismiss === swal.DismissReason.cancel) {
          if (result.value) {
            this._MsvRegistroIpatService.registerCiudadanoIpat(this.msvRegistroIpat, token).subscribe(
              response => {
                if (response.status == 'success') {
                  swal({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                  });

                  let dataVictimas = {
                    'tipo victima': this.tipoVictimaSelected,
                    'gravedad victima': this.gravedadVictimaSelected,
                    'tipo documento': this.tipoIdentificacionVictimaSelected,
                    'identificacion': this.msvRegistroIpat.identificacionVictima,
                    'nombres': this.msvRegistroIpat.nombresVictima,
                    'apellidos': this.msvRegistroIpat.apellidosVictima,
                    'nacionalidad': this.nacionalidadVictimaSelected,
                    'fecha nacimiento': this.msvRegistroIpat.fechaNacimientoVictima,
                    'sexo': this.sexoVictimaSelected,
                    'dirección residencia': this.msvRegistroIpat.direccionResidenciaVictima,
                    'ciudad residencia': this.ciudadResidenciaVictimaSelected,
                    'telefono': this.msvRegistroIpat.telefonoVictima,
                    'placa de vehiculo al que pertenece': this.msvRegistroIpat.placaVehiculoVictima,
                  };
                  this.victimas.push(dataVictimas);
                  
                  if (this.tipoVictimaSelected = 'PASAJERO') {
                    this.contPasajeros += 1;
                    this.msvRegistroIpat.totalPasajeros = this.contPasajeros;
                  } if (this.tipoVictimaSelected = 'PEATON') {
                    this.contPeatones += 1;
                    this.msvRegistroIpat.totalPeatones = this.contPeatones;
                  } if (this.tipoVictimaSelected = 'ACOMPAÑANTE') {
                    this.contAcompaniantes += 1;
                    this.msvRegistroIpat.totalAcompaniantes = this.contAcompaniantes;
                    console.log(this.contAcompaniantes);
                  } if (this.gravedadVictimaSelected = 'HERIDO') {
                    this.contHeridos += 1;
                    this.msvRegistroIpat.totalHeridos = this.contHeridos;
                    console.log(this.contHeridos);
                  } if (this.gravedadVictimaSelected = 'MUERTO') {
                    this.contMuertos += 1;
                    this.msvRegistroIpat.totalMuertos = this.contMuertos;
                    console.log(this.contMuertos);
                  }
                } else {
                  swal({
                    title: 'Alerta!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                  });
                }
              });
            }
          }
        });

      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    }
  }

  imprimirFormatos() {
    alert("formatos policia judicial");
  }

  changedMunicipio(e) {
    if (e) {
      let token = this._LoginService.getToken();
      this._MunicipioService.show(token, this.msvRegistroIpat.idMunicipio).subscribe(
        response => {
          this.msvRegistroIpat.idMunicipio = response;
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
}
