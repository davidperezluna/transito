import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VhloCfgTipoAlertaService } from '../../../../services/vhloCfgTipoAlerta.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloCfgTipoAlerta.component.html'
})
export class VhloCfgTipoAlertaComponent implements OnInit {
  public errorMessage;
	public id;

	public tipoAlertas;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any;
  public tipoAlerta: any;

  constructor(
    private _VhloCfgTipoAlertaService: VhloCfgTipoAlertaService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._VhloCfgTipoAlertaService.index().subscribe(
				response => {
          this.tipoAlertas = response.data;
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
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
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
        let token = this._loginService.getToken();
        this._VhloCfgTipoAlertaService.delete({ 'id': id }, token).subscribe(
          response => {
              swal({
                title: 'Eliminado!',
                text:'Registro eliminado correctamente.',
                type:'success',
                confirmButtonColor: '#15d4be',
              });
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

  onEdit(tipoAlerta:any){
    this.tipoAlerta = tipoAlerta;
    this.formEdit = true;
    this.formIndex = false;
  }
}