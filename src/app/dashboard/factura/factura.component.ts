import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FacturaService } from '../../services/factura.service';
import { TramiteFacturaService } from '../../services/tramiteFactura.service';
import { LoginService } from '../../services/login.service';
import { Factura } from './factura.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './factura.component.html'
})
export class FacturaComponent implements OnInit {
  public tipo: any;
  public sub: any;
  public errorMessage;
	public id;
	public respuesta;
	public facturas;
	public formNew = false;
	public formEdit = false;
	public formShow = false;
  public formIndex = true;
  public table:any; 
  public factura: Factura;

  constructor(
		private _FacturaService: FacturaService,
    private _TramiteFacturaService: TramiteFacturaService,
    private _route: ActivatedRoute,
    private _loginService: LoginService,
  ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer 
      ) {
      }
    })
    
		this._FacturaService.getFactura().subscribe(
				response => {
          this.facturas = response.data;
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
          }, 100);
          swal.close();
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

  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-forward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-backward"></i>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
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
        this.formShow = false;
        this.ngOnInit();
      }
  }

  readyShow(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
      this.formIndex = true;
      this.ngOnInit();
    }
}

  deleteFactura(id:any){
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
        let token = this._loginService.getToken();
        this._FacturaService.deleteFactura(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.respuesta= response;
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

  editFactura(factura:any){
    this.factura = factura;
    this.formEdit = true;
    this.formIndex = false;
  }
  getTramiteFactura(factura:any){
    this.factura = factura;
    this.formShow = true;
    this.formIndex = false;
  }
}