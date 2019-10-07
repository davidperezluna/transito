import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GdDocumentoService } from '../../../../../services/gdDocumento.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { DatePipe  } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-report-gddocumento',
  templateUrl: './report.component.html',
  providers: [DatePipe]
})

export class ReportComponent implements OnInit, AfterViewInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;

    public documentos: any;

    public formSearch: any;
    public formIndex: any;

    public table:any; 

    public search = {
      'fechaInicial': null,
      'fechaFinal': null,
    };

  constructor(
    private _DocumentoService: GdDocumentoService,
		private _LoginService: LoginService,
    ){
      /*this.date = new Date();
      var datePiper = new DatePipe(this.date);
      this.date = datePiper.transform(this.date,'yyyy-MM-dd');*/
    }
     
  ngOnInit() {
    this.onInitForms();

    this.formSearch = true;
  }

  ngAfterViewInit(){
    swal.close();
  }

  onInitForms(){
    this.formSearch = false;
    this.formIndex = false;
  }

  onCancelar() {
    this.ready.emit(true);
  }
  
  onInitTable(){
    let date;

    if (this.search.fechaInicial == this.search.fechaInicial) {
      date = this.search.fechaInicial;
    } else {
      date = this.search.fechaInicial+ ' - ' +this.search.fechaFinal;
    }

    this.table = $('#dataTables-example').DataTable({
      retrieve: true,
      paging: false,
      responsive: true,
      pageLength: 10,
      sPaginationType: 'full_numbers',
      dom: 'Bfrtip',
      buttons: [
        'excel', 'pdf'
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

  onSearch(){
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading();
      }
    });

    let token = this._LoginService.getToken();
    
    this._DocumentoService.report(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.documentos = response.data;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
            this.formIndex = true;
            swal.close();
          }, 100);
        } else {
          this.documentos = null;

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
            alert("Error en la petición");
          }
        }
      }
    );
  }
}