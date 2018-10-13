import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { MsvRegistroIpatService } from '../../../services/msvRegistroIpat.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { MsvConsecutivoService } from '../../../services/msvConsecutivo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { MunicipioService } from '../../../services/municipio.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { CfgGravedadService } from '../../../services/cfgGravedad.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { MsvRegistroIpat } from '../msvRegistroIpat.modelo';

import { Ciudadano } from '../../ciudadano/ciudadano.modelo';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { CfgClaseAccidenteService } from '../../../services/cfgClaseAccidente.service';
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
import { EmpresaService } from "../../../services/empresa.service";
import { SvCfgFallaService } from "../../../services/svCfgFalla.service";
import { SvCfgLugarImpactoService } from "../../../services/svCfgLugarImpacto.service";
import { ClaseService } from "../../../services/clase.service";
import { ServicioService } from "../../../services/servicio.service";
import { SvCfgHipotesisService } from "../../../services/svCfgHipotesis.service";
import { SvCfgTipoVictimaService } from "../../../services/svCfgTipoVictima.service";
import { SvCfgGravedadVictimaService } from "../../../services/svCfgGravedadVictima.service";

import swal from 'sweetalert2';
import { Utils } from 'ng2-bootstrap';
import { SvCfgAseguradoraService } from '../../../services/svCfgAseguradora.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public msvRegistroIpat: MsvRegistroIpat;
  public sedeOperativa: any;
  public errorMessage;

  public nroIpat: any;
  public consecutivo: any = null;
  public ipatEncontrado: any = null;
  public ipats = false;
  public identity: any;

  public claseAccidente: any;
  public choqueCon: any;

  public gravedades: any;
  public clasesAccidente: any;
  public choquesCon: any;
  public objetosFijos: any;
  public sedesOperativas: any;
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
  public resultadosExamen: any;
  public gradosExamen: any;
  public licenciasConduccion: any;
  public hospitales: any;
  public empresas: any;
  public lugaresImpacto: any;
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

  public gravedadSelected: any = null;
  public claseAccidenteSelected: any = null;
  public choqueConSelected: any = null;
  public objetoFijoSelected: any = null;
  public sedeOperativaSelected: any = null;
  public aseguradoraSelected: any = null;
  public areaSelected: any = null;
  public sectorSelected: any = null;
  public zonaSelected: any = null;
  public disenioSelected: any = null;
  public estadoTiempoSelected: any = null;
  public geometriaSelected: any = null;
  public utilizacionSelected: any = null;
  public calzadaCarrilSelected: any = null;
  public fallaSelected: any = null;
  public materialSelected: any = null;
  public estadoViaSelected: any = null;
  public condicionViaSelected: any = null;
  public iluminacionSelected: any = null;
  public estadoIluminacionSelected: any = null;
  public visualSelected: any = null;
  public visualDisminuidaSelected: any = null;
  public resultadoExamenSelected: any = null;
  public gradoExamenSelected: any = null;
  public licenciaConduccionSelected: any = null;
  public lugarImpactoSelected: any = null;
  public hipotesisSelected: any = null;
  public tipoVictimaSelected: any = null;
  public gravedadVictimaSelected: any = null;


  public resumen = {}; public datos = {
  }

  public datosVehiculo = {
    'vehiculos': [],
    'cDemandante': [],
    'cDemandado': [],
  }

  constructor(
    private _MsvRegistroIpatService: MsvRegistroIpatService,
    private _FuncionarioService: MpersonalFuncionarioService,
    private _MsvConsecutivoService: MsvConsecutivoService,
    private _CiudadanoService: CiudadanoService,
    private _loginService: LoginService,
    private _MunicipioService: MunicipioService,
    private _DepartamentoService: DepartamentoService,
    private _GravedadService: CfgGravedadService,
    private _ClaseAccidenteService: CfgClaseAccidenteService,
    private _ChoqueConService: CfgChoqueConService,
    private _ObjetoFijoService: CfgObjetoFijoService,

    private _SedeOperativaService: SedeOperativaService,
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
    private _ResultadoExamenService: SvCfgResultadoExamenService,
    private _GradoExamenService: SvCfgGradoExamenService,
    private _HospitalService: SvCfgHospitalService,
    private _EmpresaService: EmpresaService,
    private _FallaService: SvCfgFallaService,
    private _LugarImpactoService: SvCfgLugarImpactoService,
    private _ClaseService: ClaseService,
    private _ServicioService: ServicioService,
    private _HipotesisService: SvCfgHipotesisService,
    private _TipoVictimaService: SvCfgTipoVictimaService,
    private _GravedadVictimaService: SvCfgGravedadVictimaService,

  ) { }

  ngOnInit() {
    this.msvRegistroIpat = new MsvRegistroIpat(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null, null, null,null, null, null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    
  }

  onCancelar() {
    this.ready.emit(true);
  }
  enviarTramite() {
    let token = this._loginService.getToken();

    let data =[
      { 'datosLimitacion': this.msvRegistroIpat },
      { 'vehiculosLimitacionArray': this.datosVehiculo },
    ];
    
    this._MsvRegistroIpatService.register(data, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: 'Error!',
            text: 'La limitacion a la propiedad ' + this.consecutivo + ', con la fecha: ' + this.msvRegistroIpat.fechaAccidente ,
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
    })

    let token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();
    let datos = {
      'nroIpat': this.nroIpat,
      'identificacionUsuario': this.identity.identificacion,
    };
    this._MsvConsecutivoService.showBySedeConsecutivo(token, datos).subscribe(
      response => {
        if (response.status == 'success') {
          this.consecutivo = response.data;
          this._GravedadService.getGravedadSelect().subscribe(
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
          this._ClaseAccidenteService.getClaseAccidenteSelect().subscribe(
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
          this._EstadoTiempoService.getEstadoTiempoSelect().subscribe(
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
          this._EmpresaService.getEmpresaSelect().subscribe(
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
          /*this._.().subscribe(
            response => {
              this. = response;
            },
            error => {
              this.errorMessage = <any>error;
      
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
          this._.().subscribe(
            response => {
              this. = response;
            },
            error => {
              this.errorMessage = <any>error;
      
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );*/
          this._ClaseService.getClaseSelect().subscribe(
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
    this._FuncionarioService.searchLogin(this.identity, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.sedeOperativa = response.data.sedeOperativa;
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
  }


  delete(vehiculo: any): void {
    this.datosVehiculo.vehiculos = this.datosVehiculo.vehiculos.filter(h => h !== vehiculo);
    if (this.datosVehiculo.vehiculos.length === 0) {
      this.ipats = false;
    }
  }

  btnNewVehiculo() {
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
  }
  
}
