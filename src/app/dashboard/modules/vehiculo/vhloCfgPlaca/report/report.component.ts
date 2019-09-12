import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VhloCfgPlacaService } from '../../../../../services/vhloCfgPlaca.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-report-cfgplaca',
  templateUrl: './report.component.html'
})

export class VhloCfgPlacaReportComponent implements OnInit, AfterViewInit {
  public errorMessage;

  public table: any;
  public placas: any;
  public formIndex: any;

  public search = {
    'fechaInicial': null,
    'fechaFinal': null,
  }

  constructor(
    private _PlacaService: VhloCfgPlacaService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.table = null;
    this.placas = null;
    this.formIndex = false;
  }

  ngAfterViewInit() {
    swal.close();
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      retrieve: true,
      paging: false,
      responsive: true,
      pageLength: 10,
      sPaginationType: 'full_numbers',
      dom: 'Bfrtip',
      buttons: [
        'excel', 'csv', 'pdf'
      ],
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

  onSearch() {
    swal({
      title: 'Buscando placas!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._PlacaService.reportByTramites(this.search, token).subscribe(
        response => {
      if (response.code == 200) {
        this.placas = response.data;

        swal({
          title: response.title,
          text: response.message,
          type: response.status,
          confirmButtonText: 'Aceptar'
        });

        let timeoutId = setTimeout(() => {
          this.onInitTable();
          this.formIndex = true;
        }, 100);
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
}