import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { MsvRegistroIpatService } from '../../../services/msvRegistroIpat.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { SvIpatConsecutivoService } from '../../../services/svIpatConsecutivo.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { SvCfgGravedadAccidenteService } from '../../../services/svCfgGravedadAccidente.service';

import { MsvRegistroIpat } from '../msvRegistroIpat.modelo';
import { MsvIpatConductor } from '../msvRegistroIpatConductor.modelo';
import { MsvIpatVehiculo } from '../msvRegistroIpatVehiculo.modelo';
import { MsvIpatVictima } from '../msvRegistroIpatVictima.modelo';

import { SvIpatConductorService } from '../../../services/svIpatConductor.services'
import { SvIpatVehiculoService } from '../../../services/svIpatVehiculo.services'
import { SvIpatVictimaService } from '../../../services/svIpatVictima.services'

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
  public msvRegistroIpat: MsvRegistroIpat;
  public msvIpatConductor: MsvIpatConductor;
  public msvIpatVehiculo: MsvIpatVehiculo;
  public msvIpatVictima: MsvIpatVictima;
  public organismoTransito: any;
  public errorMessage;

  public nroIpat: any;

  public numeroConsecutivo: any;
  public consecutivo: any = null;

  public ipatEncontrado: any = null;
  public vehiculoEncontrado = false;
  public conductorEncontrado = false;
  public victimaEncontrada = false;

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

  public lugaresImpacto: any;
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
    private _MsvRegistroIpatService: MsvRegistroIpatService,

    private _FuncionarioService: PnalFuncionarioService,
    private _SvIpatConsecutivoService: SvIpatConsecutivoService,
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
    
    private _SvIpatConductorService: SvIpatConductorService,
    private _SvIpatVehiculoService: SvIpatVehiculoService,
    private _SvIpatVictimaService: SvIpatVictimaService,
  ) { }

  ngOnInit() {
    this.msvRegistroIpat = new MsvRegistroIpat(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.msvIpatConductor = new MsvIpatConductor(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.msvIpatVehiculo = new MsvIpatVehiculo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.msvIpatVictima = new MsvIpatVictima(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    /* === inicio consecutivo === */
    if(this.consecutivo) {
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
          this._SvIpatConsecutivoService.searchConsecutivo({ 'organismoTransito': this.organismoTransito , 'numeroConsecutivo': this.numeroConsecutivo }, token).subscribe(
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

  enviarTramite() {
    let token = this._LoginService.getToken();

   /*  this.msvRegistroIpat.tipoIdentificacionConductor = this.tipoIdentificacionConductorSelected;
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

    if (this.conductores.length == 0) {
      let dataConductores = {
        'identificacion: ': this.msvRegistroIpat.identificacionConductor,
        'tipo identificacion: ': this.msvRegistroIpat.tipoIdentificacionConductor,
        'nombres: ': this.msvRegistroIpat.nombresConductor,
        'apellidos: ': this.msvRegistroIpat.apellidosConductor,
        'nacionalidad: ': this.nacionalidadConductorSelected,
        'fecha nacimiento: ': this.msvRegistroIpat.fechaNacimientoConductor,
        'sexo: ': this.sexoConductorSelected,
        'gravedad: ': this.gravedadConductorSelected,
        'direccion: ': this.msvRegistroIpat.direccionResidenciaConductor,
        'ciudad residencia: ': this.ciudadResidenciaConductorSelected,
        'teléfono: ': this.msvRegistroIpat.telefonoConductor,
      };
      this.conductores.push(dataConductores);
    }

    if (this.vehiculos.length == 0) {
      let dataVehiculos = {
        'placa: ': this.msvRegistroIpat.placa,
        'nacionalidad: ': this.nacionalidadVehiculoSelected,
        'marca: ': this.marcaSelected,
        'linea: ': this.lineaSelected,
        'color: ': this.colorSelected,
        'modelo: ': this.msvRegistroIpat.modelo,
        'carroceria: ': this.carroceriaSelected,
        'clase vehiculo: ': this.claseSelected,
        'servicio: ': this.servicioSelected,
        'modalidad transporte: ': this.modalidadTransporteSelected,
        'capacidad carga(ton): ': this.msvRegistroIpat.ton,
        'pasajeros: ': this.msvRegistroIpat.pasajeros,
        'matriculado en: ': this.matriculadoEnSelected,
      };
      this.vehiculos.push(dataVehiculos);
    }

    if (this.victimas.length == 0) {
      let dataVictimas = {
        'tipo victima: ': this.tipoVictimaSelected,
        'gravedad victima: ': this.gravedadVictimaSelected,
        'tipo documento: ': this.tipoIdentificacionVictimaSelected,
        'identificacion: ': this.msvRegistroIpat.identificacionVictima,
        'nombres: ': this.msvRegistroIpat.nombresVictima,
        'apellidos: ': this.msvRegistroIpat.apellidosVictima,
        'nacionalidad: ': this.nacionalidadVictimaSelected,
        'fecha nacimiento: ': this.msvRegistroIpat.fechaNacimientoVictima,
        'sexo: ': this.sexoVictimaSelected,
        'dirección residencia: ': this.msvRegistroIpat.direccionResidenciaVictima,
        'ciudad residencia: ': this.ciudadResidenciaVictimaSelected,
        'telefono: ': this.msvRegistroIpat.telefonoVictima,
        'placa de vehiculo al que pertenece: ': this.msvRegistroIpat.placaVehiculoVictima,
      };
      this.victimas.push(dataVictimas);
    } */

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
    if (this.msvIpatConductor.identificacionConductor) {
      this._MsvRegistroIpatService.getBuscarConductor({ 'identificacion': this.msvIpatConductor.identificacionConductor }, token).subscribe(

        response => {

          if (response.status == 'success') {
            this.conductorEncontrado = true;
            if (response.data.tipoIdentificacion != null) {
              this.tipoIdentificacionConductorSelected = [response.data.tipoIdentificacion.id];
            } else {
              this.tipoIdentificacionConductorSelected = [0];
            }
            if (response.data.segundoNombre == null) {
              this.msvIpatConductor.nombresConductor = response.data.primerNombre;
            } else {
              this.msvIpatConductor.nombresConductor = response.data.primerNombre + ' ' + response.data.segundoNombre;
            }
            if (response.data.segundoApellido == null) {
              this.msvIpatConductor.apellidosConductor = response.data.primerApellido;
            } else {
              this.msvIpatConductor.apellidosConductor = response.data.primerApellido + ' ' + response.data.segundoApellido;
            }
            if (response.data.fechaNacimiento != null) {
              this.msvIpatConductor.fechaNacimientoConductor = response.data.fechaNacimiento;
            } else {
              this.msvIpatConductor.fechaNacimientoConductor = '';
            }
            if (response.data.genero != null) {
              this.sexoConductorSelected = [response.data.genero.id];
            } else {
              this.sexoConductorSelected = [0];
            }
            if (response.data.direccion != null) {
              this.msvIpatConductor.direccionResidenciaConductor = response.data.direccion;
            } else {
              this.msvIpatConductor.direccionResidenciaConductor = '';
            }
            if (response.data.municipioResidencia != null) {
              this.ciudadResidenciaConductorSelected = [response.data.municipioResidencia.id];
            } else {
              this.ciudadResidenciaConductorSelected = [0];
            }
            if (response.data.telefono != null) {
              this.msvIpatConductor.telefonoConductor = response.data.telefono;
            } else {
              this.msvIpatConductor.telefonoConductor = '';
            }
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.conductorEncontrado = false;
                this.tipoIdentificacionConductorSelected = [0];
                this.msvIpatConductor.nombresConductor = '';
                this.msvIpatConductor.apellidosConductor = '';
                this.nacionalidadConductorSelected = [0];
                this.msvIpatConductor.fechaNacimientoConductor = '';
                this.sexoConductorSelected = [0];
                this.msvIpatConductor.direccionResidenciaConductor = '';
                this.ciudadResidenciaConductorSelected = [0];
                this.msvIpatConductor.telefonoConductor = '';
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

    if (this.msvIpatVehiculo.placa) {
      this._MsvRegistroIpatService.getBuscarVehiculo({ 'placa': this.msvIpatVehiculo.placa }, token).subscribe(

        response => {
          if (response.status == 'success') {
            this.vehiculoEncontrado = true;
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
              this.msvIpatVehiculo.modelo = response.data.modelo;
            } else {
              this.msvIpatVehiculo.modelo = "";
            }
            if (response.data.carroceria != null) {
              this.carroceriaSelected = [response.data.carroceria.id];
            } else {
              this.carroceriaSelected = [0];
            }
            if (response.data.numeroPasajeros != null) {
              this.msvIpatVehiculo.pasajeros = response.data.numeroPasajeros;
            } else {
              this.msvIpatVehiculo.pasajeros = "";
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
                this.vehiculoEncontrado = false;
                this.nacionalidadVehiculoSelected = [0];
                this.marcaSelected = [0];
                this.lineaSelected = [0];
                this.colorSelected = [0];
                this.msvIpatVehiculo.modelo = '';
                this.carroceriaSelected = [0];
                this.msvIpatVehiculo.pasajeros = '';
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
    if (this.msvIpatConductor.numeroLicenciaConduccion) {
      this._MsvRegistroIpatService.getBuscarLicenciaConductor({ 'numero': this.msvIpatConductor.numeroLicenciaConduccion }, token).subscribe(

        response => {
          if (response.status == 'success') {
            this.licencia = true;
            this.msvIpatConductor.categoriaLicenciaConduccion = response.data.categoria.nombre;
            this.msvIpatConductor.restriccionConductor = response.data.restriccion;
            this.msvIpatConductor.fechaExpedicionLicenciaConduccion = response.data.fechaExpedicion;
            this.msvIpatConductor.fechaVencimientoLicenciaConduccion = response.data.fechaVencimiento;
            this.msvIpatConductor.organismoTransito = response.data.organismoTransito.divipo;
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

  onMismoConductor() {
    if (this.msvIpatConductor.identificacionConductor != null && this.msvIpatConductor.nombresConductor != '' && this.msvIpatConductor.apellidosConductor != '') {
      this.msmConductor = true;
      this.tipoIdentificacionPropietarioSelected = [this.tipoIdentificacionConductorSelected];
      this.msvRegistroIpat.identificacionPropietario = this.msvIpatConductor.identificacionConductor;
      this.msvRegistroIpat.nombresPropietario = this.msvIpatConductor.nombresConductor;
      this.msvRegistroIpat.apellidosPropietario = this.msvIpatConductor.apellidosConductor;
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
            if (response.data.cargo.nombre != null) {
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
    if (this.msvIpatVictima.identificacionVictima) {
      this._MsvRegistroIpatService.getBuscarVictima({ 'identificacionVictima': this.msvIpatVictima.identificacionVictima }, token).subscribe(

        response => {
          if (response.status == 'success') {
            this.victimaEncontrada = true;
            if (response.data.tipoIdentificacion.id != null) {
              this.tipoIdentificacionVictimaSelected = [response.data.tipoIdentificacion.id];
            } else {
              this.tipoIdentificacionVictimaSelected = [0];
            }
            if (response.data.primerNombre != null) {
              this.msvIpatVictima.nombresVictima = response.data.primerNombre + ' ' + response.data.segundoNombre;
            } else {
              this.msvIpatVictima.nombresVictima = '';
            }
            if (response.data.primerApellido != null) {
              this.msvIpatVictima.apellidosVictima = response.data.primerApellido + ' ' + response.data.segundoApellido;
            } else {
              this.msvIpatVictima.apellidosVictima = '';
            }
            if (response.data.fechaNacimiento != null) {
              this.msvIpatVictima.fechaNacimientoVictima = response.data.fechaNacimiento;
            } else {
              this.msvIpatVictima.fechaNacimientoVictima = '';
            }
            if (response.data.genero.id != null) {
              this.sexoVictimaSelected = [response.data.genero.id];
            } else {
              this.sexoVictimaSelected = [0];
            }
            if (response.data.direccionPersonal != null) {
              this.msvIpatVictima.direccionResidenciaVictima = response.data.direccionPersonal;
            } else {
              this.msvIpatVictima.direccionResidenciaVictima = '';
            }
            if (response.data.municipioResidencia.id != null) {
              this.ciudadResidenciaVictimaSelected = [response.data.municipioResidencia.id];
            } else {
              this.ciudadResidenciaVictimaSelected = [0];
            }
            if (response.data.telefono != null) {
              this.msvIpatVictima.telefonoVictima = response.data.telefono;
            } else {
              this.msvIpatVictima.telefonoVictima = '';
            }

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
                ) {
                }
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
                value: this.msvIpatVehiculo.placa,
                label: this.msvIpatVehiculo.placa,

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
                this.victimaEncontrada = false;
                this.tipoIdentificacionVictimaSelected = [0];
                this.msvIpatVictima.nombresVictima = '';
                this.msvIpatVictima.apellidosVictima = '';
                this.msvIpatVictima.fechaNacimientoVictima = '';
                this.sexoVictimaSelected = [0];
                this.msvIpatVictima.direccionResidenciaVictima = '';
                this.ciudadResidenciaVictimaSelected = [0];
                this.msvIpatVictima.telefonoVictima = '';
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
    if (e) {
      this._MsvRegistroIpatService.getCorrespondio(this.msvRegistroIpat, token).subscribe(
        response => {
          if (response.status == 'success') {
            /* if(this.msvRegistroIpat.correspondio != null) {
              this.numeroCorrespondio = true;
            } */
            this.msvRegistroIpat.correspondio = response.data;
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
  }

  registrarCiudadano() {
    let token = this._LoginService.getToken();
    if (this.msvIpatConductor.identificacionConductor == null && this.msvIpatConductor.nombresConductor == null && this.msvIpatConductor.apellidosConductor) {
      swal({
        title: 'Alerta!',
        text: "Registre los campos del conductor",
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.msvIpatConductor.tipoIdentificacionConductor = this.tipoIdentificacionConductorSelected;
      this.msvIpatConductor.nacionalidadConductor = this.nacionalidadConductorSelected;
      this.msvIpatConductor.sexoConductor = this.sexoConductorSelected;
      this.msvIpatConductor.ciudadResidenciaConductor = this.ciudadResidenciaConductorSelected;
      this.msvIpatConductor.idGravedadConductor = this.gravedadConductorSelected;


      var html = 'Se va a registrar el usuario:<br>' +
        'Nombres: <b>' + this.msvIpatConductor.nombresConductor + ' ' + this.msvIpatConductor.apellidosConductor + '</b><br>' +
        'Tipo Identificación: <b>' + this.tipoIdentificacionConductorSelected + '</b><br>' +
        'Identificación: <b>' + this.msvIpatConductor.identificacionConductor + '</b><br>' +
        'Género: <b>' + this.sexoConductorSelected + '</b><br>' +
        'Teléfono: <b>' + this.msvIpatConductor.telefonoConductor + '</b><br>';

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
          this._SvIpatConductorService.register(this.msvIpatConductor, token).subscribe(
            response => {
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
                //datos de cada conductor
                /* let dataConductores = {
                  'identificacion': this.msvRegistroIpat.identificacionConductor,
                  'tipo identificacion': this.tipoIdentificacionConductorSelected,
                  'nombres': this.msvRegistroIpat.nombresConductor,
                  'apellidos': this.msvRegistroIpat.apellidosConductor,
                  'nacionalidad': this.nacionalidadConductorSelected,
                  'fecha nacimiento': this.msvRegistroIpat.fechaNacimientoConductor,
                  'sexo': this.sexoConductorSelected,
                  'gravedad': this.gravedadConductorSelected,
                  'direccion': this.msvRegistroIpat.direccionResidenciaConductor,
                  'ciudad residencia': this.ciudadResidenciaConductorSelected,
                  'telefono': this.msvRegistroIpat.telefonoConductor,
                  'sust. psicoactivas': this.msvRegistroIpat.sustanciasPsicoactivasConductor,
                  'porta licencia conduccion': this.msvRegistroIpat.portaLicencia,
                  'No. Licencia conduccion': this.msvRegistroIpat.numeroLicenciaConduccion,
                  'categoria lic. conduccion': this.msvRegistroIpat.categoriaLicenciaConduccion,
                  'restriccion': this.msvRegistroIpat.restriccionConductor,
                  'fecha expedicion': this.msvRegistroIpat.fechaExpedicionLicenciaConduccion,
                  'fecha vencimiento': this.msvRegistroIpat.fechaVencimientoLicenciaConduccion,
                  'org. transito': this.msvRegistroIpat.organismoTransito,
                  'cinturon': this.msvRegistroIpat.cinturonConductor,
                  'casco': this.msvRegistroIpat.cascoConductor,
                  'chaleco': this.msvRegistroIpat.chalecoConductor,
                  'hospital atencion': this.msvRegistroIpat.idHospitalConductor,
                  'descripcio lesiones': this.msvRegistroIpat.descripcionLesionConductor,
                };
                this.conductores.push(dataConductores); */

                this.usuario = false;
                this.msvIpatConductor.identificacionConductor = '';
                this.tipoIdentificacionConductorSelected = [0];
                this.nacionalidadConductorSelected = [0];
                this.sexoConductorSelected = [0];
                this.gravedadConductorSelected = [0];
                this.ciudadResidenciaConductorSelected = [0];
                this.msvIpatConductor.nombresConductor = '';
                this.msvIpatConductor.apellidosConductor = '';
                this.msvIpatConductor.fechaNacimientoConductor = '';
                this.msvIpatConductor.direccionResidenciaConductor = '';
                this.msvIpatConductor.telefonoConductor = '';
                this.msvIpatConductor.sustanciasPsicoactivasConductor = '',
                this.msvIpatConductor.portaLicencia = '',
                this.msvIpatConductor.numeroLicenciaConduccion = 0,
                this.msvIpatConductor.restriccionConductor = '',
                this.msvIpatConductor.categoriaLicenciaConduccion = '',
                this.msvIpatConductor.fechaExpedicionLicenciaConduccion = '',
                this.msvIpatConductor.fechaVencimientoLicenciaConduccion = '',
                this.msvIpatConductor.organismoTransito = '',
                this.msvIpatConductor.cinturonConductor = '',
                this.msvIpatConductor.cascoConductor = '',
                this.msvIpatConductor.chalecoConductor = '',
                this.msvIpatConductor.idHospitalConductor = 0,
                this.msvIpatConductor.descripcionLesionConductor = '',

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
        else if (result.dismiss === swal.DismissReason.cancel) {
          this._SvIpatConductorService.register(this.msvIpatConductor, token).subscribe(
            response => {
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
                /* let dataConductores = {
                  'identificacion': this.msvRegistroIpat.identificacionConductor,
                  'tipo identificacion': this.tipoIdentificacionConductorSelected,
                  'nombres': this.msvRegistroIpat.nombresConductor,
                  'apellidos': this.msvRegistroIpat.apellidosConductor,
                  'nacionalidad': this.nacionalidadConductorSelected,
                  'fecha nacimiento': this.msvRegistroIpat.fechaNacimientoConductor,
                  'sexo': this.sexoConductorSelected,
                  'gravedad': this.gravedadConductorSelected,
                  'direccion': this.msvRegistroIpat.direccionResidenciaConductor,
                  'ciudad residencia': this.ciudadResidenciaConductorSelected,
                  'teléfono': this.msvRegistroIpat.telefonoConductor,
                  'sust. psicoactivas': this.msvRegistroIpat.sustanciasPsicoactivasConductor,
                  'porta licencia conduccion': this.msvRegistroIpat.portaLicencia,
                  'No. Licencia conduccion': this.msvRegistroIpat.numeroLicenciaConduccion,
                  'categoria lic. conduccion': this.msvRegistroIpat.categoriaLicenciaConduccion,
                  'restriccion': this.msvRegistroIpat.restriccionConductor,
                  'fecha expedicion': this.msvRegistroIpat.fechaExpedicionLicenciaConduccion,
                  'fecha vencimiento': this.msvRegistroIpat.fechaVencimientoLicenciaConduccion,
                  'org. transito': this.msvRegistroIpat.organismoTransito,
                  'cinturon': this.msvRegistroIpat.cinturonConductor,
                  'casco': this.msvRegistroIpat.cascoConductor,
                  'chaleco': this.msvRegistroIpat.chalecoConductor,
                  'hospital atencion': this.msvRegistroIpat.idHospitalConductor,
                  'descripcio lesiones': this.msvRegistroIpat.descripcionLesionConductor,
                };
                this.conductores.push(dataConductores); */

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
                console.log(this.conductores);

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

  registrarCiudadanoEncontrado() {
    /* let dataConductores = {
      'identificacion: ': this.msvRegistroIpat.identificacionConductor,
      'tipo identificacion: ': this.tipoIdentificacionConductorSelected,
      'nombres: ': this.msvRegistroIpat.nombresConductor,
      'apellidos: ': this.msvRegistroIpat.apellidosConductor,
      'nacionalidad: ': this.nacionalidadConductorSelected,
      'fecha nacimiento: ': this.msvRegistroIpat.fechaNacimientoConductor,
      'sexo: ': this.sexoConductorSelected,
      'gravedad: ': this.gravedadConductorSelected,
      'direccion: ': this.msvRegistroIpat.direccionResidenciaConductor,
      'ciudad residencia: ': this.ciudadResidenciaConductorSelected,
      'teléfono: ': this.msvRegistroIpat.telefonoConductor,
      'se practico el examen: ': this.msvRegistroIpat.practicoExamenConductor,
      'autorizó: ': this.msvRegistroIpat.autorizoConductor,
      'resultado examen: ': this.msvRegistroIpat.idResultadoExamenConductor,
      'grado examen: ': this.msvRegistroIpat.idGradoExamenConductor,
      'sust. psicoactivas: ': this.msvRegistroIpat.sustanciasPsicoactivasConductor,
      'porta licencia conduccion: ': this.msvRegistroIpat.portaLicencia,
      'No. Licencia conduccion: ': this.msvRegistroIpat.numeroLicenciaConduccion,
      'categoria lic. conduccion: ': this.msvRegistroIpat.categoriaLicenciaConduccion,
      'restriccion: ': this.msvRegistroIpat.restriccionConductor,
      'fecha expedicion: ': this.msvRegistroIpat.fechaExpedicionLicenciaConduccion,
      'fecha vencimiento: ': this.msvRegistroIpat.fechaVencimientoLicenciaConduccion,
      'org. transito: ': this.msvRegistroIpat.organismoTransito,
      'cinturon: ': this.msvRegistroIpat.cinturonConductor,
      'casco: ': this.msvRegistroIpat.cascoConductor,
      'chaleco: ': this.msvRegistroIpat.chalecoConductor,
      'hospital atencion: ': this.msvRegistroIpat.idHospitalConductor,
      'descripcio lesiones: ': this.msvRegistroIpat.descripcionLesionConductor,
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
    swal({
      title: 'Perfecto!',
      text: 'Conductor agregado con exito',
      type: 'success',
      confirmButtonText: 'Aceptar'
    });
    console.log(this.conductores); */
  }

  registrarVehiculo() {
    let token = this._LoginService.getToken();

    if (this.msvIpatVehiculo.placa == null) {
      swal({
        title: 'Alerta!',
        text: "Registre todos los campos del vehículo",
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.msvIpatVehiculo.nacionalidadVehiculo = this.nacionalidadVehiculoSelected;
      this.msvIpatVehiculo.marca = this.marcaSelected;
      this.msvIpatVehiculo.linea = this.lineaSelected;
      this.msvIpatVehiculo.color = this.colorSelected;
      this.msvIpatVehiculo.carroceria = this.carroceriaSelected;
      this.msvIpatVehiculo.clase = this.claseSelected;
      this.msvIpatVehiculo.servicio = this.servicioSelected;
      this.msvIpatVehiculo.modalidadTransporte = this.modalidadTransporteSelected;
      this.msvIpatVehiculo.radioAccion = this.radioAccionSelected;
      this.msvIpatVehiculo.matriculadoEn = this.matriculadoEnSelected;

      var html = 'Se va a registrar el vehículo:<br>' +
        'Placa: <b>' + this.msvIpatVehiculo.placa + '</b><br>' +
        'Marca: <b>' + this.marcaSelected + '</b><br>' +
        'Color: <b>' + this.colorSelected + '</b><br>' +
        'Modelo: <b>' + this.msvIpatVehiculo.modelo + '</b><br>' +
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
          this._SvIpatVehiculoService.register(this.msvIpatVehiculo, token).subscribe(
            response => {
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });

                /* let dataVehiculos = {
                  'placa: ': this.msvRegistroIpat.placa,
                  'nacionalidad: ': this.nacionalidadVehiculoSelected,
                  'marca: ': this.marcaSelected,
                  'linea: ': this.lineaSelected,
                  'color: ': this.colorSelected,
                  'modelo: ': this.msvRegistroIpat.modelo,
                  'carroceria: ': this.carroceriaSelected,
                  'clase vehiculo: ': this.claseSelected,
                  'servicio: ': this.servicioSelected,
                  'modalidad transporte: ': this.modalidadTransporteSelected,
                  'capacidad carga(ton): ': this.msvRegistroIpat.ton,
                  'pasajeros: ': this.msvRegistroIpat.pasajeros,
                  'matriculado en: ': this.matriculadoEnSelected,
                  'nombre empresa vehiculo afiliado: ': this.msvRegistroIpat.empresa,
                  'nit empresa: ': this.msvRegistroIpat.nitEmpresa,
                  'inmovilizado: ': this.msvRegistroIpat.inmovilizado,
                  'inmovilizado en: ': this.msvRegistroIpat.inmovilizadoEn,
                  'a disposición de: ': this.msvRegistroIpat.aDisposicionDe,
                  'tarjeta de registro: ': this.msvRegistroIpat.portaTarjetaRegistro,
                  'Nro. tarjeta registro: ': this.msvRegistroIpat.tarjetaRegistro,
                  'organismo transito: ': this.msvRegistroIpat.organismoTransitoTarjetaRegistro,
                  'revision tecnomecanica: ': this.msvRegistroIpat.revisionTecnomecanica,
                  'nro. tecnomecanica: ': this.msvRegistroIpat.numeroTecnoMecanica,
                  'cantidad acompañantes: ': this.msvRegistroIpat.cantidadAcompaniantes,
                  'porta soat: ': this.msvRegistroIpat.portaSoat,
                  'soat: ': this.msvRegistroIpat.soat,
                  'numero poliza: ': this.msvRegistroIpat.numeroPoliza,
                  'aseguradora soat: ': this.msvRegistroIpat.aseguradoraSoat,
                  'fecha vencimiento soat: ': this.msvRegistroIpat.fechaVencimientoSoat,
                  'seguro responsabilidad civil: ': this.msvRegistroIpat.portaSeguroResponsabilidadCivil,
                  'numero seguro resp. civil: ': this.msvRegistroIpat.numeroSeguroResponsabilidadCivil,
                  'aseguradora Seguro Responsabilidad Civil: ': this.msvRegistroIpat.idAseguradoraSeguroResponsabilidadCivil,
                  'idAseguradoraSeguroResponsabilidadCivil: ': this.msvRegistroIpat.idAseguradoraSeguroResponsabilidadCivil,
                  'portaSeguroExtracontractual: ': this.msvRegistroIpat.portaSeguroExtracontractual,
                  'numeroSeguroExtracontractual: ': this.msvRegistroIpat.numeroSeguroExtracontractual,
                  'idAseguradoraSeguroExtracontractual: ': this.msvRegistroIpat.idAseguradoraSeguroExtracontractual,
                  'fechaVencimientoSeguroExtracontractual: ': this.msvRegistroIpat.fechaVencimientoSeguroExtracontractual,
                  'descripcionDanios: ': this.msvRegistroIpat.descripcionDanios,
                  'arrayFallas: ': this.msvRegistroIpat.arrayFallas,
                  'otraFalla: ': this.msvRegistroIpat.otraFalla,
                  'arrayLugaresImpacto: ': this.msvRegistroIpat.arrayLugaresImpacto,
                };
                this.vehiculos.push(dataVehiculos); */

                this.vehiculoIpat = true;
                this.msvIpatVehiculo.placa = '';
                this.marcaSelected = [0];
                this.lineaSelected = [0];
                this.colorSelected = [0];
                this.msvIpatVehiculo.modelo = '';
                this.carroceriaSelected = [0];
                this.claseSelected = [0];
                this.servicioSelected = [0];
                this.radioAccionSelected = [0];
                this.modalidadTransporteSelected = [0];
                this.msvIpatVehiculo.ton = '';
                this.msvIpatVehiculo.pasajeros = '';
                this.msvIpatVehiculo.matriculadoEn = '';
                this.msvIpatVehiculo.empresa = '';
                this.msvIpatVehiculo.nitEmpresa = 0;
                this.msvIpatVehiculo.inmovilizado = '';
                this.msvIpatVehiculo.inmovilizadoEn = '';
                this.msvIpatVehiculo.aDisposicionDe = '';
                this.msvIpatVehiculo.portaTarjetaRegistro = '';
                this.msvIpatVehiculo.revisionTecnomecanica = '';
                this.msvIpatVehiculo.numeroTecnoMecanica = 0;
                this.msvIpatVehiculo.cantidadAcompaniantes = 0;
                this.msvIpatVehiculo.portaSoat = '';
                this.msvIpatVehiculo.soat = 0;
                this.msvIpatVehiculo.numeroPoliza = 0;
                this.msvIpatVehiculo.aseguradoraSoat = '';
                this.msvIpatVehiculo.fechaVencimientoSoat = '';
                this.msvIpatVehiculo.portaSeguroResponsabilidadCivil = '';
                this.msvIpatVehiculo.numeroSeguroResponsabilidadCivil = 0;
                this.msvIpatVehiculo.idAseguradoraSeguroResponsabilidadCivil = '';
                this.msvIpatVehiculo.fechaVencimientoSeguroResponsabilidadCivil = '';
                this.msvIpatVehiculo.portaSeguroExtracontractual = '';
                this.msvIpatVehiculo.numeroSeguroExtracontractual = 0;
                this.msvIpatVehiculo.idAseguradoraSeguroExtracontractual = '';
                this.msvIpatVehiculo.fechaVencimientoSeguroExtracontractual = '';
                this.msvIpatVehiculo.descripcionDanios = '';
                this.msvIpatVehiculo.arrayFallas = '';
                this.msvIpatVehiculo.arrayLugaresImpacto = '';
                this.msvRegistroIpat.idHipotesis = '';
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
          this._SvIpatVehiculoService.register(this.msvIpatVehiculo, token).subscribe(
            response => {
              if (response.status == 'success') {
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                });
                /* let dataVehiculos = {
                  'placa: ': this.msvRegistroIpat.placa,
                  'nacionalidad: ': this.nacionalidadVehiculoSelected,
                  'marca: ': this.marcaSelected,
                  'linea: ': this.lineaSelected,
                  'color: ': this.colorSelected,
                  'modelo: ': this.msvRegistroIpat.modelo,
                  'carroceria: ': this.carroceriaSelected,
                  'clase vehiculo: ': this.claseSelected,
                  'servicio: ': this.servicioSelected,
                  'modalidad transporte: ': this.modalidadTransporteSelected,
                  'capacidad carga(ton): ': this.msvRegistroIpat.ton,
                  'pasajeros: ': this.msvRegistroIpat.pasajeros,
                  'matriculado en: ': this.matriculadoEnSelected,
                  'nombre empresa vehiculo afiliado: ': this.msvRegistroIpat.empresa,
                  'nit empresa: ': this.msvRegistroIpat.nitEmpresa,
                  'inmovilizado: ': this.msvRegistroIpat.inmovilizado,
                  'inmovilizado en: ': this.msvRegistroIpat.inmovilizadoEn,
                  'a disposición de: ': this.msvRegistroIpat.aDisposicionDe,
                  'tarjeta de registro: ': this.msvRegistroIpat.portaTarjetaRegistro,
                  'Nro. tarjeta registro: ': this.msvRegistroIpat.tarjetaRegistro,
                  'organismo transito: ': this.msvRegistroIpat.organismoTransitoTarjetaRegistro,
                  'revision tecnomecanica: ': this.msvRegistroIpat.revisionTecnomecanica,
                  'nro. tecnomecanica: ': this.msvRegistroIpat.numeroTecnoMecanica,
                  'cantidad acompañantes: ': this.msvRegistroIpat.cantidadAcompaniantes,
                  'porta soat: ': this.msvRegistroIpat.portaSoat,
                  'soat: ': this.msvRegistroIpat.soat,
                  'numero poliza: ': this.msvRegistroIpat.numeroPoliza,
                  'aseguradora soat: ': this.msvRegistroIpat.aseguradoraSoat,
                  'fecha vencimiento soat: ': this.msvRegistroIpat.fechaVencimientoSoat,
                  'seguro responsabilidad civil: ': this.msvRegistroIpat.portaSeguroResponsabilidadCivil,
                  'numero seguro resp. civil: ': this.msvRegistroIpat.numeroSeguroResponsabilidadCivil,
                  'aseguradora Seguro Responsabilidad Civil: ': this.msvRegistroIpat.idAseguradoraSeguroResponsabilidadCivil,
                  'idAseguradoraSeguroResponsabilidadCivil: ': this.msvRegistroIpat.idAseguradoraSeguroResponsabilidadCivil,
                  'portaSeguroExtracontractual: ': this.msvRegistroIpat.portaSeguroExtracontractual,
                  'numeroSeguroExtracontractual: ': this.msvRegistroIpat.numeroSeguroExtracontractual,
                  'idAseguradoraSeguroExtracontractual: ': this.msvRegistroIpat.idAseguradoraSeguroExtracontractual,
                  'fechaVencimientoSeguroExtracontractual: ': this.msvRegistroIpat.fechaVencimientoSeguroExtracontractual,
                  'descripcionDanios: ': this.msvRegistroIpat.descripcionDanios,
                  'arrayFallas: ': this.msvRegistroIpat.arrayFallas,
                  'otraFalla: ': this.msvRegistroIpat.otraFalla,
                  'arrayLugaresImpacto: ': this.msvRegistroIpat.arrayLugaresImpacto,
                };
                this.vehiculos.push(dataVehiculos); */
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

  registrarVehiculoEncontrado() {
   /*  let dataVehiculos = {
      'placa: ': this.msvRegistroIpat.placa,
      'nacionalidad: ': this.nacionalidadVehiculoSelected,
      'marca: ': this.marcaSelected,
      'linea: ': this.lineaSelected,
      'color: ': this.colorSelected,
      'modelo: ': this.msvRegistroIpat.modelo,
      'carroceria: ': this.carroceriaSelected,
      'clase vehiculo: ': this.claseSelected,
      'servicio: ': this.servicioSelected,
      'modalidad transporte: ': this.modalidadTransporteSelected,
      'capacidad carga(ton): ': this.msvRegistroIpat.ton,
      'pasajeros: ': this.msvRegistroIpat.pasajeros,
      'matriculado en: ': this.matriculadoEnSelected,
      'nombre empresa vehiculo afiliado: ': this.msvRegistroIpat.empresa,
      'nit empresa: ': this.msvRegistroIpat.nitEmpresa,
      'inmovilizado: ': this.msvRegistroIpat.inmovilizado,
      'inmovilizado en: ': this.msvRegistroIpat.inmovilizadoEn,
      'a disposición de: ': this.msvRegistroIpat.aDisposicionDe,
      'tarjeta de registro: ': this.msvRegistroIpat.portaTarjetaRegistro,
      'Nro. tarjeta registro: ': this.msvRegistroIpat.tarjetaRegistro,
      'organismo transito: ': this.msvRegistroIpat.organismoTransitoTarjetaRegistro,
      'revision tecnomecanica: ': this.msvRegistroIpat.revisionTecnomecanica,
      'nro. tecnomecanica: ': this.msvRegistroIpat.numeroTecnoMecanica,
      'cantidad acompañantes: ': this.msvRegistroIpat.cantidadAcompaniantes,
      'porta soat: ': this.msvRegistroIpat.portaSoat,
      'soat: ': this.msvRegistroIpat.soat,
      'numero poliza: ': this.msvRegistroIpat.numeroPoliza,
      'aseguradora soat: ': this.msvRegistroIpat.aseguradoraSoat,
      'fecha vencimiento soat: ': this.msvRegistroIpat.fechaVencimientoSoat,
      'seguro responsabilidad civil: ': this.msvRegistroIpat.portaSeguroResponsabilidadCivil,
      'numero seguro resp. civil: ': this.msvRegistroIpat.numeroSeguroResponsabilidadCivil,
      'aseguradora Seguro Responsabilidad Civil: ': this.msvRegistroIpat.idAseguradoraSeguroResponsabilidadCivil,
      'idAseguradoraSeguroResponsabilidadCivil: ': this.msvRegistroIpat.idAseguradoraSeguroResponsabilidadCivil,
      'portaSeguroExtracontractual: ': this.msvRegistroIpat.portaSeguroExtracontractual,
      'numeroSeguroExtracontractual: ': this.msvRegistroIpat.numeroSeguroExtracontractual,
      'idAseguradoraSeguroExtracontractual: ': this.msvRegistroIpat.idAseguradoraSeguroExtracontractual,
      'fechaVencimientoSeguroExtracontractual: ': this.msvRegistroIpat.fechaVencimientoSeguroExtracontractual,
      'descripcionDanios: ': this.msvRegistroIpat.descripcionDanios,
      'arrayFallas: ': this.msvRegistroIpat.arrayFallas,
      'otraFalla: ': this.msvRegistroIpat.otraFalla,
      'arrayLugaresImpacto: ': this.msvRegistroIpat.arrayLugaresImpacto,
    };
    this.vehiculos.push(dataVehiculos);
    console.log(this.vehiculos);
    this.vehiculoIpat = true;

    swal({
      title: 'Perfecto!',
      text: 'Vehículo agregado con exito',
      type: 'success',
      confirmButtonText: 'Aceptar'
    }); */
  }

  registrarVictima() {
    let token = this._LoginService.getToken();

    /* if (this.msvRegistroIpat.identificacionVictima == null) {
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
                  'tipo victima: ': this.tipoVictimaSelected,
                  'gravedad victima: ': this.gravedadVictimaSelected,
                  'tipo documento: ': this.tipoIdentificacionVictimaSelected,
                  'identificacion: ': this.msvRegistroIpat.identificacionVictima,
                  'nombres: ': this.msvRegistroIpat.nombresVictima,
                  'apellidos: ': this.msvRegistroIpat.apellidosVictima,
                  'nacionalidad: ': this.nacionalidadVictimaSelected,
                  'fecha nacimiento: ': this.msvRegistroIpat.fechaNacimientoVictima,
                  'sexo: ': this.sexoVictimaSelected,
                  'dirección residencia: ': this.msvRegistroIpat.direccionResidenciaVictima,
                  'ciudad residencia: ': this.ciudadResidenciaVictimaSelected,
                  'telefono: ': this.msvRegistroIpat.telefonoVictima,
                  'placa de vehiculo al que pertenece: ': this.msvRegistroIpat.placaVehiculoVictima,
                  'hospital atencion: ': this.msvRegistroIpat.telefonoVictima,
                  'se practico el examen: ': this.msvRegistroIpat.practicoExamenVictima,
                  'autorizó: ': this.msvRegistroIpat.autorizoVictima,
                  'resultado examen: ': this.msvRegistroIpat.idResultadoExamenVictima,
                  'grado examen: ': this.msvRegistroIpat.idGradoExamenVictima,
                  'sustancias psicoactivas: ': this.msvRegistroIpat.sustanciasPsicoactivasVictima,
                  'cinturon: ': this.msvRegistroIpat.cinturonVictima,
                  'casco: ': this.msvRegistroIpat.cascoVictima,
                  'chaleco: ': this.msvRegistroIpat.chalecoVictima,
                  'descripcion lesiones: ': this.msvRegistroIpat.descripcionLesionVictima,
                };
                this.victimas.push(dataVictimas);
                console.log(this.tipoVictimaSelected);
                if (this.tipoVictimaSelected = 'PASAJERO') {
                  this.contPasajeros += 1;
                  this.msvRegistroIpat.totalPasajeros = this.contPasajeros;
                  console.log(this.contPasajeros);
                } if (this.tipoVictimaSelected = 'PEATON') {
                  this.contPeatones += 1;
                  this.msvRegistroIpat.totalPeatones = this.contPeatones;
                  console.log(this.contPeatones);
                } if (this.tipoVictimaSelected = 'ACOMPAÑANTE') {
                  this.contAcompaniantes += 1;
                  this.msvRegistroIpat.totalAcompaniantes = this.contAcompaniantes;
                  console.log(this.contAcompaniantes);
                }
                if (this.gravedadVictimaSelected = 'HERIDO') {
                  this.contHeridos += 1;
                  this.msvRegistroIpat.totalHeridos = this.contHeridos;
                  console.log(this.contHeridos);
                } if (this.gravedadVictimaSelected = 'MUERTO') {
                  this.contMuertos += 1;
                  this.msvRegistroIpat.totalMuertos = this.contMuertos;
                  console.log(this.contMuertos);
                }

                this.victima = false;
                this.tipoVictimaSelected = [0];
                this.gravedadVictimaSelected = [0];
                this.msvRegistroIpat.identificacionVictima = '';
                this.msvRegistroIpat.tipoIdentificacionVictima = '';
                this.msvRegistroIpat.nombresVictima = '';
                this.msvRegistroIpat.apellidosVictima = '';
                this.nacionalidadVictimaSelected = [0];
                this.msvRegistroIpat.fechaNacimientoVictima = '';
                this.sexoVictimaSelected = [0];
                this.msvRegistroIpat.direccionResidenciaVictima = '';
                this.ciudadResidenciaVictimaSelected = [0];
                this.msvRegistroIpat.telefonoVictima = '';
                this.msvRegistroIpat.idHospitalVictima = '';
                this.msvRegistroIpat.practicoExamenVictima = '';
                this.msvRegistroIpat.autorizoVictima = '';
                this.msvRegistroIpat.idResultadoExamenVictima = '';
                this.msvRegistroIpat.idGradoExamenVictima = '';
                this.msvRegistroIpat.sustanciasPsicoactivasVictima = '';
                this.msvRegistroIpat.cinturonVictima = '';
                this.msvRegistroIpat.cascoVictima = '';
                this.msvRegistroIpat.chalecoVictima = '';
                this.msvRegistroIpat.descripcionLesionVictima = '';
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
                    'tipo victima: ': this.tipoVictimaSelected,
                    'gravedad victima: ': this.gravedadVictimaSelected,
                    'tipo documento: ': this.tipoIdentificacionVictimaSelected,
                    'identificacion: ': this.msvRegistroIpat.identificacionVictima,
                    'nombres: ': this.msvRegistroIpat.nombresVictima,
                    'apellidos: ': this.msvRegistroIpat.apellidosVictima,
                    'nacionalidad: ': this.nacionalidadVictimaSelected,
                    'fecha nacimiento: ': this.msvRegistroIpat.fechaNacimientoVictima,
                    'sexo: ': this.sexoVictimaSelected,
                    'dirección residencia: ': this.msvRegistroIpat.direccionResidenciaVictima,
                    'ciudad residencia: ': this.ciudadResidenciaVictimaSelected,
                    'telefono: ': this.msvRegistroIpat.telefonoVictima,
                    'placa de vehiculo al que pertenece: ': this.msvRegistroIpat.placaVehiculoVictima,
                    'hospital atencion: ': this.msvRegistroIpat.telefonoVictima,
                    'se practico el examen: ': this.msvRegistroIpat.practicoExamenVictima,
                    'autorizó: ': this.msvRegistroIpat.autorizoVictima,
                    'resultado examen: ': this.msvRegistroIpat.idResultadoExamenVictima,
                    'grado examen: ': this.msvRegistroIpat.idGradoExamenVictima,
                    'sustancias psicoactivas: ': this.msvRegistroIpat.sustanciasPsicoactivasVictima,
                    'cinturon: ': this.msvRegistroIpat.cinturonVictima,
                    'casco: ': this.msvRegistroIpat.cascoVictima,
                    'chaleco: ': this.msvRegistroIpat.chalecoVictima,
                    'descripcion lesiones: ': this.msvRegistroIpat.descripcionLesionVictima,
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
    } */
  }

  registrarVictimaEncontrada() {
    /* let dataVictimas = {
      'tipo victima: ': this.tipoVictimaSelected,
      'gravedad victima: ': this.gravedadVictimaSelected,
      'tipo documento: ': this.tipoIdentificacionVictimaSelected,
      'identificacion: ': this.msvRegistroIpat.identificacionVictima,
      'nombres: ': this.msvRegistroIpat.nombresVictima,
      'apellidos: ': this.msvRegistroIpat.apellidosVictima,
      'nacionalidad: ': this.nacionalidadVictimaSelected,
      'fecha nacimiento: ': this.msvRegistroIpat.fechaNacimientoVictima,
      'sexo: ': this.sexoVictimaSelected,
      'dirección residencia: ': this.msvRegistroIpat.direccionResidenciaVictima,
      'ciudad residencia: ': this.ciudadResidenciaVictimaSelected,
      'telefono: ': this.msvRegistroIpat.telefonoVictima,
      'placa de vehiculo al que pertenece: ': this.msvRegistroIpat.placaVehiculoVictima,
      'hospital atencion: ': this.msvRegistroIpat.telefonoVictima,
      'se practico el examen: ': this.msvRegistroIpat.practicoExamenVictima,
      'autorizó: ': this.msvRegistroIpat.autorizoVictima,
      'resultado examen: ': this.msvRegistroIpat.idResultadoExamenVictima,
      'grado examen: ': this.msvRegistroIpat.idGradoExamenVictima,
      'sustancias psicoactivas: ': this.msvRegistroIpat.sustanciasPsicoactivasVictima,
      'cinturon: ': this.msvRegistroIpat.cinturonVictima,
      'casco: ': this.msvRegistroIpat.cascoVictima,
      'chaleco: ': this.msvRegistroIpat.chalecoVictima,
      'descripcion lesiones: ': this.msvRegistroIpat.descripcionLesionVictima,
    };
    this.victimas.push(dataVictimas);
    console.log(this.tipoVictimaSelected);
    if (this.tipoVictimaSelected = 'PASAJERO') {
      this.contPasajeros += 1;
      this.msvRegistroIpat.totalPasajeros = this.contPasajeros;
      console.log(this.contPasajeros);
    } if (this.tipoVictimaSelected = 'PEATON') {
      this.contPeatones += 1;
      this.msvRegistroIpat.totalPeatones = this.contPeatones;
      console.log(this.contPeatones);
    } if (this.tipoVictimaSelected = 'ACOMPAÑANTE') {
      this.contAcompaniantes += 1;
      this.msvRegistroIpat.totalAcompaniantes = this.contAcompaniantes;
      console.log(this.contAcompaniantes);
    }
    if (this.gravedadVictimaSelected = 'HERIDO') {
      this.contHeridos += 1;
      this.msvRegistroIpat.totalHeridos = this.contHeridos;
      console.log(this.contHeridos);
    } if (this.gravedadVictimaSelected = 'MUERTO') {
      this.contMuertos += 1;
      this.msvRegistroIpat.totalMuertos = this.contMuertos;
      console.log(this.contMuertos);
    }

    swal({
      title: 'Perfecto!',
      text: 'Victima agregada con éxito',
      type: 'success',
      confirmButtonText: 'Aceptar'
    }); */
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
