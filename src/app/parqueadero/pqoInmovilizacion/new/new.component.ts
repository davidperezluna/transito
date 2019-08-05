import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PqoInmovilizacion } from '../pqoInmovilizacion.modelo';
import { PqoInmovilizacionService } from '../../../services/pqoInmovilizacion.service';
import { PqoCfgPatioService } from '../../../services/pqoCfgPatio.service';
import { PqoCfgGruaService } from '../../../services/pqoCfgGrua.service';
import { VhloCfgMarcaService } from '../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../services/vhloCfgClase.service';
import { VhloCfgColorService } from '../../../services/vhloCfgColor.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public inmovilizacion: PqoInmovilizacion;
  public date: any;
  public errorMessage;
  public clases: any;
  public marcas: any;
  public lineas: any;
  public colores: any;
  public gruas: any;
  public patios: any;
  public ciudadano: any;
  public patio: any;

constructor(
  private _InmovilizacionService: PqoInmovilizacionService,
  private _PqoCfgPatioService: PqoCfgPatioService,
  private _PqoCfgGruaService: PqoCfgGruaService,
  private _MarcaService: VhloCfgMarcaService,
  private _LineaService: VhloCfgLineaService,
  private _ClaseService: VhloCfgClaseService,
  private _ColorService: VhloCfgColorService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    swal({
      title: 'Cargando Datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.inmovilizacion = new PqoInmovilizacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    
    this.date = new Date();

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    let datos = {
      'identificacion': identity.identificacion
    }

    this._PqoCfgPatioService.searchByCiudadano(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.patio = response.data.patio;

          this.inmovilizacion.idPatio = this.patio.id;

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

          swal.close();
        } else {
          swal({
            title: 'Error!',
            text: 'Su usuario no tiene autorización para realizar inmovilización!',
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

  onChangedMarca(e) {
    if (e) {
      let token = this._LoginService.getToken()
      this._LineaService.selectByMarca({ 'idMarca': e }, token).subscribe(
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
    }
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    if (this.inmovilizacion.placa || this.inmovilizacion.numeroComparendo) {
      this._InmovilizacionService.register(this.inmovilizacion, token).subscribe(
        response => {
          if(response.code == 200){
            this.ready.emit(true);
            swal({
              title: 'Perfecto!',
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });
          }else{
            swal({
              title: 'Error!',
              text: response.message,
              type: response.status,
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
        }
      ); 
    }else{
      swal({
        title: 'Error!',
        text: 'Debe diligenciar el No. de placa y/o el No. de comparendo',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}