import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VhloLimitacionService } from '../../../../../services/vhloLimitacion.service';
import { VhloVehiculoService } from '../../../../../services/vhloVehiculo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  providers: [DatePipe]
})

export class DeleteComponent implements OnInit {
  public errorMessage;

  public table: any = null;
  
  public limitaciones: any;
  public limitacion: any;

  public formIndex = false;
  public formShow = false;

  public placa: any;
  public vehiculo: any;

  constructor(
    private _VehiculoLimitacionService: VhloLimitacionService,
    private _VehiculoService: VhloVehiculoService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() { }

  ready(isCreado: any) {
    if (isCreado) {
      this.formIndex = false;
      this.formShow = false;
      this.ngOnInit();
    }
  }

  onInitTable() {
    if (this.table) {
      this.table.destroy();
    }

    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
  }

  onSearchByPlaca() {
    swal({
      title: 'Buscando vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let datos = {
      'numero': this.placa,
    };

    this._VehiculoService.searchByPlaca(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.vehiculo = response.data;

          this._VehiculoLimitacionService.searchByPlaca({ 'numero': this.placa }, token).subscribe(
            response => {
              if (response.code == 200) {
                this.limitaciones = response.data;
                this.formIndex = true;
                this.formShow = false;

                let timeoutId = setTimeout(() => {
                  this.onInitTable();
                }, 100);
                
                swal.close();
              } else {
                this.limitaciones = null;

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
        } else {
          this.vehiculo = null;

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
      }
    );
  }

  onDelete(limitacion:any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Se levantar la limitación!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();
        
        this._VehiculoLimitacionService.delete({ 'id': limitacion.id }, token).subscribe(
          response => {
            if (response.code == 200) {
              swal({
                title: 'Perfecto!',
                text: response.message,
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
    
              this.ready(true);
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
          }
        );
      }
    });
  }

  onCancelar() {
    this.formShow = false;
  }

  onShow(limitacion: any): void {
    this.limitacion = limitacion;
    this.formIndex = false;
    this.formShow = true;
  }

}