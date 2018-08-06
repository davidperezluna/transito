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
public respuesta;
public consecutivo: any = null;
public agentesTransito: any;
public agenteTransitoSelected: any;
public municipios: any;
public municipioSelected: any;
public funcionario: any;
public patios: any;
public patioSelected: any;
public gruas: any;
public gruaSelected: any;
public funcionarioReady = false;
public sedeOperativaReady = false;
public validado = false;
public placa: any;
public identificacion: any;
public vehiculo: any;
public municipioId: any;
public ciudadano: any;
public propietariosVehiculo: any;
public formCiudadano = false;
public inmovilizacionForm = false;
public tipoIdentificacionSelected: any;
public tiposIdentificacion: any;
public municipioNacimientoSelected: any;
public isCiudadano = false;
public isEmpresa = false;

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
  ){}

  ngOnInit() {
   this.placa = {
     'placa' : this.placa,
   }; 
   this.identificacion = {
     'numeroIdentificacion' : this.identificacion,
   }; 
    this.comparendo = new Comparendo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.inmovilizacion = new Inmovilizacion(null, null, null, null, null, null);

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
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._loginService.getToken();
    this.comparendo.municipioId = this.municipioSelected;
    this.comparendo.vehiculoId = this.vehiculo.id;
    this.comparendo.ciudadanoId = this.ciudadano.id;
    
		this._ComparendoService.register(this.comparendo,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
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
          this.funcionarioReady = true;
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
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.validado = true;
          this.consecutivo = response.data;
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

  clickOnmovilizacion(){
    if (this.inmovilizacionForm) {
      this.inmovilizacionForm = false;
    }else{
      this.inmovilizacionForm = true;
    }
  }
  
  onKeyIdentificacion(){
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
  })
    this.formCiudadano = true;
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

}