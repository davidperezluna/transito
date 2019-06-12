import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { VhloTpConvenio } from '../vhloTpConvenio.modelo';
import { VhloTpConvenioService } from '../../../services/vhloTpConvenio.service';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() empresa: any = null;
  public errorMessage;
  public convenio: VhloTpConvenio;
  public municipio: any;
  public convenios: any;
  public municipioSelected: any;
  public tipoSociedadSelected: any;
  public formListaConvenios = false;
  public table: any;
  public formNew = false;
  public formEdit = false;
  public cargar = true;
  public checked: any;

  constructor(
    private _VhloTpConvenioService: VhloTpConvenioService,
    private _LoginService: LoginService,

  ) { }

  ngOnInit() {
    console.log(this.empresa);
    this._VhloTpConvenioService.getVhloTpConvenioEmpresa(this.empresa.id).subscribe(
      response => {
        if (response.status == "success") {
          this.convenios = response.data;
          this.formListaConvenios = true;
        } else {
          this.formNew = true;
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

  onCancelar() {
    this.ready.emit(true);
  }

  onReady(respuesta: any) {
    this.formListaConvenios = true;
    this.formNew = false;
    this.formEdit = false;
  }
  
  onNew() {
    this.formListaConvenios = false;
    this.formNew = true;
    this.formEdit = false;
  }
  
  onEdit(convenio: any) {
    this.convenio = convenio;
    this.formListaConvenios = false;
    this.formEdit = true;
    this.formNew = false;
  }

  onInitTable() {
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

  onDelete(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminará este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();
        this._VhloTpConvenioService.delete({'id': id}, token).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: response.message,
              type: 'success',
              confirmButtonColor: '#15d4be',
            })
            this.formListaConvenios = false;
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
    })
  }
}