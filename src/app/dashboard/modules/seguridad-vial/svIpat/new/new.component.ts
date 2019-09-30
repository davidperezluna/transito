import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, NgZone} from '@angular/core';
import { MouseEvent, MapsAPILoader } from '@agm/core';

import { SvIpat } from '../svIpat.modelo';
import { SvIpatConductor } from '../svIpatConductor.modelo';
import { SvIpatVehiculo } from '../svIpatVehiculo.modelo';
import { SvIpatVictima } from '../svIpatVictima.modelo';

import { SvIpatService } from '../../../../../services/svIpat.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { SvIpatConsecutivoService } from '../../../../../services/svIpatConsecutivo.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { SvCfgGravedadAccidenteService } from '../../../../../services/svCfgGravedadAccidente.service';
import { SvIpatConductorService } from '../../../../../services/svIpatConductor.services'
import { SvIpatVehiculoService } from '../../../../../services/svIpatVehiculo.services'
import { SvIpatVictimaService } from '../../../../../services/svIpatVictima.services'
import { SvCfgClaseAccidenteService } from '../../../../../services/svCfgClaseAccidente.service';
import { SvCfgClaseChoqueService } from '../../../../../services/svCfgClaseChoque.service';
import { SvCfgObjetoFijoService } from '../../../../../services/svCfgObjetoFijo.service';
import { SvCfgAreaService } from "../../../../../services/svCfgArea.service";
import { SvCfgTipoAreaService } from "../../../../../services/svCfgTipoArea.service";
import { SvCfgTipoViaService } from "../../../../../services/svCfgTipoVia.service";
import { SvCfgCardinalidadService } from "../../../../../services/svCfgCardinalidad.service";
import { SvCfgSectorService } from "../../../../../services/svCfgSector.service";
import { SvCfgZonaService } from "../../../../../services/svCfgZona.service";
import { SvCfgDisenioService } from "../../../../../services/svCfgDisenio.service";
import { SvCfgEstadoTiempoService } from "../../../../../services/svCfgEstadoTiempo.service";
import { SvCfgGeometriaService } from "../../../../../services/svCfgGeometria.service";
import { SvCfgUtilizacionService } from "../../../../../services/svCfgUtilizacion.service";
import { SvCfgCalzadaCarrilService } from "../../../../../services/svCfgCalzadaCarril.service";
import { SvCfgMaterialService } from "../../../../../services/svCfgMaterial.service";
import { SvCfgEstadoViaService } from "../../../../../services/svCfgEstadoVia.service";
import { SvCfgCondicionViaService } from "../../../../../services/svCfgCondicionVia.service";
import { SvCfgIluminacionService } from "../../../../../services/svCfgIluminacion.service";
import { SvCfgEstadoIluminacionService } from "../../../../../services/svCfgEstadoIluminacion.service";
import { SvCfgVisualService } from "../../../../../services/svCfgVisual.service";
import { SvCfgVisualDisminuidaService } from "../../../../../services/svCfgVisualDisminuida.service";
import { SvCfgResultadoExamenService } from "../../../../../services/svCfgResultadoExamen.service";
import { SvCfgGradoExamenService } from "../../../../../services/svCfgGradoExamen.service";
import { SvCfgHospitalService } from "../../../../../services/svCfgHospital.service";
import { UserEmpresaService } from "../../../../../services/userEmpresa.service";
import { SvCfgFallaService } from "../../../../../services/svCfgFalla.service";
import { SvCfgLugarImpactoService } from "../../../../../services/svCfgLugarImpacto.service";
import { VhloCfgClaseService } from "../../../../../services/vhloCfgClase.service";
import { VhloCfgServicioService } from "../../../../../services/vhloCfgServicio.service";
import { UserLcCfgCategoriaService } from "../../../../../services/userLcCfgCategoria.service";
import { SvCfgHipotesisService } from "../../../../../services/svCfgHipotesis.service";
import { SvCfgTipoVictimaService } from "../../../../../services/svCfgTipoVictima.service";
import { SvCfgGravedadVictimaService } from "../../../../../services/svCfgGravedadVictima.service";
import { SvCfgUnidadReceptoraService } from "../../../../../services/svCfgUnidadReceptora.service";
import { UserCfgTipoIdentificacionService } from "../../../../../services/userCfgTipoIdentificacion.service";
import { SvCfgNacionalidadService } from "../../../../../services/svCfgNacionalidad.service";
import { UserCfgGeneroService } from "../../../../../services/userCfgGenero.service";
import { forEach } from '@angular/router/src/utils/collection';
import { SvCfgAseguradoraService } from '../../../../../services/svCfgAseguradora.service';
import { SvCfgControlViaService } from '../../../../../services/svCfgControlVia.service';
import { SvCfgEntidadAccidenteService } from '../../../../../services/svCfgEntidadAccidente.service';
import { VhloCfgMarcaService } from '../../../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../../../services/vhloCfgLinea.service';
import { VhloCfgColorService } from '../../../../../services/vhloCfgColor.service';
import { VhloCfgModalidadTransporteService } from '../../../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgCarroceriaService } from '../../../../../services/vhloCfgCarroceria.service';
import { VhloCfgRadioAccionService } from '../../../../../services/vhloCfgRadioAccion.service';
import { PqoCfgPatioService } from "../../../../../services/pqoCfgPatio.service";

