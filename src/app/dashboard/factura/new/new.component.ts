import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Factura } from '../factura.modelo';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import { ModuloService } from '../../../services/modulo.service';
import { TramitePrecioService } from '../../../services/tramitePrecio.service';
import { DatePipe, CurrencyPipe  } from '@angular/common';
import { CfgValorVehiculoService } from '../../../services/cfgValorVehiculo.service';
import swal from 'sweetalert2';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-new-factura',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})

export class NewComponent  implements OnInit {
@Output() ready = new EventEmitter<any>();
public factura: Factura;
public errorMessage;
public respuesta;
public vehiculos: any;
public ciudadanos: any;
public organismosTransito: any;
public vehiculoSelected: any; 
public funcionario: boolean = false;
public solicitanteSelected: any;
public apoderadoSelected: any;
public date:any;
public sedeOperativa:any;
public tiposIdentificacion:any;
public isErrorCiudadano: any;
public isExistCiudadano:boolean=false;
public isErrorVehiculo: any;
public isExistVehiculo:boolean=false;
public propietario:boolean=false;
public identificacion:any;
public tipoIdentificacionSelected:any;
public ciudadano:any;
public newCiudadanoForm:any= false;
public msj:any;
public vehiculo:any;
public modulo:any = null;
public modulos:any;
public vehiculoCriterio:any; 
public tramitesPrecio:any; 
public tramitePrecio:any; 
public tramitePrecioSelected:any; 
public tramitesValor:any=[]; 
public vendedores:any=0; 
public propietariosVehiculo:any=[]; 
public propietariosVehiculoRetefuente:any=[]; 
public searchByIdentificacionForm=false;
public isEmpresaForm=false;
public datos:any=[];
public valorVehiculoId:any;
public valorRetefuente:any;
public valorRetefuenteUnitario:any=0;
public formNew:any =  false;

constructor(
  private _FacturaService: FacturaService,
  private _TramitePrecioService: TramitePrecioService,
  private _UserCiudadanoService: UserCiudadanoService,
  private _LoginService: LoginService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _ciudadanoVehiculoService: CiudadanoVehiculoService,
  private _ModuloService: ModuloService,
  private _CfgValorVehiculoService: CfgValorVehiculoService,
  ){}

