import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { RnmaPreregistro} from '../rnmaPreregistro.modelo';
import { VhloMaquinariaService } from '../../../services/vhloMaquinaria.service';
import { VhloCfgColorService } from '../../../services/vhloCfgColor.service';
import { VhloCfgCarroceriaService } from '../../../services/vhloCfgCarroceria.service';
import { VhloCfgLineaService } from '../../../services/vhloCfgLinea.service';
import { VhloCfgCombustibleService } from '../../../services/vhloCfgCombustible.service';
import { VhloCfgMarcaService } from '../../../services/vhloCfgMarca.service';
import { VhloCfgTipoMaquinariaService } from '../../../services/vhloCfgTipoMaquinaria.service';
import { VhloCfgTipoRodajeService } from '../../../services/vhloCfgTipoRodaje.service';
import { VhloCfgTipoCabinaService } from '../../../services/vhloCfgTipoCabina.service';
import { VhloCfgOrigenRegistroService } from '../../../services/vhloCfgOrigenRegistro.service';
import { VhloCfgEmpresaGpsService } from '../../../services/vhloCfgEmpresaGps.service';
import { VhloCfgCondicionIngresoService } from '../../../services/vhloCfgCondicionIngreso.service';
import { VhloCfgSubpartidaArancelariaService } from '../../../services/vhloCfgSubpartidaArancelaria.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-rnmaRegistroMaquinaria',
  templateUrl: './new.component.html'
})

export class NewRegistroMaquinariaComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public registroMaquinaria: RnmaPreregistro;
  public errorMessage:any;

  public municipios:any;
  public habilitar:any;
  public colores:any;
  public marcas:any;
  public lineas:any = null;
  public carrocerias:any;
  public combustibles:any;
  public servicios:any;
  public radicado=false;
  public origenesRegistro:any;
  public condicionesIngreso:any;
  public tiposMaquinaria:any;
  public tiposRodaje:any;
  public tiposCabina:any;
  public clasesMaquinaria:any = null;
  public empresasGps:any;
  public subpartidasArancelarias:any;
  public persona:any='empresa';
  public btnRadicado:string = "Preregistro para matricula inicial";

  public tiposMatricula = [
    {'value':'RADICADO','label':"Radicado de cuenta"},
    {'value':'MATRICULA','label':"Matricula inicial"},
    {'value':'IMPORTACION','label':"Importación temporal"},
    {'value':'CARPETA','label':"Cargue de carpeta"}
  ];

constructor(
  private _RegistroMaquinariaService: VhloMaquinariaService,
  private _LoginService: LoginService,
  private _LineaService: VhloCfgLineaService,
  private _ColorService: VhloCfgColorService,
  private _TipoMaquinariaService: VhloCfgTipoMaquinariaService,
  private _TipoRodajeService: VhloCfgTipoRodajeService,
  private _TipoCabinaService: VhloCfgTipoCabinaService,
  private _CondicionIngresoService: VhloCfgCondicionIngresoService,
  private _MarcaService: VhloCfgMarcaService,
  private _CarroceriaService: VhloCfgCarroceriaService,
  private _CombustibleService: VhloCfgCombustibleService,
  private _OrigenRegistroService: VhloCfgOrigenRegistroService,
  private _EmpresaGpsService: VhloCfgEmpresaGpsService,
  private _SubpartidaArancelariaService: VhloCfgSubpartidaArancelariaService,
  private _FuncionarioService: PnalFuncionarioService
){}

ngOnInit() {
  this.registroMaquinaria = new RnmaPreregistro(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  this._ColorService.select().subscribe(
    response => {
      this.colores = response;
    },  
    error => {
      this.errorMessage = <any>error;
  
      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

  this._MarcaService.select().subscribe(
    response => {
      this.marcas = response;
    }, 
    error => { 
      this.errorMessage = <any>error;

      if(this.errorMessage != null){
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

      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

  this._CombustibleService.select().subscribe(
    response => {
      this.combustibles = response;
    },  
    error => {
      this.errorMessage = <any>error;

      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );
    
  this._OrigenRegistroService.select().subscribe(
    response => {
      this.origenesRegistro = response;
    }, 
    error => { 
      this.errorMessage = <any>error;

      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

  this._CondicionIngresoService.select().subscribe(
    response => {
      this.condicionesIngreso = response;
    },
    error => {
      this.errorMessage = <any>error;

      if (this.errorMessage != null) {
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

    this._EmpresaGpsService.select().subscribe(
      response => {
        this.empresasGps = response;     
      }, 
      error => { 
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoMaquinariaService.select().subscribe(
      response => {
        this.tiposMaquinaria = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoRodajeService.select().subscribe(
      response => {
        this.tiposRodaje = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoCabinaService.select().subscribe(
      response => {
        this.tiposCabina = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._SubpartidaArancelariaService.select().subscribe(
      response => {
        this.subpartidasArancelarias = response;
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
      this.ready.emit(true);
  }

  onEnviar(){
    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.registroMaquinaria.idOrganismoTransito = response.data.organismoTransito.id;
        }else{
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

    var html = 'los datos de la maquinaria a ingresar son:<br>' +
      'Placa: <b>' + this.registroMaquinaria.placa + '</b><br>' +
      'Condicon ingreso: <b>' + this.registroMaquinaria.idCondicionIngreso + '</b><br>' +
      'Motor: <b>' + this.registroMaquinaria.motor + '</b><br>' +
      'Serie: <b>' + this.registroMaquinaria.serie + '</b><br>' +
      'Chasis: <b>' + this.registroMaquinaria.chasis + '</b><br>' +
      'Fecha ingreso: <b>' + this.registroMaquinaria.fechaIngreso + '</b><br>';

    swal({
      title: 'Preregistro de maquinaria!',
      type: 'warning',
      html: html,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Crear!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i> No crear',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
      if (result.value) {
        this._RegistroMaquinariaService.register(this.registroMaquinaria, token).subscribe(
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
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {

      }
    });
  }

  onChangedMarca(e){
    if (e) {
      let token = this._LoginService.getToken()
      
      this._LineaService.selectByMarca({'idMarca': e}, token).subscribe(
        response => { 
          this.lineas = response;
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

  onChangedTipoMaquinaria(e) {
    if (e) {
      let token = this._LoginService.getToken()
      
      /*this._ClaseMaquinariaService.searchByTipoMaquinariaSelect({'idTipoMaquinaria': e}, token).subscribe(
        response => {
          this.clasesMaquinaria = response;
        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );*/
    }
  }

  onRadicado(){
    if(this.radicado) {
      this.radicado = false; 
      this.btnRadicado = "Preregistro para matricula inicial";
      console.log(this.btnRadicado);
    }else{
      this.btnRadicado = "Preregistro para radicado de cuenta";
      console.log(this.btnRadicado);
      this.radicado = true; 
    }
  }
}