import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VhloLimitacionService } from '../../services/vhloLimitacion.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloRnaTramiteInscripcionLimitacion.component.html'
})
export class VhloRnaTramiteInscripcionLimitacionComponent implements OnInit {
  public errorMessage;

  public tramitesInscripcion;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public table: any = null;
  public tramiteInscripcion: any;

  constructor(
    private _VehiculoLimitacionService: VhloLimitacionService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    let datos = {
      'idModulo': 1,
    };
    
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });
    
    this._VehiculoLimitacionService.index(datos).subscribe(
      response => {
        if (response) {
          this.tramitesInscripcion = response.data;
          
          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);

          swal.close();
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

  iniciarTabla() {
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<<',
          sPrevious: '<',
          sNext: '>',
          sLast: '>>'
        }
      }
    });
  }

  onNew() {
    this.formNew = true;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  edit(tramiteInscripcion: any) {
    this.tramiteInscripcion = tramiteInscripcion;
    this.formEdit = true;
    this.formIndex = false;
  }

}