  ngOnInit() {   
    swal({
      title: 'Cargando Datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.sedeOperativa = response.data.sedeOperativa;
          this.funcionario = true;
          this.factura.numero = datePiper.transform(this.date, 'hmss');
          this.factura.fechaCreacion = datePiper.transform(this.date, 'yyyy-MM-dd');
          this.factura.sedeOperativaId = this.sedeOperativa.id;

          this.formNew = true;
        }else{
          swal({
            title: 'Error!',
            text: 'Su usuario no tiene autorización para realizar facturación!',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });

          this.formNew = false;
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      });

    this._ModuloService.getModuloSelect().subscribe(
      response => {
        this.modulos = response;
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

    this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tiposIdentificacion = response;
        swal.close();
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this.date = new Date();

    this.factura = new Factura(null, null,null, null, null, null, null, null, null, null);
   
    var datePiper = new DatePipe(this.date);
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    swal({
      title: 'Registrando factura!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();
    
    let datos = {
      'factura': this.factura,
      'tramitesValor': this.tramitesValor,
      'valorVehiculoId': this.valorVehiculoId,
      'propietarios': this.propietariosVehiculoRetefuente,
      'retencion': this.valorRetefuenteUnitario,
      'idTipoRecaudo': 1,
    }
 
    this._FacturaService.register(datos, token).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.status == 'success') {
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
            text: 'El factura ' + this.factura.numero + ' ya se encuentra registrada',
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

  onSearchCiudadano() {
    swal({
      title: 'Buscando ciudadano!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let datos = {
      'identificacion':this.identificacion,
      'tipoIdentificacion': this.tipoIdentificacionSelected,
    }
    
    this._UserCiudadanoService.searchByIdentificacion(datos,token).subscribe(
      response => {
        this.respuesta = response;
        if(this.respuesta.status == 'error'){
          this.ciudadano = this.respuesta.datos;
          this.factura.ciudadanoId = this.ciudadano.id;
          this.isExistCiudadano = true;
          this.isErrorCiudadano = false;

          this.newCiudadanoForm = false;
        }else{
          this.isErrorCiudadano = true;
          this.isExistCiudadano = false;

          this.newCiudadanoForm = true;
        }

        swal.close();
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
    });
  }

  onSearchVehiculo(){
    swal({
      title: 'Buscando vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token,this.vehiculoCriterio).subscribe(
      response => { 
        
        if (response.code == 200 ) {
          this.msj = 'vehiculo encontrado';
          this.isErrorVehiculo = false;
          this.isExistVehiculo = true;
          this.vehiculo=response.data[0].vehiculo;
          this.factura.vehiculoId = this.vehiculo.id;
          this.propietario = true;
          swal.close();
        }
        if (response.code == 400 ) {
          this.msj = 'vehiculo encontrado';
          this.isErrorVehiculo = false;
          this.isExistVehiculo = true;
          this.vehiculo=response.data;
          this.factura.vehiculoId = this.vehiculo.id;
          swal.close();
          swal({
            title: 'Sin propietarios!',
            text: 'Necesita facturar matricula inicial para este vehiculo',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
        
        if(response.code == 401){
          this.msj = 'vehiculo no se encuentra en la base de datos';
          this.isErrorVehiculo = true;
          this.isExistVehiculo = false;
          swal.close();
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

  onChangedModulo(e){
    swal({
      title: 'Cargando trámites disponibles!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (e) {
      let token = this._LoginService.getToken();
      this._ModuloService.showModulo(token, this.factura.idModulo).subscribe(
        response => {
          this.modulo = response.data;
          swal.close();
        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );

      this._TramitePrecioService.getTramitePrecioPorModuloSelect(this.factura.idModulo).subscribe(
        response => {
          this.tramitesPrecio = response;
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

  addNewTramite(){
    swal({
      title: 'Agregando trámite!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken(); 

    if (this.modulo.abreviatura == 'RNA') {
      if (!this.propietario) {
        this._TramitePrecioService.showTramitePrecio(token, this.tramitePrecioSelected).subscribe(
          response => {
            this.tramitePrecio = response.data;
            if (this.tramitePrecio.tramite.formulario == 'rna-matriculainicial') {
              this.factura.valorBruto = this.factura.valorBruto + parseInt(this.tramitePrecio.valorTotal);
              this.tramitesValor.push(
                {
                  'idTramitePrecio': this.tramitePrecio.id,
                  'nombre': this.tramitePrecio.nombre,
                  'valor': this.tramitePrecio.valorTotal
                }
              );

              swal.close();
            } else {
              swal({
                title: 'Sin propietarios!',
                text: 'Necesita facturar matricula inicial para este vehiculo',
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
      } else {
        
        this._TramitePrecioService.showTramitePrecio(token, this.tramitePrecioSelected).subscribe(
          response => {
            this.tramitePrecio = response.data;
            if (this.tramitePrecio.tramite.id == 6) {
              
              this.factura.valorBruto = this.factura.valorBruto + parseInt(this.tramitePrecio.valorTotal);
              this.tramitesValor.push(
                {
                  'idTramitePrecio': this.tramitePrecio.id,
                  'nombre': this.tramitePrecio.nombre,
                  'valor': this.tramitePrecio.valorTotal
                }
              )

              swal({
                title: 'Buscando Propietarios!',
                text: 'Solo tardara unos segundos por favor espere.',
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
              
              this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token, this.vehiculoCriterio).subscribe(
                response => {
                  let datos = {
                    'linea': this.vehiculo.linea.id,
                    'clase': this.vehiculo.clase.id,
                    'modelo': this.vehiculo.modelo
                  }

                  this._CfgValorVehiculoService.getCfgValorVehiculoVehiculo(datos, token).subscribe(
                    valorVehiculo => {
                      if (valorVehiculo.datos != null) {
                        this.valorRetefuente = parseInt(valorVehiculo.datos.valor) * 0.01;
                        this.valorVehiculoId = valorVehiculo.datos.id;
                        this.propietariosVehiculo = response.data;
                        response.data.forEach(element => {
                          if (element.ciudadano) {
                            this.searchByIdentificacionForm = true;
                          }
                          if (element.empresa) { 
                            this.isEmpresaForm = true;
                          }
                        });
                        swal.close();
                      }else{
                        swal.close();
                        swal({
                          title: 'Sin valor!',
                          text: 'Necesita ingresar el valor del vehiculo',
                          type: 'error',
                          confirmButtonText: 'Aceptar'
                        })
                        return(0);
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
                  error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                });
            } else {
              this.factura.valorBruto = this.factura.valorBruto + parseInt(this.tramitePrecio.valorTotal);
              this.tramitesValor.push(
                {
                  'idTramitePrecio': this.tramitePrecio.id,
                  'nombre': this.tramitePrecio.nombre,
                  'valor': this.tramitePrecio.valorTotal
                }
              )
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
    } else {
      this._TramitePrecioService.showTramitePrecio(token, this.tramitePrecioSelected).subscribe(
        response => {
          this.tramitePrecio = response.data;
          this.factura.valorBruto = this.factura.valorBruto + parseInt(this.tramitePrecio.valorTotal);
          this.tramitesValor.push(
            {
              'idTramitePrecio': this.tramitePrecio.id,
              'nombre': this.tramitePrecio.nombre,
              'valor': this.tramitePrecio.valorTotal
            }
          )
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
  
  deleteTramiteValor(tramiteValor){
    this.factura.valorBruto = this.factura.valorBruto - parseInt(tramiteValor.valor);
    this.tramitesValor = this.tramitesValor.filter(h => h !== tramiteValor);
  }

  // btnRetefunete(){
  //   let token = this._LoginService.getToken();
  //   this._TramitePrecioService.showTramitePrecio(token,this.tramitePrecioSelected).subscribe(
  //     response => {
  //       this.tramitePrecio = response.data;
  //       this.factura.valorBruto = this.factura.valorBruto + parseInt(this.tramitePrecio.valorTotal); 
  //         this.tramitesValor.push(
  //           {
  //             'nombre':this.tramitePrecio.nombre,
  //             'valor':this.tramitePrecio.valorTotal
  //           }
  //         )
  //       error => {
  //         this.errorMessage = <any>error;
  //         if (this.errorMessage != null) {
  //           console.log(this.errorMessage);
  //           alert("Error en la petición");
  //         }
  //       }
  //     });    
  // }

  onVendedorSelect(eve: any,propietarioVehiculo:any){
    if (eve.target.checked) {
      this.propietariosVehiculoRetefuente.push(propietarioVehiculo);
      this.vendedores = this.vendedores + 1;
    }else{
      this.vendedores = this.vendedores - 1;
      this.propietariosVehiculoRetefuente =  this.propietariosVehiculoRetefuente.filter(h => h !== propietarioVehiculo);
    }
    console.log(this.propietariosVehiculoRetefuente);
    this.valorRetefuenteUnitario = this.valorRetefuente / this.vendedores;
  }

  onImprimir(){
    let token = this._LoginService.getToken();
    let datos = {
      'factura':this.factura,
      'tramitesValor': this.tramitesValor,
      'valorVehiculoId': this.valorVehiculoId,
      'propietarios': this.propietariosVehiculoRetefuente,
      'retencion':this.valorRetefuenteUnitario
    }
    this._FacturaService.imprimir(datos,token).subscribe(
      response => {
          window.open(environment.uploadUrl+response);
      error => {
              this.errorMessage = <any>error;
          
              if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert("Error en la petición");
              }
          }
  }); 

  }
  onCancelarTraspaso(){
    this.searchByIdentificacionForm = false;
    this.isEmpresaForm = false;
  }

  redyCidadano(ready:any){
    this.newCiudadanoForm = false;
  }
  

}