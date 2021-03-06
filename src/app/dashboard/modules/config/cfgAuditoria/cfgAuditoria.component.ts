import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CfgAuditoriaService } from '../../../../services/cfgAuditoria.service';
import {LoginService} from '../../../../services/login.service';
import { CfgAuditoria } from './cfgAuditoria.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cfgAuditoria.component.html'
})
export class CfgAuditoriaComponent implements OnInit, AfterViewInit {
  public errorMessage;
  public auditorias;
  
  public formSearch: any;
  public formIndex: any;
	public formNew: any;
	public formEdit: any;

  public table:any; 
  public auditoria: CfgAuditoria;

  constructor(
    private _AuditoriaService: CfgAuditoriaService,
		private _LoginService: LoginService,
    ){}
    
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
    this.formNew = false;
    this.formEdit = false;
  }

  onSearch(){
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._AuditoriaService.index().subscribe(
      response => {
        this.auditorias = response.data;
        let timeoutId = setTimeout(() => {
          this.onInitTable();
        }, 100);
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

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      retrieve: true,
      paging: false,
      responsive: true,
      pageLength: 10,
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
  
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onDelete(id:any){
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

        this._AuditoriaService.delete(token,id).subscribe(
            response => {
                swal({
                  title: 'Eliminado!',
                  text:'Registro eliminado correctamente.',
                  type:'success',
                  confirmButtonColor: '#15d4be',
                });

                this.ngOnInit();
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
    })
  }

  onEdit(auditoria:any){
    this.auditoria = auditoria;
    this.formEdit = true;
    this.formIndex = false;
  }
}