import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-new-svipat',
  templateUrl: './new.component.html',
  providers: [DatePipe],
  styles: [`
        agm-map {
        height: 500px;
        }
    `],
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Output() mapReady: EventEmitter<any> = new EventEmitter<any>();
  @Input() consecutivo: any = null;
  public ipat: SvIpat;
  public ipatConductor: SvIpatConductor;
  public ipatVehiculo: SvIpatVehiculo;
  public ipatVictima: SvIpatVictima;
  public organismoTransito: any;
  public errorMessage;

  public nroIpat: any;
  public date: any; 

  public numeroConsecutivo: any;

  public ipatEncontrado: any = null;

  public ipats = false;
  public placasVehiculosIpat: any;

  public gravedades: any;
  public clasesAccidente: any;
  public choquesCon: any;
  public objetosFijos: any;
  public organismosTransito: any;
  public aseguradoras: any;
  public areas: any;
  public tiposArea: any;
  public tiposVia: any;
  public cardinalidades: any;
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

  public lugaresImpacto: any;
  public resultadosExamen: any;
  public gradosExamen: any;
  public categoriasLc: any;
  public hospitales: any;
  public empresas: any;

  public inmovilizaciones: any;
  public parqueaderos: any;
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

  public conductores = [];
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
  public categoriaLcSelected: any;
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

  public address: any = null;
  public zoom: number = 15;
  public lat: number = 1.2246233;
  public lng: number = -77.2808208;
  public map: any;
  public markers: marker[] = [];
  public arrayDemarcaciones: any = [];
  public geocoder: any;
  public LatLng: any;

  public demarcacionNew = {
    'cantidad': null,
    'area': null,
    'ancho': null,
    'largo': null,
    'total': null,
    'tramoVial': null,
    'idLinea': null,
    'idUnidadMedida': null
  }

  constructor(
    private _SvIpatService: SvIpatService,

    private _FuncionarioService: PnalFuncionarioService,
    private _SvIpatConsecutivoService: SvIpatConsecutivoService,
    private _LoginService: LoginService,
    private _MunicipioService: CfgMunicipioService,
    private _GravedadService: SvCfgGravedadAccidenteService,
    private _ClaseAccidenteService: SvCfgClaseAccidenteService,
    private _ClaseChoqueService: SvCfgClaseChoqueService,
    private _ObjetoFijoService: SvCfgObjetoFijoService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _AseguradoraService: SvCfgAseguradoraService,
    private _AreaService: SvCfgAreaService,
    private _TipoAreaService: SvCfgTipoAreaService,
    private _TipoViaService: SvCfgTipoViaService,
    private _CardinalidadService: SvCfgCardinalidadService,
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
    private _CategoriaLicenciaConduccionService: UserLcCfgCategoriaService,
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
    private _PatioService: PqoCfgPatioService,

    private _SvIpatConductorService: SvIpatConductorService,
    private _SvIpatVehiculoService: SvIpatVehiculoService,
    private _SvIpatVictimaService: SvIpatVictimaService,

    private __zone: NgZone
  ) { }

  ngOnInit() {
    swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardará unos segundos, por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading();
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });

    this.ipat = new SvIpat(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.ipatConductor = new SvIpatConductor(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.ipatVehiculo = new SvIpatVehiculo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.ipatVictima = new SvIpatVictima(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    /* === inicio consecutivo === */
    if (this.consecutivo) {
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
      this._ClaseChoqueService.select().subscribe(
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
      this._ObjetoFijoService.select().subscribe(
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
      this._TipoAreaService.getTipoAreaSelect().subscribe(
        response => {
          this.tiposArea = response;
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
      this._TipoViaService.getTipoViaSelect().subscribe(
        response => {
          this.tiposVia = response;
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
      this._CardinalidadService.getCardinalidadSelect().subscribe(
        response => {
          this.cardinalidades = response;
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
      this._CategoriaLicenciaConduccionService.select().subscribe(
        response => {
          this.categoriasLc = response;
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

      this._PatioService.select().subscribe(
        response => {
          this.parqueaderos = response;
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
    }
    /* ====fin consecutivo=== */
  }

  onSearchConsecutivo() {

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
          this._SvIpatConsecutivoService.searchConsecutivo({ 'organismoTransito': this.organismoTransito, 'numeroConsecutivo': this.numeroConsecutivo }, token).subscribe(
            response => {
              if (response.code == 200) {
                this.consecutivo = response.data;
                this.ngOnInit();
                swal.close();
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
        }
        else {
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

  onEnviar() {
    let token = this._LoginService.getToken();

    this.ipat.markers = this.markers;
    this.ipat.tipoIdentificacionPropietario = this.tipoIdentificacionPropietarioSelected;
    this.ipat.tipoIdentificacionAgente = this.tipoIdentificacionAgenteSelected;
    this.ipat.tipoIdentificacionTestigo = this.tipoIdentificacionTestigoSelected;
    this.ipat.ciudadResidenciaTestigo = this.ciudadResidenciaTestigoSelected;
    this.ipat.numeroConsecutivo = this.consecutivo;
    this.ipatConductor.categoriaLicenciaConduccion = this.categoriaLcSelected;

    this._SvIpatService.register(this.ipat, token).subscribe(
      response => {
        if (response.code == 200) {
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

  onBuscarConductor() {
    let token = this._LoginService.getToken();
    if (this.ipatConductor.identificacion) {
      this._SvIpatService.getBuscarConductor({ 'identificacion': this.ipatConductor.identificacion }, token).subscribe(

        response => {
          console.log(response.data);
          if (response.code == 200) {
            if (response.data.tipoIdentificacion) {
              this.tipoIdentificacionConductorSelected = [response.data.tipoIdentificacion.id];
            }
            if (response.data.fechaNacimiento) {
              var datePiper = new DatePipe('en-US');
              
              var date = new Date();
              date.setTime(response.data.fechaNacimiento.timestamp * 1000);
              
              response.data.fechaNacimiento = datePiper.transform(
                date, 'yyyy-MM-dd'
              );
              
              this.ipatConductor.fechaNacimiento = response.data.fechaNacimiento;

            }
            if (response.data.genero) {
              this.sexoConductorSelected = [response.data.genero.id];
            }
            if (response.data.direccionPersonal) {
              this.ipatConductor.direccionResidencia = response.data.direccionPersonal;
            }
            if (response.data.municipioResidencia) {
              this.ciudadResidenciaConductorSelected = [response.data.municipioResidencia.id];
            }
            if (response.data.telefonoCelular) {
              this.ipatConductor.telefono = response.data.telefonoCelular;
            }
            if (response.data.segundoNombre == null) {
              this.ipatConductor.nombres = response.data.primerNombre;
            } else {
              this.ipatConductor.nombres = response.data.primerNombre + ' ' + response.data.segundoNombre;
            }
            if (response.data.segundoApellido == null) {
              this.ipatConductor.apellidos = response.data.primerApellido;
            } else {
              this.ipatConductor.apellidos = response.data.primerApellido + ' ' + response.data.segundoApellido;
            }
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.tipoIdentificacionConductorSelected = [0];
                this.ipatConductor.nombres = '';
                this.ipatConductor.apellidos = '';
                this.nacionalidadConductorSelected = [0];
                this.ipatConductor.fechaNacimiento = '';
                this.sexoConductorSelected = [0];
                this.ipatConductor.direccionResidencia = '';
                this.ciudadResidenciaConductorSelected = [0];
                this.ipatConductor.telefono = '';

                if (this.vehiculoIpat) {
                  swal({
                    title: 'Cargando Lista de vehículos asociados con el accidente!',
                    text: 'Solo tardará unos segundos, por favor espere.',
                    timer: 1500,
                    onOpen: () => {
                      swal.showLoading();
                    }
                  }).then((result) => {
                    if (
                      // Read more about handling dismissals
                      result.dismiss === swal.DismissReason.timer
                    ) { }
                  });
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
                    value: this.ipatVehiculo.placa,
                    label: this.ipatVehiculo.placa,
                  };
                  this.vehiculosIpat.push(obj);
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
      );
    }
  }

  onBuscarVehiculo() {
    let token = this._LoginService.getToken();

    if (this.ipatVehiculo.placa) {
      this._SvIpatService.getBuscarVehiculo({ 'placa': this.ipatVehiculo.placa }, token).subscribe(

        response => {
          if (response.code == 200) {
            if (response.data.nacionalidad) {
              this.nacionalidadVehiculoSelected = [response.data.nacionalidad.id];
            }
            if (response.data.linea.marca) {
              this.marcaSelected = [response.data.linea.marca.id];
              this.lineaSelected = [response.data.linea.id];
            }
            if (response.data.color) {
              this.colorSelected = [response.data.color.id];
            }
            if (response.data.modelo) {
              this.ipatVehiculo.modelo = response.data.modelo;
            }
            if (response.data.carroceria) {
              this.carroceriaSelected = [response.data.carroceria.id];
            }
            if (response.data.numeroPasajeros) {
              this.ipatVehiculo.pasajeros = response.data.numeroPasajeros;
            }
            if (response.data.municipio) {
              this.matriculadoEnSelected = [response.data.municipio.id];
            }
            if (response.data.clase) {
              this.claseSelected = [response.data.clase.id];
            }
            if (response.data.servicio) {
              this.servicioSelected = [response.data.servicio.id];
            }
            if (response.data.modalidadTransporte) {
              this.modalidadTransporteSelected = [response.data.modalidadTransporte.id];
            }
            if (response.data.radioAccion) {
              this.radioAccionSelected = [response.data.radioAccion.id];
            }
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.nacionalidadVehiculoSelected = [0];
                this.marcaSelected = [0];
                this.lineaSelected = [0];
                this.colorSelected = [0];
                this.ipatVehiculo.modelo = 0;
                this.carroceriaSelected = [0];
                this.ipatVehiculo.pasajeros = 0;
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
    if (this.ipatConductor.numeroLicenciaConduccion) {
      this._SvIpatService.getBuscarLicenciaConductor({ 'numero': this.ipatConductor.numeroLicenciaConduccion, 'identificacion': this.ipatConductor.identificacion }, token).subscribe(

        response => {
          if (response.code == 200) {
            this.licencia = true;
            this.categoriaLcSelected = [response.data.categoria.id];
            this.ipatConductor.restriccion = response.data.restriccion;
            this.ipatConductor.fechaExpedicionLicenciaConduccion = response.data.fechaExpedicion;
            this.ipatConductor.fechaVencimientoLicenciaConduccion = response.data.fechaVencimiento;
            this.ipatConductor.organismoTransito = response.data.organismoTransito.divipo;
          } else {
            this.licencia = false;
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

  onMismoConductor() {
    if (this.ipatConductor.identificacion != null && this.ipatConductor.nombres != '' && this.ipatConductor.apellidos != '') {
      this.msmConductor = true;
      this.tipoIdentificacionPropietarioSelected = [this.tipoIdentificacionConductorSelected];
      this.ipat.identificacionPropietario = this.ipatConductor.identificacion;
      this.ipat.nombresPropietario = this.ipatConductor.nombres;
      this.ipat.apellidosPropietario = this.ipatConductor.apellidos;
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
    let identity = this._LoginService.getIdentity();

    console.log(identity);
    
    if (this.ipat.identificacionAgente || this.ipat.placaAgente) {
      this._SvIpatService.getBuscarAgente({ 'identificacionUsuario': identity.identificacion, 'identificacionAgente': this.ipat.identificacionAgente, 'placaAgente': this.ipat.placaAgente }, token).subscribe(

        response => {
          if (response.code == 200) {
            /* this.agente = true; */
            
            this.ipat.identificacionAgente = response.data.ciudadano.identificacion;

            if (response.data.ciudadano.tipoIdentificacion) {
              this.tipoIdentificacionAgenteSelected = [response.data.ciudadano.tipoIdentificacion.id];
            }
            if (response.data.cargo.nombre) {
              this.ipat.gradoAgente = response.data.cargo.nombre;
            }
            this.ipat.nombresAgente = response.data.ciudadano.primerNombre + ' ' + response.data.ciudadano.segundoNombre;
            this.ipat.apellidosAgente = response.data.ciudadano.primerApellido + ' ' + response.data.ciudadano.segundoApellido;
            if (response.data.numeroPlaca) {
              this.ipat.placaAgente = response.data.numeroPlaca;
            } else {
              this.ipat.placaAgente = '';
            }
            if (response.data.organismoTransito.nombre) {
              this.ipat.entidadAgente = response.data.organismoTransito.nombre;
            } else {
              this.ipat.entidadAgente = '';
            }
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
                this.ipat.gradoAgente = '';
                this.ipat.nombresAgente = '';
                this.ipat.apellidosAgente = '';
                this.ipat.placaAgente = '';
                this.ipat.entidadAgente = '';
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
    if (this.ipatVictima.identificacion) {
      this._SvIpatService.getBuscarVictima({ 'identificacionVictima': this.ipatVictima.identificacion }, token).subscribe(

        response => {
          if (response.code == 200) {
            if (response.data.tipoIdentificacion) {
              this.tipoIdentificacionVictimaSelected = [response.data.tipoIdentificacion.id];
            }
            if (response.data.primerNombre) {
              this.ipatVictima.nombres = response.data.primerNombre + ' ' + response.data.segundoNombre;
            }
            if (response.data.primerApellido) {
              this.ipatVictima.apellidos = response.data.primerApellido + ' ' + response.data.segundoApellido;
            }
            if (response.data.fechaNacimiento) {

              var datePiper = new DatePipe('en-US');
              var date = new Date();
              date.setTime(response.data.fechaNacimiento.timestamp * 1000);

              response.data.fechaNacimiento = datePiper.transform(
                date, 'yyyy-MM-dd'
              );

              this.ipatVictima.fechaNacimiento = response.data.fechaNacimiento;
            }
            if (response.data.genero) {
              this.sexoVictimaSelected = [response.data.genero.id];
            }
            if (response.data.direccionPersonal) {
              this.ipatVictima.direccionResidencia = response.data.direccionPersonal;
            }
            if (response.data.municipioResidencia) {
              this.ciudadResidenciaVictimaSelected = [response.data.municipioResidencia.id];
            }
            if (response.data.telefonoCelular) {
              this.ipatVictima.telefono = response.data.telefonoCelular;
            }
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.tipoIdentificacionVictimaSelected = [0];
                this.ipatVictima.nombres = '';
                this.ipatVictima.apellidos = '';
                this.ipatVictima.fechaNacimiento = '';
                this.sexoVictimaSelected = [0];
                this.ipatVictima.direccionResidencia = '';
                this.ciudadResidenciaVictimaSelected = [0];
                this.ipatVictima.telefono = null;
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
    if (this.ipat.identificacionTestigo) {
      this._SvIpatService.getBuscarTestigo({ 'identificacionTestigo': this.ipat.identificacionTestigo }, token).subscribe(

        response => {
          if (response.code == 200) {
            this.testigo = true;
            this.tipoIdentificacionTestigoSelected = [response.data.tipoIdentificacion.id];
            this.ipat.nombresTestigo = response.data.primerNombre + ' ' + response.data.segundoNombre;
            this.ipat.apellidosTestigo = response.data.primerApellido + ' ' + response.data.segundoApellido;
            this.ipat.direccionTestigo = response.data.direccionPersonal;
            this.ciudadResidenciaTestigoSelected = [response.data.municipioResidencia.id];
            this.ipat.telefonoTestigo = response.data.telefono;
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
                this.ipat.nombresTestigo = '';
                this.ipat.apellidosTestigo = '';
                this.ipat.direccionTestigo = '';
                this.ciudadResidenciaTestigoSelected = [0];
                this.ipat.telefonoTestigo = '';
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
  obtenerCorrespondio() {
    let token = this._LoginService.getToken();
      this._SvIpatService.getCorrespondio(this.ipat, token).subscribe(
        response => {
          if (response.code == 200) {
            this.ipat.correspondio = response.data;
            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
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
    if (this.ipatConductor.identificacion == null && this.ipatConductor.nombres == null && this.ipatConductor.apellidos) {
      swal({
        title: 'Alerta!',
        text: "Registre los campos del conductor",
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      //consecutivo del ipat
      this.ipatConductor.consecutivo = this.consecutivo.numero;

      this.ipatConductor.tipoIdentificacion = this.tipoIdentificacionConductorSelected;
      this.ipatConductor.nacionalidad = this.nacionalidadConductorSelected;
      this.ipatConductor.sexo = this.sexoConductorSelected;
      this.ipatConductor.ciudadResidencia = this.ciudadResidenciaConductorSelected;
      this.ipatConductor.idGravedad = this.gravedadConductorSelected;
      this.ipatConductor.categoriaLicenciaConduccion = this.categoriaLcSelected;


      var html = 'Se va a registrar el usuario:<br>' +
        'Nombres: <b>' + this.ipatConductor.nombres + ' ' + this.ipatConductor.apellidos + '</b><br>' +
        'Tipo Identificación: <b>' + this.tipoIdentificacionConductorSelected + '</b><br>' +
        'Identificación: <b>' + this.ipatConductor.identificacion + '</b><br>' +
        'Género: <b>' + this.sexoConductorSelected + '</b><br>' +
        'Teléfono: <b>' + this.ipatConductor.telefono + '</b><br>';

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
          this._SvIpatConductorService.register(this.ipatConductor, token).subscribe(
            response => {
              if (response.code == 200) {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });

                this.usuario = false;
                this.ipatConductor.identificacion = '';
                this.tipoIdentificacionConductorSelected = [0];
                this.nacionalidadConductorSelected = [0];
                this.sexoConductorSelected = [0];
                this.gravedadConductorSelected = [0];
                this.ciudadResidenciaConductorSelected = [0];
                this.ipatConductor.nombres = '';
                this.ipatConductor.apellidos = '';
                this.ipatConductor.fechaNacimiento = '';
                this.ipatConductor.direccionResidencia = '';
                this.ipatConductor.telefono = '';
                this.ipatConductor.sustanciasPsicoactivas = '',
                this.ipatConductor.portaLicencia = '',
                this.ipatConductor.numeroLicenciaConduccion = 0,
                this.ipatConductor.restriccion = '',
                this.ipatConductor.categoriaLicenciaConduccion = 0,
                this.ipatConductor.fechaExpedicionLicenciaConduccion = '',
                this.ipatConductor.fechaVencimientoLicenciaConduccion = '',
                this.ipatConductor.organismoTransito = '',
                this.ipatConductor.cinturon = '',
                this.ipatConductor.casco = '',
                this.ipatConductor.chaleco = '',
                this.ipatConductor.idHospital = 0,
                this.ipatConductor.descripcionLesion = '',

                this.contConductores += 1;
                this.ipat.totalConductores = this.contConductores;

                if (this.gravedadConductorSelected == 1) {
                  this.contMuertos += 1;
                  this.ipat.totalMuertos = this.contMuertos;
                } if (this.gravedadConductorSelected == 2) {
                  this.contHeridos += 1;
                  this.ipat.totalHeridos = this.contHeridos;
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
          this._SvIpatConductorService.register(this.ipatConductor, token).subscribe(
            response => {
              if (response.code == 200) {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });

                this.contConductores += 1;
                this.ipat.totalConductores = this.contConductores;
                if (this.gravedadConductorSelected == 1) {
                  this.contMuertos += 1;
                  this.ipat.totalMuertos = this.contMuertos;
                } if (this.gravedadConductorSelected == 2) {
                  this.contHeridos += 1;
                  this.ipat.totalHeridos = this.contHeridos;
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

    if (this.ipatVehiculo.placa == null) {
      swal({
        title: 'Alerta!',
        text: "Registre todos los campos del vehículo",
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      //consecutivo ipat
      this.ipatVehiculo.consecutivo = this.consecutivo.numero;

      this.ipatVehiculo.nacionalidad = this.nacionalidadVehiculoSelected;
      this.ipatVehiculo.marca = this.marcaSelected;
      this.ipatVehiculo.linea = this.lineaSelected;
      this.ipatVehiculo.color = this.colorSelected;
      this.ipatVehiculo.carroceria = this.carroceriaSelected;
      this.ipatVehiculo.clase = this.claseSelected;
      this.ipatVehiculo.servicio = this.servicioSelected;
      this.ipatVehiculo.modalidadTransporte = this.modalidadTransporteSelected;
      this.ipatVehiculo.radioAccion = this.radioAccionSelected;
      this.ipatVehiculo.matriculadoEn = this.matriculadoEnSelected;

      var html = 'Se va a registrar el vehículo:<br>' +
        'Placa: <b>' + this.ipatVehiculo.placa + '</b><br>' +
        'Marca: <b>' + this.marcaSelected + '</b><br>' +
        'Color: <b>' + this.colorSelected + '</b><br>' +
        'Modelo: <b>' + this.ipatVehiculo.modelo + '</b><br>' +
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
          this._SvIpatVehiculoService.register(this.ipatVehiculo, token).subscribe(
            response => {
              if (response.code == 200) {
                /* ================ cargar select placas vehiculos ===================== */
                this._SvIpatVehiculoService.selectByConsecutivo(this.consecutivo.numero, token).subscribe(
                  response => {
                    this.placasVehiculosIpat = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                /* ====================== fin cargar placas vehiculo ===================*/
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });

                this.vehiculoIpat = true;
                this.ipatVehiculo.placa = '';
                this.marcaSelected = [0];
                this.lineaSelected = [0];
                this.colorSelected = [0];
                this.ipatVehiculo.modelo = 0;
                this.carroceriaSelected = [0];
                this.claseSelected = [0];
                this.servicioSelected = [0];
                this.radioAccionSelected = [0];
                this.modalidadTransporteSelected = [0];
                this.ipatVehiculo.ton = 0;
                this.ipatVehiculo.pasajeros = 0;
                this.ipatVehiculo.matriculadoEn = 0;
                this.ipatVehiculo.empresa = '';
                this.ipatVehiculo.nitEmpresa = 0;
                this.ipatVehiculo.inmovilizado = '';
                this.ipatVehiculo.inmovilizadoEn = 0;
                this.ipatVehiculo.aDisposicionDe = 0;
                this.ipatVehiculo.portaTarjetaRegistro = 0;
                this.ipatVehiculo.revisionTecnomecanica = 0;
                this.ipatVehiculo.numeroTecnoMecanica = 0;
                this.ipatVehiculo.cantidadAcompaniantes = 0;
                this.ipatVehiculo.portaSoat = 0;
                /* this.ipatVehiculo.soat = 0; */
                this.ipatVehiculo.numeroPoliza = 0;
                this.ipatVehiculo.aseguradoraSoat = 0;
                this.ipatVehiculo.fechaVencimientoSoat = '';
                this.ipatVehiculo.portaSeguroResponsabilidadCivil = 0;
                this.ipatVehiculo.numeroSeguroResponsabilidadCivil = 0;
                this.ipatVehiculo.idAseguradoraSeguroResponsabilidadCivil = 0;
                this.ipatVehiculo.fechaVencimientoSeguroResponsabilidadCivil = '';
                this.ipatVehiculo.portaSeguroExtracontractual = 0;
                this.ipatVehiculo.numeroSeguroExtracontractual = 0;
                this.ipatVehiculo.idAseguradoraSeguroExtracontractual = 0;
                this.ipatVehiculo.fechaVencimientoSeguroExtracontractual = '';
                this.ipatVehiculo.descripcionDanios = '';
                this.ipatVehiculo.arrayFallas = '';
                this.ipatVehiculo.arrayLugaresImpacto = '';
                /* this.ipat.idHipotesis = ''; */
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
          this._SvIpatVehiculoService.register(this.ipatVehiculo, token).subscribe(
            response => {
              if (response.code == 200) {
                /* ================ cargar select placas vehiculos ===================== */
                this._SvIpatVehiculoService.selectByConsecutivo(this.consecutivo.numero, token).subscribe(
                  response => {
                    this.placasVehiculosIpat = response;
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                /* ====================== fin cargar placas vehiculo ===================*/
                
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
                this.vehiculoIpat = true;
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

    if (this.ipatVictima.identificacion == null) {
      swal({
        title: 'Alerta!',
        text: "Registre todos los campos de la victima",
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.ipatVictima.consecutivo = this.consecutivo.numero;
      this.ipatVictima.tipoIdentificacion = this.tipoIdentificacionVictimaSelected;
      this.ipatVictima.nacionalidad = this.nacionalidadVictimaSelected;
      this.ipatVictima.sexo = this.sexoVictimaSelected;
      this.ipatVictima.ciudadResidencia = this.ciudadResidenciaVictimaSelected;
      this.ipatVictima.idTipoVictima = this.tipoVictimaSelected;
      this.ipatVictima.idGravedad = this.gravedadVictimaSelected;

      var html = 'Se va a registrar el usuario:<br>' +
        'Nombres: <b>' + this.ipatVictima.nombres + ' ' + this.ipatVictima.apellidos + '</b><br>' +
        'Tipo Identificación: <b>' + this.tipoIdentificacionVictimaSelected + '</b><br>' +
        'Identificación: <b>' + this.ipatVictima.identificacion + '</b><br>' +
        'Género: <b>' + this.sexoVictimaSelected + '</b><br>' +
        'Teléfono: <b>' + this.ipatVictima.telefono + '</b><br>';

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
          this._SvIpatVictimaService.register(this.ipatVictima, token).subscribe(
            response => {
              if (response.code == 200) {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
                if (this.tipoVictimaSelected == 1) {
                  this.contPasajeros += 1;
                  this.ipat.totalPasajeros = this.contPasajeros;
                } if (this.tipoVictimaSelected == 2) {
                  this.contPeatones += 1;
                  this.ipat.totalPeatones = this.contPeatones;
                } if (this.tipoVictimaSelected == 3) {
                  this.contAcompaniantes += 1;
                  this.ipat.totalAcompaniantes = this.contAcompaniantes;
                } if (this.gravedadVictimaSelected == 1) {
                  this.contMuertos += 1;
                  this.ipat.totalMuertos = this.contMuertos;
                } if (this.gravedadVictimaSelected == 2) {
                  this.contHeridos += 1;
                  this.ipat.totalHeridos = this.contHeridos;
                }

                this.victima = false;
                this.tipoVictimaSelected = [0];
                this.gravedadVictimaSelected = [0];
                this.ipatVictima.identificacion = '';
                this.ipatVictima.tipoIdentificacion = '';
                this.ipatVictima.nombres = '';
                this.ipatVictima.apellidos = '';
                this.nacionalidadVictimaSelected = [0];
                this.ipatVictima.fechaNacimiento = '';
                this.sexoVictimaSelected = [0];
                this.ipatVictima.direccionResidencia = '';
                this.ciudadResidenciaVictimaSelected = [0];
                this.ipatVictima.telefono = '';
                this.ipatVictima.idHospital = '';
                this.ipatVictima.practicoExamen = '';
                this.ipatVictima.autorizo = '';
                this.ipatVictima.idResultadoExamen = '';
                this.ipatVictima.idGradoExamen = '';
                this.ipatVictima.sustanciasPsicoactivas = '';
                this.ipatVictima.cinturon = '';
                this.ipatVictima.casco = '';
                this.ipatVictima.chaleco = '';
                this.ipatVictima.descripcionLesion = '';
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
          this._SvIpatVictimaService.register(this.ipatVictima, token).subscribe(
            response => {
              if (response.code == 200) {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
                if (this.tipoVictimaSelected == 1) {
                  this.contPasajeros += 1;
                  this.ipat.totalPasajeros = this.contPasajeros;
                } if (this.tipoVictimaSelected == 2) {
                  this.contPeatones += 1;
                  this.ipat.totalPeatones = this.contPeatones;
                } if (this.tipoVictimaSelected == 3) {
                  this.contAcompaniantes += 1;
                  this.ipat.totalAcompaniantes = this.contAcompaniantes;
                } if (this.gravedadVictimaSelected == 1) {
                  this.contMuertos += 1;
                  this.ipat.totalMuertos = this.contMuertos;
                } if (this.gravedadVictimaSelected == 2) {
                  this.contHeridos += 1;
                  this.ipat.totalHeridos = this.contHeridos;
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

  onChangedAgente(e, campo) {
    if(e) {
      if(campo == 'identificacion') {
        this.ipat.placaAgente = '';
      } else if(campo == 'placa') {
        this.ipat.identificacionAgente = '';
      }
    }
  }

  //para georeferenciacion de ipat
  onRemoveDemarcacion(demarcacion) {
    this.arrayDemarcaciones = this.arrayDemarcaciones.filter(h => h !== demarcacion);
  }

  mapLoad(map) {
    this.map = map;
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  onRightClick(index: number) {
    /*var marker = this.markers[index]; // find the marker by given id
    marker.setMap(null);*/
    //this.markers.splice(index, 1);
    console.log('clicked right the marker:' + this.markers[index]);
  }

  onSearchGeo() {
    if (this.address) {
      this._SvIpatService.getLatLng(this.address).subscribe(
        result => {
          this.__zone.run(() => {
            this.lat = result.lat();
            this.lng = result.lng();
          });
        },
        error => console.log(error),
        () => console.log('Geocoding completed!')
      );
    } else {
      swal({
        title: 'Error!',
        text: 'La ubicación no ha sido diligenciada.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  mapClicked($event: MouseEvent) {
    /* if (this.senialUbicacion.cantidad > 0) { */
      console.log(this.markers.length);

      if (this.markers.length == 0) {
        this._SvIpatService.getAddress($event.coords).subscribe(
          result => {
            this.__zone.run(() => {
              this.address = result;

              this.markers.push({
                lat: $event.coords.lat,
                lng: $event.coords.lng,
                draggable: true,
                label: result
                /* label: result + "<br>(" + this.senial.tipoSenial.nombre + ")" + "<br>(" + this.senial.nombre + ")" */
              });
            });
          },
          error => console.log(error),
          () => console.log('Geocoding completed!')
        );
      } else if (this.markers.length != 0) {
        this.markers = [];
        
        this._SvIpatService.getAddress($event.coords).subscribe(
          result => {
            this.__zone.run(() => {
              this.address = result;

              this.markers.push({
                lat: $event.coords.lat,
                lng: $event.coords.lng,
                draggable: true,
                label: result
                /* label: result + "<br>(" + this.senial.tipoSenial.nombre + ")" + "<br>(" + this.senial.nombre + ")" */
              });
            });
          },
          error => console.log(error),
          () => console.log('Geocoding completed!')
        );
      }
      else {
        swal({
          title: 'Atención!',
          text: 'El número de georeferenciaciones no puede ser mayor a la cantidad a asignar al municipio,',
          type: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    /* } */
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
