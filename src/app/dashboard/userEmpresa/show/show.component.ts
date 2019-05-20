import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaRepresentanteService } from '../../../services/userEmpresaRepresentante.service';
import { UserEmpresaSucursalService } from '../../../services/userEmpresaSucursal.service';
import { LoginService } from '../../../services/login.service';


import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'sucursal-show',
  templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() empresa: any = null;
  public errorMessage;
  
  public sucursales: any = null;
  public sucursal: any = null;
  public representantes: any = null;
  public representante: any = null;

  public municipio: any;
  public municipioSelected: any;
  public tipoSociedadSelected: any;

  public table: any;
  public formNewRepresentante: any;
  public formEditRepresentante: any;
  public formNewSucursal: any;
  public formEditSucursal: any;

  constructor(
    private _RepresentanteService: UserEmpresaRepresentanteService,
    private _SucursalService: UserEmpresaSucursalService,
    private _LoginService: LoginService,

  ) { }

  ngOnInit() {
    let token = this._LoginService.getToken();

    this._RepresentanteService.index({ 'idEmpresa': this.empresa.id }, token).subscribe(
      response => {
        if (response.status == "success") {
          this.representantes = response.data;
        } else {
          this.representantes = null;
        }
      },
    );

    this._SucursalService.getSucursalEmpresa(this.empresa.id, token).subscribe(
      response => {
        if (response.status == "success") {
          this.sucursales = response.data;
        } else {
          this.sucursales = null;
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

    this.onInitForms();
  }

  onInitForms(){
    this.formNewRepresentante = false;
    this.formEditRepresentante = false;
    this.formNewSucursal = false;
    this.formEditSucursal = false;

    return true;
  }

  onCancelar() {
    this.ready.emit(true);
  }

  onReady(respuesta: any) {
    this.ngOnInit();
  }

  onNewSucursal() {
    this.onInitForms();
    this.formNewSucursal = true;
  }

  onEditSucursal(sucursal: any) {
    this.sucursal = sucursal;

    this.onInitForms();
    this.formEditSucursal = true;
  }

  onNewRepresentante() {
    this.onInitForms();
    this.formNewRepresentante = true;
  }

  onEditRepresentante(representante: any) {
    this.representante = representante;

    this.onInitForms();
    this.formEditRepresentante = true;
  }

  onDeleteSucursal(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();

        this._SucursalService.delete({ 'id': id }, token).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });

            this.ngOnInit();
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
    });
  }

  onDeleteRepresentante(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();

        this._RepresentanteService.delete({ 'id': id }, token).subscribe(
          response => {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });

            this.ngOnInit();
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
    });
  }
}