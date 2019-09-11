import { Component, OnInit } from '@angular/core';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { VhloCfgPlacaService } from '../../../../../services/vhloCfgPlaca.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-delivered-vhloplacasede',
  templateUrl: './delivered.component.html'
})
export class DeliveredComponent implements OnInit {
  public errorMessage;

  public funcionario: any;
  public placas: any;

  public table: any;

  constructor(
    private _FuncionarioService: PnalFuncionarioService,
    private _PlacaService: VhloCfgPlacaService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    swal({
      title: 'Buscando placas fabricadas!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.funcionario = response.data;

          let datos = {
            'idOrganismoTransito': this.funcionario.organismoTransito.id,
            'estado': 'FABRICADA',
          }

          this._PlacaService.searchByOrganismoTransitoAndEstado(datos, token).subscribe(
            response => {
              if (response.code == 200) {
                this.placas = response.data;

                swal.close();
              } else {
                this.placas = null;

                swal({
                  title: response.title,
                  text: response.message,
                  type: response.status,
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
        } else {
          this.funcionario = null;

          swal({
            title: 'Error!',
            text: 'Usted no tiene permisos para realizar tramites',
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

  onInitTable() {
    this.table = $('#dataTables-example').DataTable({
      retrieve: true,
      paging: false,
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

  onDelivered(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡La placa pasara a estado UTILIZADA!",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();

        this._PlacaService.state({ 'id': id, 'estado': 'UTILIZADA' }, token).subscribe(
          response => {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonColor: '#15d4be',
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
