import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { SvIpatService } from '../../../services/svIpat.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { SvIpatConsecutivoService } from '../../../services/svIpatConsecutivo.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { SvCfgGravedadAccidenteService } from '../../../services/svCfgGravedadAccidente.service';

import { SvIpat } from '../svIpat.modelo';
import { SvIpatConductor } from '../svIpatConductor.modelo';
import { SvIpatVehiculo } from '../svIpatVehiculo.modelo';
import { SvIpatVictima } from '../svIpatVictima.modelo';

import { SvIpatConductorService } from '../../../services/svIpatConductor.services'
import { SvIpatVehiculoService } from '../../../services/svIpatVehiculo.services'
import { SvIpatVictimaService } from '../../../services/svIpatVictima.services'

import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { SvCfgClaseAccidenteService } from '../../../services/svCfgClaseAccidente.service';
import { SvCfgClaseChoqueService } from '../../../services/svCfgClaseChoque.service';
import { SvCfgObjetoFijoService } from '../../../services/svCfgObjetoFijo.service';
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
import { UserLcCfgCategoriaService } from "../../../services/userLcCfgCategoria.service";
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
  @Input() consecutivo: any = null;
  public ipat: SvIpat;
  public ipatConductor: SvIpatConductor;
  public ipatVehiculo: SvIpatVehiculo;
  public ipatVictima: SvIpatVictima;
  public organismoTransito: any;
  public errorMessage;

  public nroIpat: any;

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

    private _SvIpatConductorService: SvIpatConductorService,
    private _SvIpatVehiculoService: SvIpatVehiculoService,
    private _SvIpatVictimaService: SvIpatVictimaService,
  ) { }

  ngOnInit() {
    console.log(this.consecutivo);

    this.ipat = new SvIpat(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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
              if (response.status == 'success') {
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

    this.ipat.tipoIdentificacionPropietario = this.tipoIdentificacionPropietarioSelected;
    this.ipat.tipoIdentificacionAgente = this.tipoIdentificacionAgenteSelected;
    this.ipat.tipoIdentificacionTestigo = this.tipoIdentificacionTestigoSelected;
    this.ipat.ciudadResidenciaTestigo = this.ciudadResidenciaTestigoSelected;
    this.ipat.numeroConsecutivo = this.consecutivo;
    this.ipatConductor.categoriaLicenciaConduccion = this.categoriaLcSelected;

    this._SvIpatService.register(this.ipat, token).subscribe(
      response => {
        if (response.status == 'success') {
          /* this.ready.emit(true); */
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
    if (this.ipatConductor.identificacionConductor) {
      this._SvIpatService.getBuscarConductor({ 'identificacion': this.ipatConductor.identificacionConductor }, token).subscribe(

        response => {

          if (response.status == 'success') {
            /* ================ cargar select placas vehiculos ===================== */
            this._SvIpatVehiculoService.selectByConsecutivo(this.numeroConsecutivo, token).subscribe(
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

            if (response.data.tipoIdentificacion != null) {
              this.tipoIdentificacionConductorSelected = [response.data.tipoIdentificacion.id];
            } else {
              this.tipoIdentificacionConductorSelected = [0];
            }
            if (response.data.segundoNombre == null) {
              this.ipatConductor.nombresConductor = response.data.primerNombre;
            } else {
              this.ipatConductor.nombresConductor = response.data.primerNombre + ' ' + response.data.segundoNombre;
            }
            if (response.data.segundoApellido == null) {
              this.ipatConductor.apellidosConductor = response.data.primerApellido;
            } else {
              this.ipatConductor.apellidosConductor = response.data.primerApellido + ' ' + response.data.segundoApellido;
            }
            if (response.data.fechaNacimiento != null) {
              this.ipatConductor.fechaNacimientoConductor = response.data.fechaNacimiento;
            } else {
              this.ipatConductor.fechaNacimientoConductor = '';
            }
            if (response.data.genero != null) {
              this.sexoConductorSelected = [response.data.genero.id];
            } else {
              this.sexoConductorSelected = [0];
            }
            if (response.data.direccion != null) {
              this.ipatConductor.direccionResidenciaConductor = response.data.direccion;
            } else {
              this.ipatConductor.direccionResidenciaConductor = '';
            }
            if (response.data.municipioResidencia != null) {
              this.ciudadResidenciaConductorSelected = [response.data.municipioResidencia.id];
            } else {
              this.ciudadResidenciaConductorSelected = [0];
            }
            if (response.data.telefono != null) {
              this.ipatConductor.telefonoConductor = response.data.telefono;
            } else {
              this.ipatConductor.telefonoConductor = '';
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
                this.ipatConductor.nombresConductor = '';
                this.ipatConductor.apellidosConductor = '';
                this.nacionalidadConductorSelected = [0];
                this.ipatConductor.fechaNacimientoConductor = '';
                this.sexoConductorSelected = [0];
                this.ipatConductor.direccionResidenciaConductor = '';
                this.ciudadResidenciaConductorSelected = [0];
                this.ipatConductor.telefonoConductor = '';

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
                  console.log(this.vehiculosIpat);
                } else {
                  let obj = {
                    value: this.ipatVehiculo.placa,
                    label: this.ipatVehiculo.placa,
                  };
                  this.vehiculosIpat.push(obj);
                }
                console.log(this.vehiculosIpat);
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
          if (response.status == 'success') {
            if (response.data.nacionalidad != null) {
              this.nacionalidadVehiculoSelected = [response.data.nacionalidad.id];
            } else {
              this.nacionalidadVehiculoSelected = [0];
            }
            if (response.data.linea.marca != null) {
              this.marcaSelected = [response.data.linea.marca.id];
              this.lineaSelected = [response.data.linea.id];
            } else {
              this.marcaSelected = [0];
              this.lineaSelected = [0];
            }
            if (response.data.color != null) {
              this.colorSelected = [response.data.color.id];
            } else {
              this.colorSelected = [0];
            }
            if (response.data.modelo != null) {
              this.ipatVehiculo.modelo = response.data.modelo;
            } else {
              this.ipatVehiculo.modelo = 0;
            }
            if (response.data.carroceria != null) {
              this.carroceriaSelected = [response.data.carroceria.id];
            } else {
              this.carroceriaSelected = [0];
            }
            if (response.data.numeroPasajeros != null) {
              this.ipatVehiculo.pasajeros = response.data.numeroPasajeros;
            } else {
              this.ipatVehiculo.pasajeros = 0;
            }
            if (response.data.municipio != null) {
              this.matriculadoEnSelected = [response.data.municipio.id];
            } else {
              this.matriculadoEnSelected = [0];
            }
            if (response.data.clase != null) {
              this.claseSelected = [response.data.clase.id];
            } else {
              this.claseSelected = [0];
            }
            if (response.data.servicio != null) {
              this.servicioSelected = [response.data.servicio.id];
            } else {
              this.servicioSelected = [0];
            }
            if (response.data.modalidadTransporte != null) {
              this.modalidadTransporteSelected = [response.data.modalidadTransporte.id];
            } else {
              this.modalidadTransporteSelected = [0];
            }
            if (response.data.radioAccion != null) {
              this.radioAccionSelected = [response.data.radioAccion.id];
            } else {
              this.radioAccionSelected = [0];
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
      this._SvIpatService.getBuscarLicenciaConductor({ 'numero': this.ipatConductor.numeroLicenciaConduccion, 'identificacion': this.ipatConductor.identificacionConductor }, token).subscribe(

        response => {
          if (response.status == 'success') {
            this.licencia = true;
            this.categoriaLcSelected = [response.data.categoria.id];
            this.ipatConductor.restriccionConductor = response.data.restriccion;
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
    if (this.ipatConductor.identificacionConductor != null && this.ipatConductor.nombresConductor != '' && this.ipatConductor.apellidosConductor != '') {
      this.msmConductor = true;
      this.tipoIdentificacionPropietarioSelected = [this.tipoIdentificacionConductorSelected];
      this.ipat.identificacionPropietario = this.ipatConductor.identificacionConductor;
      this.ipat.nombresPropietario = this.ipatConductor.nombresConductor;
      this.ipat.apellidosPropietario = this.ipatConductor.apellidosConductor;
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
    if (this.ipat.identificacionAgente) {
      this._SvIpatService.getBuscarAgente({ 'identificacionAgente': this.ipat.identificacionAgente }, token).subscribe(

        response => {
          if (response.status == 'success') {
            this.agente = true;
            if (response.data.ciudadano.tipoIdentificacion != null) {
              this.tipoIdentificacionAgenteSelected = [response.data.ciudadano.tipoIdentificacion.id];
            } else {
              this.tipoIdentificacionAgenteSelected = [0];
            }
            if (response.data.cargo.nombre != null) {
              this.ipat.gradoAgente = response.data.cargo.nombre;
            } else {
              this.ipat.gradoAgente = '';
            }
            this.ipat.nombresAgente = response.data.ciudadano.primerNombre + ' ' + response.data.ciudadano.segundoNombre;
            this.ipat.apellidosAgente = response.data.ciudadano.primerApellido + ' ' + response.data.ciudadano.segundoApellido;
            if (response.data.numeroPlaca != null) {
              this.ipat.placaAgente = response.data.numeroPlaca;
            } else {
              this.ipat.placaAgente = '';
            }
            if (response.data.organismoTransito.nombre != null) {
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
    if (this.ipatVictima.identificacionVictima) {
      this._SvIpatService.getBuscarVictima({ 'identificacionVictima': this.ipatVictima.identificacionVictima }, token).subscribe(

        response => {
          if (response.status == 'success') {
            if (response.data.tipoIdentificacion.id != null) {
              this.tipoIdentificacionVictimaSelected = [response.data.tipoIdentificacion.id];
            } else {
              this.tipoIdentificacionVictimaSelected = [0];
            }
            if (response.data.primerNombre != null) {
              this.ipatVictima.nombresVictima = response.data.primerNombre + ' ' + response.data.segundoNombre;
            } else {
              this.ipatVictima.nombresVictima = '';
            }
            if (response.data.primerApellido != null) {
              this.ipatVictima.apellidosVictima = response.data.primerApellido + ' ' + response.data.segundoApellido;
            } else {
              this.ipatVictima.apellidosVictima = '';
            }
            if (response.data.fechaNacimiento != null) {
              this.ipatVictima.fechaNacimientoVictima = response.data.fechaNacimiento;
            } else {
              this.ipatVictima.fechaNacimientoVictima = '';
            }
            if (response.data.genero.id != null) {
              this.sexoVictimaSelected = [response.data.genero.id];
            } else {
              this.sexoVictimaSelected = [0];
            }
            if (response.data.direccionPersonal != null) {
              this.ipatVictima.direccionResidenciaVictima = response.data.direccionPersonal;
            } else {
              this.ipatVictima.direccionResidenciaVictima = '';
            }
            if (response.data.municipioResidencia.id != null) {
              this.ciudadResidenciaVictimaSelected = [response.data.municipioResidencia.id];
            } else {
              this.ciudadResidenciaVictimaSelected = [0];
            }
            if (response.data.telefono != null) {
              this.ipatVictima.telefonoVictima = response.data.telefono;
            } else {
              this.ipatVictima.telefonoVictima = '';
            }
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                /* this.victimaEncontrada = false; */
                this.tipoIdentificacionVictimaSelected = [0];
                this.ipatVictima.nombresVictima = '';
                this.ipatVictima.apellidosVictima = '';
                this.ipatVictima.fechaNacimientoVictima = '';
                this.sexoVictimaSelected = [0];
                this.ipatVictima.direccionResidenciaVictima = '';
                this.ciudadResidenciaVictimaSelected = [0];
                this.ipatVictima.telefonoVictima = '';
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
          if (response.status == 'success') {
            console.log(response.data);
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
          if (response.status == 'success') {
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
    if (this.ipatConductor.identificacionConductor == null && this.ipatConductor.nombresConductor == null && this.ipatConductor.apellidosConductor) {
      swal({
        title: 'Alerta!',
        text: "Registre los campos del conductor",
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      //consecutivo del ipat
      this.ipatConductor.consecutivo = this.numeroConsecutivo;

      this.ipatConductor.tipoIdentificacionConductor = this.tipoIdentificacionConductorSelected;
      this.ipatConductor.nacionalidadConductor = this.nacionalidadConductorSelected;
      this.ipatConductor.sexoConductor = this.sexoConductorSelected;
      this.ipatConductor.ciudadResidenciaConductor = this.ciudadResidenciaConductorSelected;
      this.ipatConductor.idGravedadConductor = this.gravedadConductorSelected;
      this.ipatConductor.categoriaLicenciaConduccion = this.categoriaLcSelected;


      var html = 'Se va a registrar el usuario:<br>' +
        'Nombres: <b>' + this.ipatConductor.nombresConductor + ' ' + this.ipatConductor.apellidosConductor + '</b><br>' +
        'Tipo Identificación: <b>' + this.tipoIdentificacionConductorSelected + '</b><br>' +
        'Identificación: <b>' + this.ipatConductor.identificacionConductor + '</b><br>' +
        'Género: <b>' + this.sexoConductorSelected + '</b><br>' +
        'Teléfono: <b>' + this.ipatConductor.telefonoConductor + '</b><br>';

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
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });

                this.usuario = false;
                this.ipatConductor.identificacionConductor = '';
                this.tipoIdentificacionConductorSelected = [0];
                this.nacionalidadConductorSelected = [0];
                this.sexoConductorSelected = [0];
                this.gravedadConductorSelected = [0];
                this.ciudadResidenciaConductorSelected = [0];
                this.ipatConductor.nombresConductor = '';
                this.ipatConductor.apellidosConductor = '';
                this.ipatConductor.fechaNacimientoConductor = '';
                this.ipatConductor.direccionResidenciaConductor = '';
                this.ipatConductor.telefonoConductor = '';
                this.ipatConductor.sustanciasPsicoactivasConductor = '',
                this.ipatConductor.portaLicencia = '',
                this.ipatConductor.numeroLicenciaConduccion = 0,
                this.ipatConductor.restriccionConductor = '',
                this.ipatConductor.categoriaLicenciaConduccion = 0,
                this.ipatConductor.fechaExpedicionLicenciaConduccion = '',
                this.ipatConductor.fechaVencimientoLicenciaConduccion = '',
                this.ipatConductor.organismoTransito = '',
                this.ipatConductor.cinturonConductor = '',
                this.ipatConductor.cascoConductor = '',
                this.ipatConductor.chalecoConductor = '',
                this.ipatConductor.idHospitalConductor = 0,
                this.ipatConductor.descripcionLesionConductor = '',

                  this.contConductores += 1;
                this.ipat.totalConductores = this.contConductores;

                if (this.gravedadConductorSelected == 1) {
                  this.contHeridos += 1;
                  this.ipat.totalHeridos = this.contHeridos;
                } if (this.gravedadConductorSelected == 2) {
                  this.contMuertos += 1;
                  this.ipat.totalMuertos = this.contMuertos;
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
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });

                this.contConductores += 1;
                this.ipat.totalConductores = this.contConductores;
                if (this.gravedadConductorSelected == 1) {
                  this.contHeridos += 1;
                  this.ipat.totalHeridos = this.contHeridos;
                } if (this.gravedadConductorSelected == 2) {
                  this.contMuertos += 1;
                  this.ipat.totalMuertos = this.contMuertos;
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
      this.ipatVehiculo.consecutivo = this.numeroConsecutivo;

      this.ipatVehiculo.nacionalidadVehiculo = this.nacionalidadVehiculoSelected;
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
              if (response.status == 'success') {
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
                this.ipatVehiculo.soat = 0;
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
                this.ipat.idHipotesis = '';
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
              if (response.status == 'success') {
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

    if (this.ipatVictima.identificacionVictima == null) {
      swal({
        title: 'Alerta!',
        text: "Registre todos los campos de la victima",
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.ipatVictima.consecutivo = this.numeroConsecutivo;
      this.ipatVictima.tipoIdentificacionVictima = this.tipoIdentificacionVictimaSelected;
      this.ipatVictima.nacionalidadVictima = this.nacionalidadVictimaSelected;
      this.ipatVictima.sexoVictima = this.sexoVictimaSelected;
      this.ipatVictima.ciudadResidenciaVictima = this.ciudadResidenciaVictimaSelected;
      this.ipatVictima.idTipoVictima = this.tipoVictimaSelected;
      this.ipatVictima.idGravedadVictima = this.gravedadVictimaSelected;

      var html = 'Se va a registrar el usuario:<br>' +
        'Nombres: <b>' + this.ipatVictima.nombresVictima + ' ' + this.ipatVictima.apellidosVictima + '</b><br>' +
        'Tipo Identificación: <b>' + this.tipoIdentificacionVictimaSelected + '</b><br>' +
        'Identificación: <b>' + this.ipatVictima.identificacionVictima + '</b><br>' +
        'Género: <b>' + this.sexoVictimaSelected + '</b><br>' +
        'Teléfono: <b>' + this.ipatVictima.telefonoVictima + '</b><br>';

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
              if (response.status == 'success') {
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
                  this.contHeridos += 1;
                  this.ipat.totalHeridos = this.contHeridos;
                } if (this.gravedadVictimaSelected == 2) {
                  this.contMuertos += 1;
                  this.ipat.totalMuertos = this.contMuertos;
                }

                this.victima = false;
                this.tipoVictimaSelected = [0];
                this.gravedadVictimaSelected = [0];
                this.ipatVictima.identificacionVictima = '';
                this.ipatVictima.tipoIdentificacionVictima = '';
                this.ipatVictima.nombresVictima = '';
                this.ipatVictima.apellidosVictima = '';
                this.nacionalidadVictimaSelected = [0];
                this.ipatVictima.fechaNacimientoVictima = '';
                this.sexoVictimaSelected = [0];
                this.ipatVictima.direccionResidenciaVictima = '';
                this.ciudadResidenciaVictimaSelected = [0];
                this.ipatVictima.telefonoVictima = '';
                this.ipatVictima.idHospitalVictima = '';
                this.ipatVictima.practicoExamenVictima = '';
                this.ipatVictima.autorizoVictima = '';
                this.ipatVictima.idResultadoExamenVictima = '';
                this.ipatVictima.idGradoExamenVictima = '';
                this.ipatVictima.sustanciasPsicoactivasVictima = '';
                this.ipatVictima.cinturonVictima = '';
                this.ipatVictima.cascoVictima = '';
                this.ipatVictima.chalecoVictima = '';
                this.ipatVictima.descripcionLesionVictima = '';
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
              if (response.status == 'success') {
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
                  this.contHeridos += 1;
                  this.ipat.totalHeridos = this.contHeridos;
                } if (this.gravedadVictimaSelected == 2) {
                  this.contMuertos += 1;
                  this.ipat.totalMuertos = this.contMuertos;
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

  imprimirFormatos() {
    alert("formatos policia judicial");
  }
}
