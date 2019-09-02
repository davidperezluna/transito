import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BpOrdenPagoService } from '../../../../services/bpOrdenPago.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index-registrocompromiso',
  templateUrl: './bpOrdenPago.component.html'
})
export class BpOrdenPagoComponent implements OnInit {
  public errorMessage;
	public id;

  public ordenes;
  public tipo: any = null;
  
	public formNew: any;
	public formEdit: any;
  public formIndex: any;
  public formSearch: any;

  public tiposIdentificacion: any;

  public table:any;

  public search: any = {
    'identificacion': null,
    'idTipoIdentificacion': null,
  }

  constructor(
    private _OrdenPagoService: BpOrdenPagoService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    this.onInitForms();
    
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tiposIdentificacion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this.formSearch = true;
  }

  onInitForms() {
    this.formNew = false;
    this.formEdit = false;
    this.formIndex = false;
    this.formSearch = false;
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
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

  onSearch(){
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._OrdenPagoService.searchByBeneficiario(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ordenes = response.data;
          this.formIndex = true;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
          swal.close();
        } else {
          this.ordenes = null;

          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar',
          });
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
  
  onNew(){
    this.onInitForms();
    
    this.formNew = true;
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
        
        this._OrdenPagoService.delete({'id':id}, token).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
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

  onEdit(tipo:any){
    this.tipo = tipo;
    this.formEdit = true;
    this.formIndex = false;
  }
}