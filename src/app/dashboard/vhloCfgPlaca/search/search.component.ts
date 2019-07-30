import { Component, OnInit } from '@angular/core';
import { VhloCfgPlacaService } from '../../../services/vhloCfgPlaca.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
  public errorMessage;

  public table: any = null;
  public numero: any = null;
  public placas: any = null;

  public formIndex: any = null;

  constructor(
    private _PlacaService: VhloCfgPlacaService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() { 
    this.formIndex = false;
  }

  onInitTable(){
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

  onSearchPlaca() {
    swal({
      title: 'Buscando placa!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._PlacaService.searchByNumero({ 'numero': this.numero }, token).subscribe(
        response => {
      if (response.code == 200) {
          this.placas = response.data;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
            this.formIndex = true;
          }, 100);

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
        });
      } else {
        this.placas = null;

        swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
        });
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
            }
        }
      }
    });       
  }

  onLiberate(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Esta placa pasará a estado DISPONIBLE!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();

        this._PlacaService.state({ 'id':id, 'estado':'DISPONIBLE' }, token).subscribe(
          response => {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });

            this.table.destroy();
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

  onUsed(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Esta placa pasará a estado UTILIZADA!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();

        this._PlacaService.state({ 'id':id, 'estado':'UTILIZADA' }, token).subscribe(
          response => {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });

            this.table.destroy();
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